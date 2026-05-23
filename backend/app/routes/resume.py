from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.utils.pdf_parser import extract_text
from app.ai.gemini_service import ask_gemini

router = APIRouter()

UPLOAD_FOLDER = "uploads"

@router.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):

    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_text(file_path)

    prompt = f'''
    Analyze this resume.

    Give:
    1. ATS score out of 100
    2. Skills detected
    3. Missing skills
    4. Resume strengths
    5. Resume weaknesses
    6. Improvement suggestions

    Resume:

    {resume_text}
    '''

    result = ask_gemini(prompt)

    return {
        "analysis": result
    }