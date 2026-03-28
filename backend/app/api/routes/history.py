from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import logging
from typing import List, Dict, Any
from app.db.database import get_db
from app.db.models import ScanModel

log = logging.getLogger(__name__)
router = APIRouter()

@router.get("/")
async def get_scan_history(skip: int = 0, limit: int = 20, db: AsyncSession = Depends(get_db)):
    try:
        # Execute the Asynchronous SQL Statement securely
        stmt = select(ScanModel).order_by(ScanModel.scanned_at.desc()).offset(skip).limit(limit)
        result = await db.execute(stmt)
        records = result.scalars().all()
        
        scans = []
        for record in records:
            document = {
                "id": str(record.id),
                "disease": record.disease,
                "confidence": record.confidence,
                "method": record.method,
                "date": record.scanned_at.strftime("%Y-%m-%d") if record.scanned_at else ""
            }
            
            # Dynamic translation for status string based on disease severity
            status = "Treated"
            disease_str = document.get("disease", "")
            if "Healthy" in disease_str:
                status = "Optimal"
            elif "Severe" in disease_str or "Rot" in disease_str or "Blight" in disease_str:
                status = "Requires Attention"
            
            document["status"] = status
            scans.append(document)
            
        return scans

    except Exception as e:
        log.error(f"Failed to fetch Postgres history: {e}")
        raise HTTPException(status_code=500, detail="Relational Database Retrieval Error")
