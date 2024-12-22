import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes.work_experience import router as work_experience_router
from routes.images import router as images_router
from routes.blog import router as blog_router
from routes.records import router as records_router
from config import FRONTEND_PORT, SERVER_IP

app = FastAPI()

app.include_router(work_experience_router)
app.include_router(images_router)
app.include_router(blog_router)
app.include_router(records_router)
app.mount("/images", StaticFiles(directory="./data/img/cards"), name="images")


allowed_origins = [
    f"http://{SERVER_IP}:{FRONTEND_PORT}",
    "http://localhost:3000"
]

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"message": "Welcome to my portfolio API"}

