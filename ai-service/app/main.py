"""
Vidya Mitra AI Microservice Entrypoint.
FastAPI Application providing Indic Translation, OCR, Socratic Tutor,
Diagnostic Assessments, and Paper Grading.
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from app.services.translation_engine import IndicTranslationEngine
from app.services.ocr_engine import IndicOCREngine
from app.services.socratic_tutor import SocraticTutorEngine
from app.services.exam_evaluator import ExamEvaluatorEngine

app = FastAPI(
    title="Vidya Mitra AI Service",
    description="Intelligent Socratic Multi modal Tutoring Engine for Classes 1 to 8",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

translation_engine = IndicTranslationEngine()
ocr_engine = IndicOCREngine()
tutor_engine = SocraticTutorEngine()
evaluator_engine = ExamEvaluatorEngine()

class TranslationRequest(BaseModel):
    text: str
    source_lang: Optional[str] = "en"
    target_lang: str = "hi"

class OCRRequest(BaseModel):
    image_base64: Optional[str] = None
    sample_text: Optional[str] = None

class TutorAskRequest(BaseModel):
    topic: str
    question: Optional[str] = None
    grade: Optional[int] = 4
    simplification_level: Optional[int] = 1
    language: Optional[str] = "hi"

class DoubtSolverRequest(BaseModel):
    question_text: str
    grade: Optional[int] = 4
    subject: Optional[str] = "Mathematics"
    image_base64: Optional[str] = None

class PaperGradingRequest(BaseModel):
    question_paper_text: Optional[str] = "Class 4 Term 1 Exam"
    student_answers_text: Optional[str] = "Student handwritten answer transcript"
    subject: Optional[str] = "Mathematics"
    grade: Optional[int] = 4

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Vidya Mitra AI Engine",
        "target_grades": "Class 1 to 8",
        "supported_indic_languages": list(translation_engine.supported_langs.keys()),
    }

@app.post("/api/ocr/extract")
def extract_text_from_camera(req: OCRRequest):
    return ocr_engine.extract_text_from_crop(
        image_data=req.image_base64,
        sample_text=req.sample_text
    )

@app.post("/api/translate/ocr")
def translate_ocr_text(req: TranslationRequest):
    return translation_engine.translate_text(
        text=req.text,
        source_lang=req.source_lang,
        target_lang=req.target_lang,
    )

@app.post("/api/tutor/ask")
def ask_socratic_tutor(req: TutorAskRequest):
    return tutor_engine.explain_topic(
        topic=req.topic,
        student_question=req.question,
        grade=req.grade,
        simplification_level=req.simplification_level,
        language=req.language,
    )

@app.post("/api/tutor/doubt-solver")
def solve_doubt_conceptually(req: DoubtSolverRequest):
    return {
        "question": req.question_text,
        "subject": req.subject,
        "grade": req.grade,
        "step_by_step_solution": [
            "Step 1: Understand what is given and what needs to be found.",
            "Step 2: Connect with everyday physical items like sharing fruits or water.",
            "Step 3: Carry out calculations neatly with units.",
            "Step 4: Check if the answer makes logical sense.",
        ],
        "foundation_story": "जब भी सवाल कठिन लगे, संख्याओं को अपनी पसंदीदा चीज़ों के रूप में सोचो!",
        "citations": [f"NCERT Class {req.grade} {req.subject}"],
    }

@app.post("/api/evaluation/grade-paper")
def grade_exam_paper(req: PaperGradingRequest):
    return evaluator_engine.evaluate_submission(
        question_paper_text=req.question_paper_text or "",
        student_answers_text=req.student_answers_text or "",
        subject=req.subject or "Mathematics",
        grade=req.grade or 4,
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
