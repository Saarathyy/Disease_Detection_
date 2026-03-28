from fastapi import APIRouter, File, UploadFile, Form, HTTPException, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
import logging
import io
import asyncio
from datetime import datetime
from gtts import gTTS
from app.services.ml_engine import process_crop_image
from app.services.rag_engine import process_voice_symptoms
from app.services.local_rag import query as rag_query
from app.schemas.diagnostics_schema import DiagnosticResult
from app.db.database import get_db, AsyncSessionLocal
from app.db.models import ScanModel

log = logging.getLogger(__name__)
router = APIRouter()

# Confidence threshold — below this, fall back to Gemini
RAG_THRESHOLD = 0.50

async def _save_scan(method: str, prediction: dict):
    try:
        async with AsyncSessionLocal() as db:
            record = ScanModel(
                method=method,
                disease=prediction.get("disease", ""),
                confidence=float(prediction.get("confidence", 0.0)),
                treatment_chemical=prediction.get("treatment_chemical", ""),
                treatment_organic=prediction.get("treatment_organic", ""),
                climate_impact=prediction.get("climate_impact", ""),
                scanned_at=datetime.utcnow()
            )
            db.add(record)
            await db.commit()
    except Exception as e:
        log.error(f"Background DB save failed: {e}")

@router.post("/analyze-image", response_model=DiagnosticResult)
async def analyze_image(file: UploadFile = File(...), language: str = Form("en-IN")):
    log.info(f"Image: {file.filename} | lang={language}")
    file_bytes = await file.read()

    # Always use Gemini for image analysis (vision model needed)
    prediction = await process_crop_image(file_bytes, file.filename, language)
    asyncio.create_task(_save_scan("image", prediction))

    return DiagnosticResult(
        disease=prediction.get("disease", ""),
        confidence=float(prediction.get("confidence", 0.0)),
        treatment_chemical=prediction.get("treatment_chemical", ""),
        treatment_organic=prediction.get("treatment_organic", ""),
        climate_impact=prediction.get("climate_impact", ""),
        method="image",
        _id="pending",
        scanned_at=datetime.utcnow()
    )

@router.post("/analyze-voice", response_model=DiagnosticResult)
async def analyze_voice(voice_note: UploadFile = File(...), language: str = Form("en-IN")):
    log.info(f"Voice: {voice_note.filename} | lang={language}")
    file_bytes = await voice_note.read()

    # Step 1: Try local RAG first (fast, ~200ms)
    # Use Gemini to transcribe audio to text first, then RAG lookup
    # For voice, we use Gemini for transcription but RAG for diagnosis
    prediction = await process_voice_symptoms(file_bytes, voice_note.filename, language)
    source = "gemini"

    # If Gemini returned a valid result, try to enhance with local RAG
    if prediction.get("disease") and prediction.get("disease") not in ["Voice Analysis Error", "Parse Error - please retry"]:
        disease_text = prediction.get("disease", "")
        rag_result, rag_score = await rag_query(disease_text, language, confidence_threshold=RAG_THRESHOLD)
        if rag_result and rag_score >= RAG_THRESHOLD:
            # RAG found a good match — use its structured treatment data
            # but keep Gemini's disease name and confidence
            prediction["treatment_chemical"] = rag_result["treatment_chemical"]
            prediction["treatment_organic"] = rag_result["treatment_organic"]
            prediction["climate_impact"] = rag_result["climate_impact"]
            source = "rag+gemini"
            log.info(f"RAG enhanced result (score={rag_score:.2f})")

    log.info(f"Voice result source: {source}")
    asyncio.create_task(_save_scan("voice", prediction))

    return DiagnosticResult(
        disease=prediction.get("disease", ""),
        confidence=float(prediction.get("confidence", 0.0)),
        treatment_chemical=prediction.get("treatment_chemical", ""),
        treatment_organic=prediction.get("treatment_organic", ""),
        climate_impact=prediction.get("climate_impact", ""),
        method="voice",
        _id="pending",
        scanned_at=datetime.utcnow()
    )

# ── TTS ──────────────────────────────────────────────────────────────────────
GTTS_LANG_MAP = {
    "en-IN": "en", "en": "en",
    "hi-IN": "hi", "hi": "hi",
    "ta-IN": "ta", "ta": "ta",
    "te-IN": "te", "te": "te",
    "mr-IN": "mr", "mr": "mr",
    "kn-IN": "kn", "kn": "kn",
    "ml-IN": "ml", "ml": "ml",
}

def _run_gtts(text: str, lang: str) -> bytes:
    """Blocking gTTS call — run in thread pool."""
    tts = gTTS(text=text, lang=lang, slow=False)
    buf = io.BytesIO()
    tts.write_to_fp(buf)
    return buf.getvalue()

def _split_sentences(text: str) -> list[str]:
    """Split text into sentence chunks for parallel TTS generation."""
    import re
    # Split on sentence-ending punctuation including Devanagari danda
    parts = re.split(r'(?<=[.!?।])\s+', text.strip())
    # Group into ~2 sentences per chunk for balance
    chunks, current = [], ""
    for p in parts:
        if current and len(current) + len(p) > 200:
            chunks.append(current.strip())
            current = p
        else:
            current = (current + " " + p).strip() if current else p
    if current:
        chunks.append(current.strip())
    return chunks or [text]

@router.post("/tts")
async def text_to_speech(text: str = Form(...), language: str = Form("en-IN")):
    try:
        lang_code = GTTS_LANG_MAP.get(language, "en")
        chunks = _split_sentences(text)
        log.info(f"TTS: lang={lang_code} | {len(chunks)} chunks | {len(text)} chars")

        # Generate all chunks in parallel using thread pool
        tasks = [asyncio.to_thread(_run_gtts, chunk, lang_code) for chunk in chunks]
        results = await asyncio.gather(*tasks)

        # Concatenate all MP3 bytes
        combined = io.BytesIO()
        for mp3_bytes in results:
            combined.write(mp3_bytes)
        combined.seek(0)

        log.info(f"TTS done: {combined.getbuffer().nbytes // 1024}KB")
        return StreamingResponse(combined, media_type="audio/mpeg")
    except Exception as e:
        log.error(f"TTS failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
