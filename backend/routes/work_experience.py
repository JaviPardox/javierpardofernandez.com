from pydantic import BaseModel, HttpUrl
from typing import List
from fastapi import APIRouter


router = APIRouter()

class IconItem(BaseModel):
    content: str
    iconClass: str

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
    
class WorkExperience(BaseModel):
    data: List[WorkExperienceItem]
    
    @classmethod
    def create(cls) -> "WorkExperience":
    
        experience_1 = WorkExperienceItem(
        hashtags = ["Leadership", "Architecture", "Backend", "Frontend"],
        icons = [
            IconItem(content=".NET 6", iconClass="devicon-dotnetcore-plain"),
            IconItem(content=".NET Framework 4.7.2", iconClass="devicon-dot-net-plain"),
            IconItem(content="MS SQL Server 2019", iconClass="devicon-microsoftsqlserver-plain"),
            IconItem(content="React 16", iconClass="devicon-react-plain"),
            IconItem(content="Redux", iconClass="devicon-redux-plain")
        ],
        companyAndDateInfo = CompanyAndDateInfo(
            url="https://fabrity.com",
            companyName="FABRITY",
            date="March 2022 - Present"
        ),
        jobPosition = "Software Architect",
        jobDescription = [
            "As a lead software architect for FastAPP, a low-code enterprise platform I help product owners translate their business requirements into clean, robust and extensible technical solutions.",
            "As a competence leader in the area of .NET, I help backend programmers hone their skills by supporting them in their everyday work.",
            "As a leader of an internal knowledge-sharing programme, I organize monthly meetings where passion-driven people can share their knowledge with the rest of the company.",
            "Furthermore, I do technical interviews and serve as a conference speaker on behalf of Fabrity."
        ]
        )
        
        experience_2 = WorkExperienceItem(
        hashtags = ["Leadership", "Architecture", "Backend", "Frontend"],
        icons = [
            IconItem(content=".NET 6", iconClass="devicon-dotnetcore-plain"),
            IconItem(content=".NET Framework 4.7.2", iconClass="devicon-dot-net-plain"),
            IconItem(content="MS SQL Server 2019", iconClass="devicon-microsoftsqlserver-plain"),
            IconItem(content="React 16", iconClass="devicon-react-plain"),
            IconItem(content="Redux", iconClass="devicon-redux-plain")
        ],
        companyAndDateInfo = CompanyAndDateInfo(
            url="https://fabrity.com",
            companyName="FABRITY",
            date="March 2022 - Present"
        ),
        jobPosition = "Software Architect",
        jobDescription = [
            "As a lead software architect for FastAPP, a low-code enterprise platform I help product owners translate their business requirements into clean, robust and extensible technical solutions.",
            "As a competence leader in the area of .NET, I help backend programmers hone their skills by supporting them in their everyday work.",
            "As a leader of an internal knowledge-sharing programme, I organize monthly meetings where passion-driven people can share their knowledge with the rest of the company.",
            "Furthermore, I do technical interviews and serve as a conference speaker on behalf of Fabrity"
        ]
        )
        
        return cls(data=[experience_1, experience_2])
        


@router.get("/job-info", response_model=WorkExperience)
def get_job_info():
    
    work_experience_data = WorkExperience.create()
    return work_experience_data
