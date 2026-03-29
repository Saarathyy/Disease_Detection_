import logging
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from app.core.config import settings

log = logging.getLogger(__name__)

# Convert neon.tech string to sqlalchemy's asyncpg dialect if present
DB_URL = settings.NEON_DATABASE_URL
if DB_URL.startswith("postgres://"):
    DB_URL = DB_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DB_URL.startswith("postgresql://"):
    DB_URL = DB_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Strip out aggressive query parameters injected by Neon dashboard which crash asyncpg
if "?" in DB_URL:
    DB_URL = DB_URL.split("?")[0]

# Enable Neon DB SSL requirements unconditionally if cloud database detected
connect_args = {}
if "neon.tech" in DB_URL:
    connect_args["ssl"] = "require"

engine = create_async_engine(
    DB_URL,
    echo=False,
    connect_args=connect_args,
    pool_pre_ping=True,       # test connection before use, auto-reconnect if stale
    pool_recycle=300,         # recycle connections every 5 min (Neon idles out quickly)
    pool_size=5,
    max_overflow=10,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise

async def connect_to_postgres():
    log.info("Connecting to Neon Postgres Data Warehouse...")
    try:
        async with engine.begin() as conn:
            from app.db.models import Base as ModelsBase
            await conn.run_sync(ModelsBase.metadata.create_all)
            # Ensure text columns are wide enough (idempotent migration)
            await conn.execute(
                __import__('sqlalchemy').text("""
                    DO $$
                    BEGIN
                        ALTER TABLE crop_scans ALTER COLUMN treatment_chemical TYPE VARCHAR(2000);
                        ALTER TABLE crop_scans ALTER COLUMN treatment_organic TYPE VARCHAR(2000);
                        ALTER TABLE crop_scans ALTER COLUMN climate_impact TYPE VARCHAR(2000);
                    EXCEPTION WHEN others THEN
                        NULL; -- ignore if already correct size
                    END $$;
                    DO $$
                    BEGIN
                        ALTER TABLE users ADD COLUMN phone_number VARCHAR(20);
                    EXCEPTION WHEN others THEN
                        NULL;
                    END $$;
                """)
            )
        log.info("Neon Tables generated and connection secured.")
    except Exception as e:
        log.warning(f"DB init note: {e}")

async def close_postgres_connection():
    log.info("Closing Neon database pool...")
    await engine.dispose()
