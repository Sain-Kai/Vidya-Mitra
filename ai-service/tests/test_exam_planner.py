"""
Unit tests for exam revision scheduler engine.
Tests calendar calculation, 3-phase revision cycle generation,
weak topic prioritization, task status toggling, and parent reminder notices.
"""
import unittest
from datetime import date, timedelta
from app.services.exam_revision_scheduler import ExamRevisionSchedulerEngine

class TestExamRevisionScheduler(unittest.TestCase):
    def setUp(self):
        self.engine = ExamRevisionSchedulerEngine()

    def test_calendar_days_calculation(self):
        future_date = (date.today() + timedelta(days=12)).strftime("%Y-%m-%d")
        days = self.engine.calculate_days_available(future_date)
        self.assertEqual(days, 12)

        past_date = (date.today() - timedelta(days=5)).strftime("%Y-%m-%d")
        fallback_days = self.engine.calculate_days_available(past_date)
        self.assertEqual(fallback_days, 1)

    def test_revision_schedule_3_phases(self):
        target_date = (date.today() + timedelta(days=10)).strftime("%Y-%m-%d")
        schedule = self.engine.generate_revision_schedule(
            exam_title="Unit Test 2",
            subject="Mathematics",
            exam_date_str=target_date,
            grade_level="Class 4"
        )
        self.assertEqual(schedule["status"], "success")
        self.assertEqual(schedule["days_remaining"], 10)

        phases = schedule["revision_phases"]
        self.assertEqual(len(phases), 3)

        phase1 = phases[0]
        phase2 = phases[1]
        phase3 = phases[2]

        self.assertEqual(phase1["phase_id"], "phase_1")
        self.assertEqual(phase2["phase_id"], "phase_2")
        self.assertEqual(phase3["phase_id"], "phase_3")

        self.assertTrue(len(phase1["daily_tasks"]) >= 3)
        self.assertTrue(len(phase2["daily_tasks"]) >= 3)
        self.assertTrue(len(phase3["daily_tasks"]) >= 3)

    def test_weak_topics_prioritization(self):
        target_date = (date.today() + timedelta(days=14)).strftime("%Y-%m-%d")
        weak_list = ["Fractions and Decimals", "Speed Distance and Time"]
        schedule = self.engine.generate_revision_schedule(
            exam_title="Term 1 Science",
            subject="Science",
            exam_date_str=target_date,
            weak_topics=weak_list
        )
        self.assertEqual(schedule["weak_topics_prioritized"], weak_list)

        phase2_tasks = schedule["revision_phases"][1]["daily_tasks"]
        task_texts = [t["text"] for t in phase2_tasks]
        
        has_fraction_remedy = any("Fractions and Decimals" in t for t in task_texts)
        has_speed_remedy = any("Speed Distance and Time" in t for t in task_texts)
        self.assertTrue(has_fraction_remedy)
        self.assertTrue(has_speed_remedy)

    def test_toggle_milestone_task(self):
        target_date = (date.today() + timedelta(days=7)).strftime("%Y-%m-%d")
        schedule = self.engine.generate_revision_schedule(
            exam_title="Class 4 Math",
            subject="Mathematics",
            exam_date_str=target_date
        )

        initial_state = schedule["revision_phases"][0]["daily_tasks"][1]["completed"]
        self.assertFalse(initial_state)

        updated = self.engine.toggle_milestone_task(schedule, "phase_1", "t1_02")
        new_state = updated["revision_phases"][0]["daily_tasks"][1]["completed"]
        self.assertTrue(new_state)

        toggled_back = self.engine.toggle_milestone_task(updated, "phase_1", "t1_02")
        final_state = toggled_back["revision_phases"][0]["daily_tasks"][1]["completed"]
        self.assertFalse(final_state)

    def test_parent_reminders_multilingual(self):
        target_date = (date.today() + timedelta(days=5)).strftime("%Y-%m-%d")
        schedule = self.engine.generate_revision_schedule(
            exam_title="Class 4 EVS",
            subject="Science",
            exam_date_str=target_date
        )
        reminders = schedule["parent_reminders"]
        self.assertIn("hi", reminders)
        self.assertIn("bn", reminders)
        self.assertIn("en", reminders)
        self.assertTrue("परीक्षा" in reminders["hi"])
        self.assertTrue("পরীক্ষা" in reminders["bn"])

if __name__ == "__main__":
    unittest.main()
