from fastapi import APIRouter
from pydantic import BaseModel

from app.ai.gemini_service import ask_gemini

router = APIRouter()

class InterviewRequest(BaseModel):
    domain: str
    difficulty: str


@router.post("/generate-questions")
def generate_questions(data: InterviewRequest):

    prompt = f"""
    Generate 5 {data.difficulty} level interview questions
    for {data.domain}.

    Include:
    - technical questions
    - HR questions
    - behavioral questions
    """

    result = ask_gemini(prompt)

    return {
        "questions": result
    }