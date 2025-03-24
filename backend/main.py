import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes.work_experience import router as work_experience_router
from routes.images import router as images_router
from routes.blog import router as blog_router
from routes.records import router as records_router
from config import ALLOWED_ORIGINS, ALLOWED_METHODS, ALLOWED_HEADERS
from datetime import datetime

app = FastAPI()

app.include_router(work_experience_router)
app.include_router(images_router)
app.include_router(blog_router)
app.include_router(records_router)
app.mount("/images", StaticFiles(directory="./data/img/cards"), name="images")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=ALLOWED_METHODS,
    allow_headers=ALLOWED_HEADERS,
    max_age=3600,
)

@app.get("/")
async def read_root():
    return {"message": "Welcome to my API foo"}
