"""
Unit tests for multi format assessment and diagnostic recommendation engine.
Tests question generation, scoring, weak area diagnosis,
adaptive remediation lessons, and regional parent summaries.
"""
import unittest
from app.services.diagnostic_assessment_engine import DiagnosticAssessmentEngine

class TestDiagnosticAssessmentEngine(unittest.TestCase):
    def setUp(self):
        self.engine = DiagnosticAssessmentEngine()

    def test_assessment_generation_structure(self):
        assessment = self.engine.generate_assessment("Mathematics", "Class 4")
        self.assertEqual(assessment["status"], "success")
        self.assertTrue(assessment["question_count"] >= 4)
        self.assertTrue(assessment["total_points"] >= 5.0)

        formats = assessment["question_formats"]
        self.assertIn("MCQ", formats)
        self.assertIn("LOGICAL", formats)
        self.assertIn("SHORT_ANSWER", formats)
        self.assertIn("LONG_ANSWER", formats)

    def test_assessment_evaluation_full_marks(self):
        full_answers = {
            "math_c4_01": 1,
            "math_c4_02": 1,
            "math_c4_03": "one fourth",
            "math_c4_04": "add all four sides length and breadth to get 60 meters perimeter"
        }
        result = self.engine.evaluate_assessment("Mathematics", "Class 4", full_answers)
        self.assertEqual(result["mastery_percentage"], 100.0)
        self.assertEqual(len(result["weak_topics"]), 0)
        for tm in result["topic_mastery"]:
            self.assertEqual(tm["status"], "Mastered")

    def test_weak_topics_detection(self):
        poor_answers = {
            "math_c4_01": 0,
            "math_c4_02": 0,
            "math_c4_03": "incorrect guess",
            "math_c4_04": "no idea"
        }
        result = self.engine.evaluate_assessment("Mathematics", "Class 4", poor_answers)
        self.assertTrue(result["mastery_percentage"] < 30.0)
        self.assertTrue(len(result["weak_topics"]) >= 2)

        weak_list = result["weak_topics"]
        self.assertIn("Word Problems and Logical Reasoning", weak_list)

    def test_adaptive_remediation_generation(self):
        weak_topics = ["Word Problems and Logical Reasoning", "Fractions and Parts"]
        lessons = self.engine.generate_adaptive_remediation(weak_topics, "Class 4")
        self.assertEqual(len(lessons), 2)

        first_lesson = lessons[0]
        self.assertEqual(first_lesson["topic"], "Word Problems and Logical Reasoning")
        self.assertTrue(len(first_lesson["foundation_analogy"]) > 10)
        self.assertTrue(len(first_lesson["simplified_steps"]) >= 3)
        self.assertTrue(len(first_lesson["practice_challenge"]) > 5)

    def test_multilingual_parent_summary(self):
        report = self.engine.generate_parent_summary_report(
            overall_percentage=45.5,
            weak_topics=["Word Problems and Logical Reasoning"],
            subject="Mathematics",
            grade_level="Class 4"
        )
        self.assertEqual(report["overall_percentage"], 45.5)
        self.assertIn("en", report["summaries"])
        self.assertIn("hi", report["summaries"])
        self.assertIn("bn", report["summaries"])
        self.assertTrue("विद्या मित्र" in report["summaries"]["hi"])

if __name__ == "__main__":
    unittest.main()
