from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field, ValidationError
from typing import List
import json


router = APIRouter()

class Academic(BaseModel):
    institution: str = Field(..., min_length=1, max_length=200)
    degree: str = Field(..., min_length=1, max_length=100)
    field_of_study: str = Field(..., min_length=1, max_length=100)
    start_date: str = Field(..., min_length=1, max_length=20)
    end_date: str = Field(..., min_length=1, max_length=20)
    logo_path: str = Field(default="")


class Organization(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    chapter: str = Field(default="")
    role: str = Field(..., min_length=1, max_length=100)
    duration: str = Field(..., min_length=1, max_length=20)
    description: str = Field(default="")
    logo_path: str = Field(default="")
    
class Records(BaseModel):
    academics: List[Academic]
    organizations: List[Organization]
    
    @classmethod
    def create_from_file(cls, file_name: str):
        try:
            file_path = f"data/{file_name}"
            
            try:
                with open(file_path, 'r') as file:
                    data = json.load(file)
            except FileNotFoundError:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, 
                    detail=f"Blog data file '{file_name}' not found"
                )
            except json.JSONDecodeError:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Invalid JSON format in file '{file_name}'"
                )
            
            try:
                records = cls(
                    academics=data.get('academics', []),
                    organizations=data.get('organizations', [])
                )
                return records
            except ValidationError as e:
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail=f"Validation error in records: {str(e)}"
                )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Unexpected error processing records file: {str(e)}"
            )


@router.get("/records", response_model=Records)
def get_records():
    return Records.create_from_file('records.json')