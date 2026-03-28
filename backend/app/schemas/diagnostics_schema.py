from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class DiagnosticResult(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    disease: str
    confidence: float
    treatment_chemical: str
    treatment_organic: str
    climate_impact: str
    scanned_at: datetime = Field(default_factory=datetime.utcnow)
    method: str  # 'image' or 'voice'

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
