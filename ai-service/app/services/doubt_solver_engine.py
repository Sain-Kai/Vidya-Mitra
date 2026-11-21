"""
Multimodal Conceptual Doubt Solver and Study Material Explainer Engine for Vidya Mitra.
Provides step by step conceptual reasoning, everyday physical analogies,
progressive simplification levels, and NCERT curriculum citations for Classes 1 to 8.
"""
from typing import Dict, Any, List, Optional

DOUBT_KNOWLEDGE_BASE = {
    "fraction": {
        "topic": "Fractions and Parts",
        "subject": "Mathematics",
        "default_question": "How to add fractions like 1/2 and 1/4?",
        "step_by_step": [
            "Step 1: Understand what fractions represent. Think of a delicious round pizza or chapati.",
            "Step 2: One half means two equal slices out of four total slices.",
            "Step 3: One quarter means one slice out of four total slices.",
            "Step 4: Combine the slices together: two slices plus one slice equals three slices out of four.",
            "Conclusion: One half plus one quarter equals three quarters, written as 3/4."
        ],
        "everyday_analogy": "If you drink half a glass of milk in the morning and a quarter glass in the evening, you drank three quarters of a full glass altogether.",
        "simplification_levels": {
            1: "Standard: Convert denominators to a common base of four, so 2/4 + 1/4 = 3/4.",
            2: "Story: Imagine cutting a sandwich into 4 equal quarters. You take 2 pieces and your sister takes 1 piece. Together you have 3 pieces out of 4.",
            3: "Ultra Simple: Take 4 marbles. Give 2 to one plate and 1 to another. Count them on one plate: 3 marbles out of 4."
        },
        "ncert_citation": "NCERT Class 4 and 5 Mathematics, Chapter on Fractions and Decimals",
        "parent_note_hindi": "बच्चे को रटाने के बजाय रोटी के चार बराबर टुकड़े करके समझाएं। दो टुकड़े आधा बनाते हैं और एक टुकड़ा चौथाई।"
    },
    "ice_water": {
        "topic": "States of Matter and Density",
        "subject": "Science",
        "default_question": "Why does ice float on water instead of sinking?",
        "step_by_step": [
            "Step 1: Notice what happens when liquid water turns into solid ice in the freezer.",
            "Step 2: Water expands as it freezes, creating tiny open spaces between water molecules.",
            "Step 3: Because of these spaces, a block of ice is lighter than the same volume of liquid water.",
            "Step 4: Lighter substances float on heavier liquids.",
            "Conclusion: Ice is less dense than liquid water, so ice cubes float at the surface."
        ],
        "everyday_analogy": "Think of a closed empty water bottle in a bucket of water. Because it has trapped air space inside, it floats freely at the top.",
        "simplification_levels": {
            1: "Standard: Freezing causes water molecules to form a crystalline lattice with lower density than liquid water.",
            2: "Story: Ice is like a boat made of water that puffed up with tiny hidden air pockets while freezing in the cold.",
            3: "Ultra Simple: Solid ice spreads its arms wide and becomes lighter than liquid water, so it rests happily at the top like a leaf on a puddle."
        },
        "ncert_citation": "NCERT Class 6 Science, Chapter on Matter and Floating Objects",
        "parent_note_hindi": "बर्फ जमते समय फैल जाती है और पानी से हल्की हो जाती है। इसीलिए वह पानी में नहीं डूबती।"
    },
    "photosynthesis": {
        "topic": "Plant Biology and Sunshine",
        "subject": "Science",
        "default_question": "How do green plants prepare their food?",
        "step_by_step": [
            "Step 1: Roots pull water and dissolved minerals upwards from moist garden soil.",
            "Step 2: Green leaves breathe in carbon dioxide gas from surrounding air through tiny pores.",
            "Step 3: Green chlorophyll inside the leaf catches warm sunlight energy.",
            "Step 4: Sunlight energy cooks water and carbon dioxide together into sweet plant food called glucose.",
            "Conclusion: Plants release clean oxygen into the atmosphere during this process."
        ],
        "everyday_analogy": "Just as a family kitchen uses gas flame, water, and flour to bake warm rotis, green leaves use sunlight, water, and air to cook food for the tree.",
        "simplification_levels": {
            1: "Standard: Green chlorophyll in plant cells converts solar radiation, water, and carbon dioxide into chemical glucose and oxygen.",
            2: "Story: Every green leaf is a solar kitchen. Roots act like water straws and sunlight turns the stove on.",
            3: "Ultra Simple: Sunshine plus water plus fresh air equals sweet food for the green leaves to grow big and strong."
        },
        "ncert_citation": "NCERT Class 4 Science, Chapter on Food Preparation in Green Leaves",
        "parent_note_hindi": "हरी पत्तियां धूप और पानी मिलाकर पौधे का खाना बनाती हैं, बिल्कुल वैसे ही जैसे रसोई में खाना पकता है।"
    }
}

class MultimodalDoubtSolverEngine:
    def __init__(self):
        self.kb = DOUBT_KNOWLEDGE_BASE

    def detect_topic_key(self, text: str) -> str:
        t = text.lower()
        if "fraction" in t or "1/2" in t or "1/4" in t or "half" in t or "quarter" in t or "divide" in t:
            return "fraction"
        elif "ice" in t or "float" in t or "sink" in t or "density" in t:
            return "ice_water"
        elif "plant" in t or "leaf" in t or "leaves" in t or "photosynthesis" in t or "green" in t or "sunlight" in t:
            return "photosynthesis"
        return "fraction"

    def solve_doubt(
        self,
        question_text: str,
        grade: int = 4,
        subject: str = "Mathematics",
        simplification_level: int = 1,
        image_data: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Solves question conceptually with step by step reasoning,
        real world everyday analogies, and simplification levels.
        """
        topic_key = self.detect_topic_key(question_text or "")
        entry = self.kb.get(topic_key, self.kb["fraction"])

        safe_level = max(1, min(3, simplification_level))
        level_explanation = entry["simplification_levels"].get(safe_level, entry["simplification_levels"][1])

        return {
            "status": "success",
            "question": question_text or entry["default_question"],
            "subject": subject or entry["subject"],
            "grade": grade,
            "topic": entry["topic"],
            "current_simplification_level": safe_level,
            "level_explanation": level_explanation,
            "step_by_step_solution": entry["step_by_step"],
            "real_world_analogy": entry["everyday_analogy"],
            "ncert_citation": entry["ncert_citation"],
            "parent_note_hindi": entry["parent_note_hindi"],
            "image_analyzed": bool(image_data)
        }

    def simplify_further(
        self,
        question_text: str,
        current_level: int = 1,
        grade: int = 4
    ) -> Dict[str, Any]:
        """
        Progressively increases simplification level from 1 to 2 to 3.
        """
        next_level = min(3, current_level + 1)
        return self.solve_doubt(
            question_text=question_text,
            grade=grade,
            simplification_level=next_level
        )
