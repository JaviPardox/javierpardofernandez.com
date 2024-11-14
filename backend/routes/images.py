from typing import Dict
from fastapi import APIRouter
from config import BACKEND_PORT, SERVER_IP


router = APIRouter()


@router.get("/images/{image_id}/urls")
async def get_image_urls(image_id: str) -> Dict:
    base_url = f"http://{SERVER_IP}:{BACKEND_PORT}/images"
    urls = {
        resolution: f"{base_url}/{image_id}/{image_id}-{resolution}.jpeg"
        for resolution in [16, 32, 48, 64, 96, 128, 256, 384, 640, 
                          750, 828, 1080, 1200, 1920, 2048, 3840]
    }
    return {"urls": urls}