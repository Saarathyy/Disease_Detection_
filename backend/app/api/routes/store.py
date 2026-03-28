from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter()

MOCK_PRODUCTS = [
  { "id": 1, "name": "Premium Neem Oil Spray 1L", "category": "Organic", "price": 450, "rating": 4.8, "img": "https://images.unsplash.com/photo-1595822557618-93ed9cd5d2f6?w=400&h=300&fit=crop" },
  { "id": 2, "name": "NPK 19:19:19 Fertilizer 10kg", "category": "Chemicals", "price": 1200, "rating": 4.5, "img": "https://images.unsplash.com/photo-1628168128963-c35064e43f11?w=400&h=300&fit=crop" },
  { "id": 3, "name": "Drip Irrigation Starter Kit", "category": "Equipment", "price": 3500, "rating": 4.9, "img": "https://images.unsplash.com/photo-1605052968399-5ea09121a5a0?w=400&h=300&fit=crop" },
  { "id": 4, "name": "High-Yield Wheat Seeds HW-222", "category": "Seeds", "price": 850, "rating": 4.6, "img": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop" },
  { "id": 5, "name": "Copper Oxychloride Fungicide 500g", "category": "Chemicals", "price": 320, "rating": 4.4, "img": "https://images.unsplash.com/photo-1587313883733-149a40cfcfbd?w=400&h=300&fit=crop" },
  { "id": 6, "name": "Vermicompost Organic Manure 50kg", "category": "Organic", "price": 600, "rating": 4.7, "img": "https://images.unsplash.com/photo-1616053335279-d13eb80bebae?w=400&h=300&fit=crop" }
]

@router.get("/")
def get_store_catalog() -> List[Dict[str, Any]]:
    # In production, this would query a dynamic "Products" collection in MongoDB Cloud
    return MOCK_PRODUCTS
