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
from app.services.diagnostic_assessment_engine import DiagnosticAssessmentEngine
from app.services.exam_revision_scheduler import ExamRevisionSchedulerEngine

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
assessment_engine = DiagnosticAssessmentEngine()
scheduler_engine = ExamRevisionSchedulerEngine()

class TranslationRequest(BaseModel):
    text: str
    source_lang: Optional[str] = "en"
    target_lang: str = "hi"

class OCRRequest(BaseModel):
    image_base64: Optional[str] = None
    sample_text: Optional[str] = None

class AssessmentGenerateRequest(BaseModel):
    subject: Optional[str] = "Mathematics"
    grade_level: Optional[str] = "Class 4"

class AssessmentSubmitRequest(BaseModel):
    subject: str = "Mathematics"
    grade_level: str = "Class 4"
    answers: Dict[str, Any]

class ExamScheduleGenerateRequest(BaseModel):
    exam_title: Optional[str] = "Term 1 Mathematics Exam"
    subject: Optional[str] = "Mathematics"
    exam_date: Optional[str] = "2026-12-05"
    grade_level: Optional[str] = "Class 4"
    syllabus_chapters: Optional[List[str]] = None
    weak_topics: Optional[List[str]] = None

class ExamTaskToggleRequest(BaseModel):
    schedule: Dict[str, Any]
    phase_id: str
    task_id: str

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

@app.post("/api/assessment/generate")
def generate_diagnostic_assessment(req: AssessmentGenerateRequest):
    return assessment_engine.generate_assessment(
        subject=req.subject or "Mathematics",
        grade_level=req.grade_level or "Class 4"
    )

@app.post("/api/assessment/submit")
def submit_diagnostic_assessment(req: AssessmentSubmitRequest):
    return assessment_engine.evaluate_assessment(
        subject=req.subject,
        grade_level=req.grade_level,
        student_answers=req.answers
    )

@app.get("/api/performance/diagnostics")
def get_performance_diagnostics(subject: str = "Mathematics", grade_level: str = "Class 4"):
    assessment = assessment_engine.generate_assessment(subject, grade_level)
    sample_answers = {
        "math_c4_01": 1,
        "math_c4_02": 0,
        "math_c4_03": "quarter",
        "math_c4_04": "add 20 and 10 meters"
    }
    return assessment_engine.evaluate_assessment(subject, grade_level, sample_answers)

@app.post("/api/exam/generate-schedule")
def generate_exam_revision_schedule(req: ExamScheduleGenerateRequest):
    return scheduler_engine.generate_revision_schedule(
        exam_title=req.exam_title or "Term 1 Mathematics Exam",
        subject=req.subject or "Mathematics",
        exam_date_str=req.exam_date or "2026-12-05",
        grade_level=req.grade_level or "Class 4",
        syllabus_chapters=req.syllabus_chapters,
        weak_topics=req.weak_topics
    )

@app.post("/api/exam/toggle-task")
def toggle_revision_milestone_task(req: ExamTaskToggleRequest):
    return scheduler_engine.toggle_milestone_task(
        schedule=req.schedule,
        phase_id=req.phase_id,
        task_id=req.task_id
    )

@app.get("/api/exam/active-schedule")
def get_active_exam_schedule(subject: str = "Mathematics", grade_level: str = "Class 4"):
    return scheduler_engine.generate_revision_schedule(
        exam_title=f"Upcoming {subject} Examination",
        subject=subject,
        exam_date_str="2026-12-05",
        grade_level=grade_level,
        weak_topics=["Word Problems and Logical Reasoning", "Perimeter and Area"]
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
