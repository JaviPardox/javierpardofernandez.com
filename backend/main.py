from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.work_experience import router as work_experience_router


app = FastAPI()

app.include_router(work_experience_router)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"message": "Welcome to my portfolio API"}

