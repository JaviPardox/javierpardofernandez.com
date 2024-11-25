from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from enum import Enum
from typing import List, Union
import json

# Define router
router = APIRouter()

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

# Preview data model
class BlogPreview(BaseModel):
    id: str
    date: str
    title: str
    preview_text: str
    
    @classmethod
    def from_json_file(cls, file_name: str) -> List["BlogPreview"]:
        file_path = f"data/{file_name}"
        with open(file_path, 'r') as file:
            data = json.load(file)
        return [cls.model_validate(preview) for preview in data["previews"]]

# Full blog data model
class BlogPost(BlogPreview):
    content_blocks: List[ContentBlock]
    
    @classmethod
    def from_json_file(cls, file_name: str, post_id: str) -> "BlogPost":
        file_path = f"data/{file_name}"
        with open(file_path, 'r') as file:
            json_data = file.read()
        posts = cls.model_validate_json(json_data)["posts"]
        if post_id not in posts:
            raise ValueError("Blog post not found")
        return cls(**posts[post_id])


@router.get("/blog/preview", response_model=List[BlogPreview])
async def get_blog_previews():
    return BlogPreview.from_json_file("blog_data.json")

@router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    try:
        return BlogPost.from_json_file("blog_data.json", post_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
