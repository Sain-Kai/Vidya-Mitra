"""
Exam Revision Scheduler Engine for Vidya Mitra.
Generates structured revision milestones leading up to school unit tests and term exams.
Calculates spaced repetition cycles across foundation review, practice drills, and mock testing.
"""
from typing import Dict, Any, List, Optional
from datetime import datetime, date, timedelta

class ExamRevisionSchedulerEngine:
    def __init__(self):
        self.default_subjects = ["Mathematics", "Science", "Social Studies", "English", "Hindi"]

    def calculate_days_available(self, target_exam_date_str: str) -> int:
        """
        Calculates remaining days until the exam date string formatted as YYYY-MM-DD.
        """
        try:
            target_date = datetime.strptime(target_exam_date_str, "%Y-%m-%d").date()
            today = date.today()
            delta = (target_date - today).days
            return max(1, delta)
        except Exception:
            return 7

    def generate_revision_schedule(
        self,
        exam_title: str,
        subject: str,
        exam_date_str: str,
        grade_level: str = "Class 4",
        syllabus_chapters: Optional[List[str]] = None,
        weak_topics: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Constructs a 3-phase revision cycle:
        Phase 1: Concept and Story Foundations
        Phase 2: Deep Practice and Weak Area Drills
        Phase 3: Mock Testing and Rapid Recall Polish
        """
        days_available = self.calculate_days_available(exam_date_str)
        chapters = syllabus_chapters or [
            "Chapter 1: Number Systems and Place Value",
            "Chapter 2: Addition and Subtraction Stories",
            "Chapter 3: Fractions and Equal Sharing",
            "Chapter 4: Time, Clocks and Calendar Math",
            "Chapter 5: Perimeter and Basic Shapes"
        ]
        weak_areas = weak_topics or []

        phase1_days = max(1, int(days_available * 0.4))
        phase2_days = max(1, int(days_available * 0.4))
        phase3_days = max(1, days_available - phase1_days - phase2_days)

        today = date.today()
        p1_start = today
        p1_end = today + timedelta(days=phase1_days)
        p2_start = p1_end
        p2_end = p2_start + timedelta(days=phase2_days)
        p3_start = p2_end
        p3_end = today + timedelta(days=days_available)

        phase2_tasks = [
            {
                "task_id": "t2_01",
                "text": "Attempt 10 multi format diagnostic assessment questions",
                "completed": False,
                "time_minutes": 20
            },
            {
                "task_id": "t2_02",
                "text": "Work through step by step solutions for multi step word problems",
                "completed": False,
                "time_minutes": 25
            },
            {
                "task_id": "t2_03",
                "text": "Practice neat diagram drawing and unit labeling",
                "completed": False,
                "time_minutes": 15
            }
        ]

        if weak_areas:
            for idx, wt in enumerate(weak_areas):
                phase2_tasks.insert(1, {
                    "task_id": f"t2_weak_{idx + 1}",
                    "text": f"Prioritized Foundation Review: {wt} using concrete stories",
                    "completed": False,
                    "time_minutes": 20
                })

        milestones = [
            {
                "phase_id": "phase_1",
                "phase_name": "Phase 1: Concept and Story Foundations",
                "focus_area": "Build intuitive understanding without rote memorization",
                "days_allocated": phase1_days,
                "start_date": p1_start.strftime("%Y-%m-%d"),
                "end_date": p1_end.strftime("%Y-%m-%d"),
                "status": "in_progress",
                "daily_tasks": [
                    {
                        "task_id": "t1_01",
                        "text": "Review core concepts with Vidya Mitra Socratic tutor",
                        "completed": True,
                        "time_minutes": 25
                    },
                    {
                        "task_id": "t1_02",
                        "text": "Complete in-lesson micro recaps and concept recall checks",
                        "completed": False,
                        "time_minutes": 15
                    },
                    {
                        "task_id": "t1_03",
                        "text": "Note down unfamiliar terms and listen to mother tongue explanation",
                        "completed": False,
                        "time_minutes": 10
                    }
                ]
            },
            {
                "phase_id": "phase_2",
                "phase_name": "Phase 2: Deep Practice and Weak Area Drills",
                "focus_area": "Targeted practice on previously missed question types",
                "days_allocated": phase2_days,
                "start_date": p2_start.strftime("%Y-%m-%d"),
                "end_date": p2_end.strftime("%Y-%m-%d"),
                "status": "planned",
                "daily_tasks": phase2_tasks
            },
            {
                "phase_id": "phase_3",
                "phase_name": "Phase 3: Mock Testing and Rapid Recall Polish",
                "focus_area": "Timed exam simulation and teacher evaluation rubric check",
                "days_allocated": phase3_days,
                "start_date": p3_start.strftime("%Y-%m-%d"),
                "end_date": p3_end.strftime("%Y-%m-%d"),
                "status": "planned",
                "daily_tasks": [
                    {
                        "task_id": "t3_01",
                        "text": "Solve one full length timed mock question paper",
                        "completed": False,
                        "time_minutes": 45
                    },
                    {
                        "task_id": "t3_02",
                        "text": "Upload handwritten answer transcript to Paper Evaluator for feedback",
                        "completed": False,
                        "time_minutes": 15
                    },
                    {
                        "task_id": "t3_03",
                        "text": "Listen to audio revision summary with parents and sleep on time",
                        "completed": False,
                        "time_minutes": 10
                    }
                ]
            }
        ]

        parent_reminders = {
            "hi": f"परीक्षा में {days_available} दिन शेष हैं। आज का लक्ष्य: {milestones[0]['daily_tasks'][0]['text']}",
            "bn": f"পরীক্ষায় {days_available} দিন বাকি রয়েছে। আজকের লক্ষ্য: প্রাথমিক ধারণা পুনরাবৃত্তি।",
            "en": f"{days_available} days remaining until {exam_title}. Daily focus: {milestones[0]['focus_area']}."
        }

        return {
            "status": "success",
            "exam_title": exam_title,
            "subject": subject,
            "grade_level": grade_level,
            "exam_date": exam_date_str,
            "days_remaining": days_available,
            "syllabus_chapters": chapters,
            "weak_topics_prioritized": weak_areas,
            "revision_phases": milestones,
            "parent_reminders": parent_reminders
        }

    def toggle_milestone_task(
        self,
        schedule: Dict[str, Any],
        phase_id: str,
        task_id: str
    ) -> Dict[str, Any]:
        """
        Toggles the completion status of a specific daily revision task.
        """
        for phase in schedule.get("revision_phases", []):
            if phase.get("phase_id") == phase_id:
                for task in phase.get("daily_tasks", []):
                    if task.get("task_id") == task_id:
                        task["completed"] = not task.get("completed", False)
                        break
        return schedule
