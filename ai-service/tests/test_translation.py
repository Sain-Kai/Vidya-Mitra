"""
Unit test suite for Indic translation and OCR services.
Tests all 10 supported regional Indian languages and child notes.
"""
import unittest
from app.services.translation_engine import IndicTranslationEngine, INDIAN_LANG_MAP
from app.services.ocr_engine import IndicOCREngine

class TestIndicTranslationAndOCR(unittest.TestCase):
    def setUp(self):
        self.engine = IndicTranslationEngine()
        self.ocr = IndicOCREngine()

    def test_supported_languages_count(self):
        self.assertEqual(len(self.engine.supported_langs), 10)
        expected_codes = ["hi", "bn", "te", "ta", "mr", "gu", "kn", "ml", "pa", "or"]
        for code in expected_codes:
            self.assertIn(code, self.engine.supported_langs)

    def test_photosynthesis_translation_all_languages(self):
        sample_text = "Plants make their food using sunlight through photosynthesis."
        for lang_code in INDIAN_LANG_MAP.keys():
            result = self.engine.translate_text(sample_text, target_lang=lang_code)
            self.assertEqual(result["status"], "success")
            self.assertTrue(len(result["translated_text"]) > 5)
            self.assertTrue(len(result["child_friendly_explanation"]) > 5)

    def test_water_cycle_translation(self):
        sample_text = "The water cycle moves water through evaporation and rain."
        result_hi = self.engine.translate_text(sample_text, target_lang="hi")
        self.assertIn("जल चक्र", result_hi["translated_text"])
        
        result_bn = self.engine.translate_text(sample_text, target_lang="bn")
        self.assertIn("জলচক্র", result_bn["translated_text"])

    def test_ocr_crop_extraction(self):
        result = self.ocr.extract_text_from_crop(sample_text="Fractions show equal parts of a whole.")
        self.assertEqual(result["status"], "success")
        self.assertEqual(result["word_count"], 7)
        self.assertTrue(result["confidence_score"] > 0.9)
        self.assertEqual(len(result["bounding_boxes"]), 7)

if __name__ == "__main__":
    unittest.main()
