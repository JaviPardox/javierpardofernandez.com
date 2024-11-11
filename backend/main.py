import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.work_experience import router as work_experience_router
from dotenv import load_dotenv

load_dotenv()

backend_port = os.getenv("BACKEND_PORT", "8000")
frontend_port = os.getenv("FRONTEND_PORT", "3000")
server_ip = os.getenv("SERVER_IP", "localhost")

app = FastAPI()

app.include_router(work_experience_router)

allowed_origins = [
    f"http://{server_ip}:{frontend_port}",
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

