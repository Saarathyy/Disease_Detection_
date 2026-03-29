from google import genai
from google.genai import types
import json
import logging
from app.core.config import settings

log = logging.getLogger(__name__)

client = genai.Client(api_key=settings.GEMINI_API_KEY)

LANG_NAMES = {
    "en-IN": "English", "en": "English",
    "hi-IN": "Hindi",   "hi": "Hindi",
    "ta-IN": "Tamil",   "ta": "Tamil",
    "te-IN": "Telugu",  "te": "Telugu",
    "mr-IN": "Marathi", "mr": "Marathi",
    "kn-IN": "Kannada", "kn": "Kannada",
    "ml-IN": "Malayalam","ml": "Malayalam",
}

_PROMPT = """You are an agricultural AI agronomist.
The farmer is speaking in {lang_name}. Listen to the audio and diagnose the crop issue.
Respond ONLY in {lang_name} language. Do NOT use any other language.
Return ONLY this JSON (no extra text, NO inner quotes or markdown):
{{"disease":"<{lang_name}>","confidence":<0.0-1.0>,"treatment_chemical":"<{lang_name}>","treatment_organic":"<{lang_name}>","climate_impact":"<{lang_name}>"}}"""

import asyncio

async def process_voice_symptoms(voice_bytes: bytes, filename: str, language: str) -> dict:
    lang_name = LANG_NAMES.get(language, "English")
    log.info(f"Voice: {filename} | {len(voice_bytes)//1024}KB | lang={lang_name}")

    for attempt in range(3):
        try:
            response = await client.aio.models.generate_content(
                model="gemini-2.5-flash",
                contents=[
                    _PROMPT.format(lang_name=lang_name),
                    types.Part.from_bytes(data=voice_bytes, mime_type="audio/webm")
                ],
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.1,
                    max_output_tokens=1024,
                )
            )
            result = json.loads(response.text)
            log.info(f"Voice result: {result.get('disease')} [{lang_name}]")
            return result

        except json.JSONDecodeError as e:
            log.error(f"JSON parse failed: {e} | raw: {response.text[:200]}")
            try:
                raw = response.text
                start, end = raw.find('{'), raw.rfind('}')
                if start != -1 and end != -1:
                    return json.loads(raw[start:end+1])
            except Exception:
                pass
            return {
                "disease": "Parse Error - please retry",
                "confidence": 0.0,
                "treatment_chemical": "Retry the analysis.",
                "treatment_organic": "Retry the analysis.",
                "climate_impact": str(e)[:200]
            }

        except Exception as e:
            err_str = str(e)
            if "429" in err_str and attempt < 2:
                import re
                match = re.search(r"retryDelay.*?'(\d+)s'", err_str)
                wait = int(match.group(1)) if match else (attempt + 1) * 5
                wait = min(wait, 60)
                log.warning(f"Rate limited (429), retrying in {wait}s... (attempt {attempt+1})")
                await asyncio.sleep(wait)
                continue
            log.error(f"Voice inference failed: {e}")
            if "429" in err_str:
                return {
                    "disease": "Quota Exceeded — Try Again Later",
                    "confidence": 0.0,
                    "treatment_chemical": "Gemini free tier: 20 requests/day. Quota resets at midnight Pacific Time.",
                    "treatment_organic": "Upgrade to Gemini paid tier for unlimited requests.",
                    "climate_impact": "API quota exhausted."
                }
            return {
                "disease": "Voice Analysis Error",
                "confidence": 0.0,
                "treatment_chemical": "Check API key or quota.",
                "treatment_organic": "Check terminal logs.",
                "climate_impact": err_str[:200]
            }

    return {
        "disease": "Quota Exceeded — Try Again Later",
        "confidence": 0.0,
        "treatment_chemical": "Gemini free tier: 20 requests/day. Quota resets at midnight Pacific Time.",
        "treatment_organic": "Upgrade to Gemini paid tier for unlimited requests.",
        "climate_impact": "API quota exhausted."
    }
