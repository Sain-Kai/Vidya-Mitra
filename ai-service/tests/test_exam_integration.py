"""
Integration test suite for Part 3 Exam Revision Planner.
Tests end to end integration between diagnostic assessment weaknesses
and automated spaced revision schedule generation.
"""
import unittest
from datetime import date, timedelta
from app.services.diagnostic_assessment_engine import DiagnosticAssessmentEngine
from app.services.exam_revision_scheduler import ExamRevisionSchedulerEngine

class TestExamRevisionIntegration(unittest.TestCase):
    def setUp(self):
        self.diagnostic_engine = DiagnosticAssessmentEngine()
        self.scheduler_engine = ExamRevisionSchedulerEngine()

    def test_assessment_to_revision_schedule_pipeline(self):
        student_answers = {
            "math_c4_01": 1,
            "math_c4_02": 0,
            "math_c4_03": "incorrect",
            "math_c4_04": "insufficient"
        }
        assessment_result = self.diagnostic_engine.evaluate_assessment(
            subject="Mathematics",
            grade_level="Class 4",
            student_answers=student_answers
        )
        detected_weaknesses = assessment_result["weak_topics"]
        self.assertTrue(len(detected_weaknesses) >= 2)

        exam_date_str = (date.today() + timedelta(days=14)).strftime("%Y-%m-%d")
        schedule = self.scheduler_engine.generate_revision_schedule(
            exam_title="Term 1 Mathematics Exam",
            subject="Mathematics",
            exam_date_str=exam_date_str,
            grade_level="Class 4",
            weak_topics=detected_weaknesses
        )

        self.assertEqual(schedule["status"], "success")
        self.assertEqual(schedule["days_remaining"], 14)
        self.assertEqual(schedule["weak_topics_prioritized"], detected_weaknesses)

        phase2 = schedule["revision_phases"][1]
        task_descriptions = [t["text"] for t in phase2["daily_tasks"]]

        for weak_topic in detected_weaknesses:
            matched = any(weak_topic in desc for desc in task_descriptions)
            self.assertTrue(matched)

    def test_schedule_task_completion_lifecycle(self):
        exam_date_str = (date.today() + timedelta(days=10)).strftime("%Y-%m-%d")
        schedule = self.scheduler_engine.generate_revision_schedule(
            exam_title="Unit Test",
            subject="Science",
            exam_date_str=exam_date_str,
            weak_topics=["Plant Biology"]
        )

        phase1_tasks = schedule["revision_phases"][0]["daily_tasks"]
        target_task_id = phase1_tasks[1]["task_id"]
        self.assertFalse(phase1_tasks[1]["completed"])

        updated = self.scheduler_engine.toggle_milestone_task(
            schedule,
            "phase_1",
            target_task_id
        )
        self.assertTrue(updated["revision_phases"][0]["daily_tasks"][1]["completed"])

if __name__ == "__main__":
    unittest.main()
