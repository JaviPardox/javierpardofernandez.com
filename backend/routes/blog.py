from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator
from datetime import datetime
from enum import Enum
from typing import List, Union
import json

# Define router
router = APIRouter()

def validate_blog_data(data):
    preview_ids = {preview['id'] for preview in data['previews']}
    
    post_ids = set(data['posts'].keys())
    
    missing_post_ids = preview_ids - post_ids
    missing_preview_ids = post_ids - preview_ids
    
    if missing_post_ids:
        raise ValueError(f"Missing posts for preview IDs: {missing_post_ids}")
    
    if missing_preview_ids:
        raise ValueError(f"Missing previews for post IDs: {missing_preview_ids}")
    
    return True
# Define content types for the blog
class ContentType(str, Enum):
    text = "text"
    dotted_list = "dotted_list"
    numbered_list = "numbered_list"
    code_block = "code_block"
    image = "image"
    title = "title"
    small_title = "small_title"

# Data model for each blog content block
class ContentBlock(BaseModel):
    type: ContentType
    content: Union[str, List[str]]  # Supports text, lists, and code
    
    @field_validator('content')
    @classmethod
    def validate_content(cls, v, info):
        content_type = info.data.get('type')
        # Ensure lists are used for list types
        if content_type in [ContentType.dotted_list, ContentType.numbered_list]:
            if not isinstance(v, list):
                raise ValueError(f"Content for {content_type} must be a list")
        
        # Ensure string for non-list types
        elif content_type in [ContentType.text, ContentType.code_block, ContentType.image, 
                               ContentType.title, ContentType.small_title]:
            if not isinstance(v, str):
                raise ValueError(f"Content for {content_type} must be a string")
        
        return v
    
    @field_validator('content')
    @classmethod
    def validate_content_not_empty(cls, v, info):
        if not v:
            raise ValueError("Content cannot be empty")
        return v

# Preview data model
class BlogPreview(BaseModel):
    id: str
    date: str
    title: str
    preview_text: str
    
    @field_validator('id')
    @classmethod
    def validate_id(cls, v):
        # Ensure id is not empty and meets some basic criteria
        if not v or len(v.strip()) == 0:
            raise ValueError("ID cannot be empty")
        return v.strip()
    
    @field_validator('date')
    @classmethod
    def validate_date(cls, v):
        # Validate date in the format "September 27, 2024"
        try:
            # Parse the date using the specific format
            datetime.strptime(v, "%B %d, %Y")
            return v
        except ValueError:
            raise ValueError("Date must be in the format 'Month Day, Year' (e.g., 'September 27, 2024')")
    
    @field_validator('title')
    @classmethod
    def validate_title(cls, v):
        # Ensure title is not too short or too long
        if not v or len(v.strip()) < 3:
            raise ValueError("Title must be at least 3 characters long")
        if len(v) > 200:
            raise ValueError("Title cannot be longer than 200 characters")
        return v.strip()

    @field_validator('preview_text')
    @classmethod
    def validate_preview_text(cls, v):
        # Ensure preview text is not empty and not too long
        if not v or len(v.strip()) == 0:
            raise ValueError("Preview text cannot be empty")
        if len(v) > 500:
            raise ValueError("Preview text cannot be longer than 500 characters")
        return v.strip()

    
    @classmethod
    def from_json_file(cls, file_name: str) -> List["BlogPreview"]:
        file_path = f"data/{file_name}"
        with open(file_path, 'r') as file:
            data = json.load(file)
            
        validate_blog_data(data)
        return [cls.model_validate(preview) for preview in data["previews"]]

# Full blog data model
class BlogPost(BlogPreview):
    content_blocks: List[ContentBlock]
    
    @field_validator('content_blocks')
    @classmethod
    def validate_content_blocks(cls, v):
        if not v:
            raise ValueError("Content blocks cannot be empty")
        return v
    
    @classmethod
    def from_json_file(cls, file_name: str, post_id: str) -> "BlogPost":
        file_path = f"data/{file_name}"
        with open(file_path, 'r') as file:
            data = json.load(file)
            
        validate_blog_data(data)
        posts = data.get("posts", {})
        post_data = posts.get(post_id)
    
        if not post_data:
            raise ValueError("Blog post not found")

        return cls.model_validate(post_data)

# add erros and validators

@router.get("/blog/preview", response_model=List[BlogPreview])
async def get_blog_previews():
    return BlogPreview.from_json_file("blog_data.json")

@router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    try:
        return BlogPost.from_json_file("blog_data.json", post_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
