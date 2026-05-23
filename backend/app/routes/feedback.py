from fastapi import APIRouter
from pydantic import BaseModel

from app.ai.gemini_service import ask_gemini

router = APIRouter()

class FeedbackRequest(BaseModel):
    question: str
    answer: str

@router.post("/evaluate-answer")
def evaluate_answer(data: FeedbackRequest):

    prompt = f'''
    Evaluate this interview answer.

    Question:
    {data.question}

    Answer:
    {data.answer}

    Give:
    1. Technical score out of 10
    2. Communication score out of 10
    3. Grammar mistakes
    4. Better answer suggestion
    5. Improvement tips
    '''

    result = ask_gemini(prompt)

    return {
        "feedback": result
    }