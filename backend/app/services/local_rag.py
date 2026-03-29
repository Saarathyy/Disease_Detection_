"""
Local RAG engine using FAISS + sentence-transformers.
Responds in ~100-300ms with no external API calls.
Falls back to Gemini if confidence is below threshold.
"""
import logging
import asyncio
import numpy as np
import faiss
from typing import Optional
from sentence_transformers import SentenceTransformer
from app.services.crop_knowledge import CROP_KNOWLEDGE

log = logging.getLogger(__name__)

# Lightweight multilingual model — 50MB, fast CPU inference
_MODEL_NAME = "paraphrase-multilingual-MiniLM-L12-v2"

_model: SentenceTransformer = None
_index: faiss.IndexFlatIP = None
_entries: list = []

# Translations for field names per language
_FIELD_TRANSLATIONS = {
    "hi": {
        "disease": lambda v: v,
        "treatment_chemical": lambda v: v,
        "treatment_organic": lambda v: v,
        "climate_impact": lambda v: v,
    }
}

LANG_NAMES = {
    "en-IN": "English", "en": "English",
    "hi-IN": "Hindi",   "hi": "Hindi",
    "ta-IN": "Tamil",   "ta": "Tamil",
    "te-IN": "Telugu",  "te": "Telugu",
    "mr-IN": "Marathi", "mr": "Marathi",
    "kn-IN": "Kannada", "kn": "Kannada",
    "ml-IN": "Malayalam","ml": "Malayalam",
}

def _load():
    """Load model and build FAISS index (called once at startup)."""
    global _model, _index, _entries
    log.info("Loading local RAG model...")
    _model = SentenceTransformer(_MODEL_NAME)

    _entries = CROP_KNOWLEDGE
    texts = [e["symptoms"] for e in _entries]

    # Encode all symptom texts
    embeddings = _model.encode(texts, normalize_embeddings=True, show_progress_bar=False)
    embeddings = np.array(embeddings, dtype="float32")

    # Inner product index (cosine similarity since embeddings are normalized)
    _index = faiss.IndexFlatIP(embeddings.shape[1])
    _index.add(embeddings)
    log.info(f"Local RAG ready: {len(_entries)} diseases indexed")

def initialize():
    """Call at app startup to pre-load the model."""
    _load()

def _query_sync(query_text: str, top_k: int = 1) -> tuple[dict, float]:
    """Synchronous FAISS search — run in thread pool."""
    query_vec = _model.encode([query_text], normalize_embeddings=True, show_progress_bar=False)
    query_vec = np.array(query_vec, dtype="float32")
    scores, indices = _index.search(query_vec, top_k)
    best_score = float(scores[0][0])
    best_entry = _entries[indices[0][0]]
    return best_entry, best_score

async def query(query_text: str, language: str = "en-IN", confidence_threshold: float = 0.45) -> tuple[Optional[dict], float]:
    """
    Query the local RAG index.
    Returns (result_dict, score) if score >= threshold, else (None, score).
    """
    if _model is None or _index is None:
        return None, 0.0

    entry, score = await asyncio.to_thread(_query_sync, query_text)
    log.info(f"RAG query score: {score:.3f} | match: {entry['disease']}")

    if score < confidence_threshold:
        return None, score

    return {
        "disease": entry["disease"],
        "confidence": min(entry["confidence"], round(float(score), 2)),
        "treatment_chemical": entry["treatment_chemical"],
        "treatment_organic": entry["treatment_organic"],
        "climate_impact": entry["climate_impact"],
    }, score
