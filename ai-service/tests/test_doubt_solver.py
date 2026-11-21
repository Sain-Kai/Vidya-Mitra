"""
Unit tests for multimodal conceptual doubt solver and progressive explainer engine.
Tests step by step reasoning, everyday physical analogies,
progressive simplification levels, and NCERT citations.
"""
import unittest
from app.services.doubt_solver_engine import MultimodalDoubtSolverEngine

class TestMultimodalDoubtSolver(unittest.TestCase):
    def setUp(self):
        self.engine = MultimodalDoubtSolverEngine()

    def test_fraction_doubt_resolution(self):
        res = self.engine.solve_doubt(
            question_text="How do I add 1/2 and 1/4?",
            grade=4,
            subject="Mathematics",
            simplification_level=1
        )
        self.assertEqual(res["status"], "success")
        self.assertEqual(res["topic"], "Fractions and Parts")
        self.assertTrue(len(res["step_by_step_solution"]) >= 4)
        self.assertTrue(len(res["real_world_analogy"]) > 10)
        self.assertIn("NCERT", res["ncert_citation"])

    def test_science_density_doubt_resolution(self):
        res = self.engine.solve_doubt(
            question_text="Why does ice float on water?",
            grade=5,
            subject="Science",
            simplification_level=2
        )
        self.assertEqual(res["status"], "success")
        self.assertEqual(res["topic"], "States of Matter and Density")
        self.assertEqual(res["current_simplification_level"], 2)
        self.assertTrue("Story" in res["level_explanation"])
        self.assertTrue(len(res["real_world_analogy"]) > 10)

    def test_photosynthesis_doubt_resolution(self):
        res = self.engine.solve_doubt(
            question_text="How do leaves prepare food in sunlight?",
            grade=4,
            subject="Science",
            simplification_level=1
        )
        self.assertEqual(res["status"], "success")
        self.assertEqual(res["topic"], "Plant Biology and Sunshine")
        self.assertTrue("kitchen" in res["real_world_analogy"].lower() or "rotis" in res["real_world_analogy"].lower())

    def test_progressive_simplification_levels(self):
        q = "Why does ice float on water?"
        lvl1 = self.engine.solve_doubt(q, 4, "Science", 1)
        self.assertEqual(lvl1["current_simplification_level"], 1)

        lvl2 = self.engine.simplify_further(q, current_level=1, grade=4)
        self.assertEqual(lvl2["current_simplification_level"], 2)
        self.assertTrue("Story" in lvl2["level_explanation"])

        lvl3 = self.engine.simplify_further(q, current_level=2, grade=4)
        self.assertEqual(lvl3["current_simplification_level"], 3)
        self.assertTrue("Ultra Simple" in lvl3["level_explanation"])

    def test_hindi_parent_note_generation(self):
        res = self.engine.solve_doubt(
            question_text="1/2 + 1/4 fraction doubt",
            grade=4,
            subject="Mathematics"
        )
        parent_note = res["parent_note_hindi"]
        self.assertTrue(len(parent_note) > 10)
        self.assertTrue("रोटी" in parent_note or "बच्चे" in parent_note)

if __name__ == "__main__":
    unittest.main()
