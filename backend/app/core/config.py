import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "CropVision Cloud Backend"
    NEON_DATABASE_URL: str = os.getenv("NEON_DATABASE_URL", "sqlite+aiosqlite:///./placeholder.db")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

settings = Settings()
