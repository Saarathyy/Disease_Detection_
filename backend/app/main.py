from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import diagnostics, history, store, auth
from app.db.database import connect_to_postgres, close_postgres_connection
from app.services import local_rag
import logging

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_postgres()
    # Pre-load local RAG model in background thread so startup is non-blocking
    import asyncio
    asyncio.create_task(asyncio.to_thread(local_rag.initialize))
    yield
    await close_postgres_connection()

app = FastAPI(
    title="CropVision Cloud Backend",
    description="Backend services for agricultural diagnostics executing AI models via FastAPI with PostgreSQL storage.",
    version="2.0.0",
    lifespan=lifespan
)

# Standard Frontend CORS mapping
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Attach Modular Routers
app.include_router(diagnostics.router, prefix="/api/diagnostics", tags=["Diagnostic Hub"])
app.include_router(history.router, prefix="/api/history", tags=["History Retrieval"])
app.include_router(store.router, prefix="/api/store", tags=["Marketplace Engine"])
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])


@app.get("/health", tags=["System"])
def health_check():
    return {"status": "ok", "service": "CropVision Cloud Microservice", "db": "Neon Postgres DB Active"}
