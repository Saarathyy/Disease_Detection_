import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "CropVision Cloud Backend"
    NEON_DATABASE_URL: str = os.getenv("NEON_DATABASE_URL", "sqlite+aiosqlite:///./placeholder.db")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "b3c5a6d9e0f4a81c2f7b8d4e9a3c1b6d0f8e2c4a9b5d7e6f1a3b8c5d9e0f4a81")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7

settings = Settings()
