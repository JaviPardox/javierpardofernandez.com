from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Project(BaseModel):
    id: int
    title: str
    description: str

@app.get("/")
async def read_root():
    return {"message": "Welcome to my portfolio API"}

@app.get("/api/projects")
async def get_projects():
    # In a real application, you would fetch this data from a database
    projects = [
        Project(id=1, title="Project 1", description="Description of Project 1"),
        Project(id=2, title="Project 2", description="Description of Project 2"),
    ]
    return projects

@app.get("/api/skills")
async def get_skills():
    return ["Python", "JavaScript", "React", "FastAPI", "AWS"]