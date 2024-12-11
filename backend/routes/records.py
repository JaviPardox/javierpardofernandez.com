from fastapi import APIRouter
from pydantic import BaseModel
from typing import List


router = APIRouter()

class AcademicRecord(BaseModel):
    institution: str
    degree: str
    field_of_study: str
    start_date: str
    end_date: str

class Organization(BaseModel):
    name: str
    role: str
    duration: str
    description: str

@router.get("/records")
def get_records():
    return {
        "academic": [
            {"institution": "University A", "degree": "BSc", "field_of_study": "Computer Science", "start_date": "2018", "end_date": "2022"},
            {"institution": "High School B", "degree": "High School Diploma", "field_of_study": "Science", "start_date": "2014", "end_date": "2018"}
        ],
        "organizations": [
            {"name": "Tech Club", "role": "President", "duration": "2 years", "description": "Led a team of developers."},
            {"name": "Open Source Group", "role": "Member", "duration": "1 year", "description": "Contributed to open-source projects."}
        ]
    }
