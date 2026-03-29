from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_base

# Use dedicated Base for model registry
Base = declarative_base()

class ScanModel(Base):
    __tablename__ = "crop_scans"

    id = Column(Integer, primary_key=True, index=True)
    method = Column(String(50), nullable=False) # 'image' or 'voice'
    disease = Column(String(255), nullable=False)
    confidence = Column(Float, nullable=False)
    treatment_chemical = Column(String(2000), nullable=True)
    treatment_organic = Column(String(2000), nullable=True)
    climate_impact = Column(String(2000), nullable=True)
    scanned_at = Column(DateTime(timezone=True), server_default=func.now())

class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    phone_number = Column(String(20), nullable=True)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
