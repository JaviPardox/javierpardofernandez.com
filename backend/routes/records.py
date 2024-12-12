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
            {"institution": "Universitat de Barcelona", "degree": "MSc", "field_of_study": "Project Management", "start_date": "March 2023", "end_date": "March 2024"},
            {"institution": "UC Berkeley", "degree": "Bootcamp", "field_of_study": "Data Science", "start_date": "November 2020", "end_date": "June 2021"},
            {"institution": "California State University, Chico", "degree": "BSc", "field_of_study": "Computer Engineering", "start_date": "August 2015", "end_date": "December 2019"}
        ],
        "organizations": [
            {"name": "Tau Beta Pi, Alpha Alpha Chapter", "role": "Corresponding Secretary", "duration": "1 year", "description": "Responsible for managing communication on behalf of the chapter."},
            {"name": "Tau Beta Pi, Alpha Alpha Chapter", "role": "IT Master", "duration": "1 year", "description": "Responsible for updating and maintaining the website functionality and content."},
            {"name": "Tau Kappa Epsilon, Theta Pi Chapter", "role": "Founding Father", "duration": "3 years", "description": "Played an active role in the creation of the Theta Pi chapter."}
        ]
    }
