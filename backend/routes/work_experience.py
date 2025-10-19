from pydantic import BaseModel, HttpUrl, ValidationError, field_validator
from typing import List, Optional
from fastapi import APIRouter, HTTPException, status


router = APIRouter()

class IconItem(BaseModel):
    content: str
    iconClass: Optional[str] = None
    customIcon: Optional[str] = None

class CompanyAndDateInfo(BaseModel):
    url: HttpUrl
    companyName: str
    date: str

class WorkExperienceItem(BaseModel):
    hashtags: List[str]
    icons: List[IconItem]
    companyAndDateInfo: CompanyAndDateInfo
    jobPosition: str
    jobDescription: List[str]
    
    @field_validator('hashtags')
    def check_hashtags(cls, v):
        if not isinstance(v, list):
            raise ValueError('Hashtags must be a list.')
        
        for hashtag in v:
            if not hashtag:  # Check if the hashtag is empty
                raise ValueError('Hashtag cannot be empty.')
        return v
    
    @field_validator('icons')
    def check_icons(cls, v):
        if not isinstance(v, list):
            raise ValueError('Icons must be a list.')
        
        for icon in v:
            if not isinstance(icon, IconItem):
                raise ValueError('Each icon must be an IconItem instance.')
            if not icon.content:
                raise ValueError('Icon content cannot be empty.')
            if not icon.iconClass and not icon.customIcon:
                raise ValueError('Icon must have either iconClass or customIcon.')
        return v

    @field_validator('companyAndDateInfo')
    def check_company_and_date_info(cls, v):
        if not isinstance(v, CompanyAndDateInfo):
            raise ValueError('companyAndDateInfo must be an instance of CompanyAndDateInfo.')
        if not v.url:
            raise ValueError('URL cannot be empty.')
        if not v.companyName:
            raise ValueError('Company name cannot be empty.')
        if not v.date:
            raise ValueError('Date cannot be empty.')
        return v

    @field_validator('jobPosition')
    def check_job_position(cls, v):
        if not v:
            raise ValueError('Job position cannot be empty.')
        return v

    @field_validator('jobDescription')
    def check_job_description(cls, v):
        if not isinstance(v, list):
            raise ValueError('Job description must be a list.')
        
        for description in v:
            if not description:
                raise ValueError('Job description cannot be empty.')
        return v
    
class WorkExperience(BaseModel):
    data: List[WorkExperienceItem]
    
    @classmethod
    def create_from_file(cls, file_name: str) -> "WorkExperience":
            file_path = f"data/{file_name}"  # Adjusted path
            try:
                with open(file_path, 'r') as file:
                    json_data = file.read()
                return cls.model_validate_json(json_data)
            except ValidationError as e:
                raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=f"Validation Error: {e}")
            except ValueError as e:
                raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=f"Value Error: {e}")
            except FileNotFoundError:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="The file was not found.")
            except Exception as e:
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Unexpected error: {e}")
        

@router.get("/job-info", response_model=WorkExperience)
def get_job_info():
    return WorkExperience.create_from_file('work_experience.json')

