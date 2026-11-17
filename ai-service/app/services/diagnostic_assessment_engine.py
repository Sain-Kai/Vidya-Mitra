"""
Diagnostic Assessment Engine for Vidya Mitra.
Provides multi format question sets including MCQ, Short Answer,
Long Answer, and Logical questions for NCERT Classes 1 to 8.
Evaluates submissions to pinpoint weak topic areas and measure cognitive mastery.
"""
from typing import Dict, Any, List, Optional

CURRICULUM_ASSESSMENT_BANK = {
    "Mathematics": {
        "Class 4": [
            {
                "id": "math_c4_01",
                "type": "MCQ",
                "topic": "Time and Clocks",
                "skill": "Application",
                "question": "If a school bus leaves the terminal at 7:15 AM and arrives at school at 8:05 AM, how many minutes did the journey take?",
                "options": ["40 minutes", "50 minutes", "55 minutes", "60 minutes"],
                "correct_option_index": 1,
                "explanation": "From 7:15 AM to 8:00 AM is 45 minutes, plus 5 more minutes gives 50 minutes.",
                "points": 1.0
            },
            {
                "id": "math_c4_02",
                "type": "LOGICAL",
                "topic": "Word Problems and Logical Reasoning",
                "skill": "Logical Thinking",
                "question": "A fruit seller packed 6 baskets with 9 mangoes in each basket. Later, 14 mangoes were sold. How many mangoes remain?",
                "options": ["38 mangoes", "40 mangoes", "44 mangoes", "54 mangoes"],
                "correct_option_index": 1,
                "explanation": "Total mangoes equal 6 multiplied by 9 which is 54. Remaining equals 54 minus 14 which is 40 mangoes.",
                "points": 2.0
            },
            {
                "id": "math_c4_03",
                "type": "SHORT_ANSWER",
                "topic": "Fractions and Parts",
                "skill": "Conceptual Foundation",
                "question": "If an apple is divided equally among 4 friends, what fraction does each friend get?",
                "expected_keywords": ["one fourth", "one fourths", "1/4", "quarter", "fourth"],
                "explanation": "Dividing one whole item into 4 equal portions gives one fourth to each person.",
                "points": 1.0
            },
            {
                "id": "math_c4_04",
                "type": "LONG_ANSWER",
                "topic": "Perimeter and Area",
                "skill": "Application",
                "question": "Describe how to find the boundary length of a rectangular playground of length 20 meters and breadth 10 meters.",
                "expected_keywords": ["add", "sides", "length", "breadth", "60", "meters", "perimeter"],
                "explanation": "Add all four sides: length plus breadth plus length plus breadth, which equals 20 + 10 + 20 + 10 = 60 meters.",
                "points": 3.0
            }
        ],
        "Class 5": [
            {
                "id": "math_c5_01",
                "type": "MCQ",
                "topic": "Fractions and Decimals",
                "skill": "Application",
                "question": "Which decimal is equivalent to three fourths?",
                "options": ["0.25", "0.50", "0.75", "0.80"],
                "correct_option_index": 2,
                "explanation": "Three fourths equals 3 divided by 4, which is 0.75.",
                "points": 1.0
            },
            {
                "id": "math_c5_02",
                "type": "LOGICAL",
                "topic": "Speed Distance and Time",
                "skill": "Logical Thinking",
                "question": "A cyclist travels 30 kilometers in 2 hours. At the same steady pace, how far will the cyclist go in 5 hours?",
                "options": ["60 km", "75 km", "90 km", "100 km"],
                "correct_option_index": 1,
                "explanation": "Speed is 30 divided by 2 which is 15 km per hour. In 5 hours the distance is 15 multiplied by 5 which is 75 km.",
                "points": 2.0
            }
        ]
    },
    "Science": {
        "Class 4": [
            {
                "id": "sci_c4_01",
                "type": "MCQ",
                "topic": "Plant Biology",
                "skill": "Conceptual Foundation",
                "question": "Which part of the plant absorbs water and minerals from the soil?",
                "options": ["Leaves", "Roots", "Flowers", "Stem"],
                "correct_option_index": 1,
                "explanation": "Roots grow underground to anchor the plant and absorb moisture and nutrients.",
                "points": 1.0
            },
            {
                "id": "sci_c4_02",
                "type": "SHORT_ANSWER",
                "topic": "Plant Biology",
                "skill": "Conceptual Foundation",
                "question": "Name the green pigment in leaves that traps sunlight for making food.",
                "expected_keywords": ["chlorophyll", "green pigment"],
                "explanation": "Chlorophyll is the green pigment in leaves essential for capturing light energy.",
                "points": 1.0
            },
            {
                "id": "sci_c4_03",
                "type": "LONG_ANSWER",
                "topic": "Water Cycle and Environment",
                "skill": "Logical Thinking",
                "question": "Explain the stages of the water cycle starting from puddles on a sunny day.",
                "expected_keywords": ["evaporation", "steam", "vapour", "clouds", "condensation", "rain", "precipitation"],
                "explanation": "Water warms up and evaporates into vapour, cools high in the air to form clouds, and falls as rain.",
                "points": 3.0
            }
        ]
    }
}

class DiagnosticAssessmentEngine:
    def __init__(self):
        self.bank = CURRICULUM_ASSESSMENT_BANK

    def generate_assessment(self, subject: str = "Mathematics", grade_level: str = "Class 4") -> Dict[str, Any]:
        """
        Retrieves a multi format diagnostic question set for the student's grade and subject.
        """
        subject_data = self.bank.get(subject, self.bank["Mathematics"])
        questions = subject_data.get(grade_level, subject_data.get("Class 4", []))

        total_points = sum(q.get("points", 1.0) for q in questions)
        question_types = list(set(q.get("type") for q in questions))

        return {
            "status": "success",
            "subject": subject,
            "grade_level": grade_level,
            "question_count": len(questions),
            "total_points": total_points,
            "question_formats": question_types,
            "questions": questions
        }

    def evaluate_assessment(
        self,
        subject: str,
        grade_level: str,
        student_answers: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Grades multi format responses and pinpoints specific topic weaknesses.
        """
        assessment = self.generate_assessment(subject, grade_level)
        questions = assessment["questions"]

        total_possible = 0.0
        total_earned = 0.0
        topic_scores: Dict[str, Dict[str, float]] = {}
        skill_scores: Dict[str, Dict[str, float]] = {}
        detailed_evaluations: List[Dict[str, Any]] = []

        for q in questions:
            qid = q["id"]
            pts = q.get("points", 1.0)
            topic = q["topic"]
            skill = q["skill"]
            q_type = q["type"]

            total_possible += pts

            if topic not in topic_scores:
                topic_scores[topic] = {"earned": 0.0, "possible": 0.0}
            topic_scores[topic]["possible"] += pts

            if skill not in skill_scores:
                skill_scores[skill] = {"earned": 0.0, "possible": 0.0}
            skill_scores[skill]["possible"] += pts

            student_ans = student_answers.get(qid)
            is_correct = False
            earned_pts = 0.0
            feedback = ""

            if q_type in ["MCQ", "LOGICAL"]:
                correct_idx = q["correct_option_index"]
                if student_ans is not None and int(student_ans) == correct_idx:
                    is_correct = True
                    earned_pts = pts
                    feedback = "Correct! Solid understanding of the concept."
                else:
                    feedback = f"Incorrect. Correct answer: {q['options'][correct_idx]}. {q['explanation']}"
            elif q_type == "SHORT_ANSWER":
                ans_str = str(student_ans or "").lower().strip()
                keywords = q.get("expected_keywords", [])
                match_count = sum(1 for kw in keywords if kw.lower() in ans_str)
                if match_count > 0:
                    is_correct = True
                    earned_pts = pts
                    feedback = "Well done! Key terms correctly identified."
                else:
                    feedback = f"Needs improvement. Key concept: {q['explanation']}"
            elif q_type == "LONG_ANSWER":
                ans_str = str(student_ans or "").lower().strip()
                keywords = q.get("expected_keywords", [])
                matched = sum(1 for kw in keywords if kw.lower() in ans_str)
                word_count = len(ans_str.split())

                if matched >= 3 or (matched >= 2 and word_count >= 15):
                    is_correct = True
                    earned_pts = pts
                    feedback = "Excellent step by step explanation with good vocabulary."
                elif matched >= 1 or word_count >= 8:
                    earned_pts = round(pts * 0.5, 1)
                    feedback = "Partial understanding. Make sure to detail all steps and units clearly."
                else:
                    earned_pts = 0.0
                    feedback = f"Incomplete. Suggested model answer: {q['explanation']}"

            total_earned += earned_pts
            topic_scores[topic]["earned"] += earned_pts
            skill_scores[skill]["earned"] += earned_pts

            detailed_evaluations.append({
                "question_id": qid,
                "type": q_type,
                "topic": topic,
                "skill": skill,
                "earned_points": earned_pts,
                "max_points": pts,
                "is_correct": is_correct,
                "feedback": feedback
            })

        overall_percentage = round((total_earned / total_possible * 100), 1) if total_possible > 0 else 0.0

        topic_mastery: List[Dict[str, Any]] = []
        weak_topics: List[str] = []

        for t_name, scores in topic_scores.items():
            pct = round((scores["earned"] / scores["possible"] * 100), 1) if scores["possible"] > 0 else 0.0
            if pct >= 80.0:
                status = "Mastered"
            elif pct >= 60.0:
                status = "Good"
            elif pct >= 40.0:
                status = "Needs Support"
            else:
                status = "Weak Area"
                weak_topics.append(t_name)

            topic_mastery.append({
                "topic": t_name,
                "mastery_percentage": pct,
                "status": status,
                "earned": scores["earned"],
                "possible": scores["possible"]
            })

        skills_breakdown: List[Dict[str, Any]] = []
        for s_name, scores in skill_scores.items():
            pct = round((scores["earned"] / scores["possible"] * 100), 1) if scores["possible"] > 0 else 0.0
            skills_breakdown.append({
                "skill": s_name,
                "mastery_percentage": pct
            })

        remedial_lessons = self.generate_adaptive_remediation(weak_topics, grade_level)
        parent_report = self.generate_parent_summary_report(
            overall_percentage=overall_percentage,
            weak_topics=weak_topics,
            subject=subject,
            grade_level=grade_level
        )

        return {
            "overall_score": total_earned,
            "max_score": total_possible,
            "mastery_percentage": overall_percentage,
            "topic_mastery": topic_mastery,
            "weak_topics": weak_topics,
            "skills_breakdown": skills_breakdown,
            "detailed_evaluations": detailed_evaluations,
            "adaptive_next_lessons": remedial_lessons,
            "parent_summary_report": parent_report
        }

    def generate_adaptive_remediation(
        self,
        weak_topics: List[str],
        grade_level: str = "Class 4"
    ) -> List[Dict[str, Any]]:
        """
        Builds tailored next lessons with progressive simplification levels for weak topics.
        """
        lessons: List[Dict[str, Any]] = []

        topic_remediation_catalog = {
            "Word Problems and Logical Reasoning": {
                "title": "Fun with Story Problems",
                "difficulty_level": "Foundational Level 1",
                "foundation_analogy": "Instead of abstract numbers, picture physical cricket balls or mangoes in baskets.",
                "simplified_steps": [
                    "Step 1: Read the story and circle what items we have.",
                    "Step 2: Decide whether we are putting groups together or taking things away.",
                    "Step 3: Solve one step at a time before moving to the next question."
                ],
                "practice_challenge": "You have 4 boxes with 5 crayons each. You gift 3 crayons to your friend. How many crayons are left?",
                "socratic_hint": "First multiply 4 boxes by 5 crayons, then subtract the 3 gifted crayons."
            },
            "Time and Clocks": {
                "title": "Mastering the Clock and Minutes",
                "difficulty_level": "Foundational Level 1",
                "foundation_analogy": "Think of the clock face as a round running track where each big number equals 5 steps of the minute hand.",
                "simplified_steps": [
                    "Step 1: Count hours first by checking the short hand.",
                    "Step 2: Multiply the number pointed to by the long hand by 5.",
                    "Step 3: Add extra elapsed minutes."
                ],
                "practice_challenge": "If cartoon time begins at 5:10 PM and runs for 40 minutes, what time does the cartoon end?",
                "socratic_hint": "Add 40 minutes to 10 minutes."
            },
            "Fractions and Parts": {
                "title": "Equal Slices and Sharing",
                "difficulty_level": "Foundational Level 1",
                "foundation_analogy": "Imagine a fresh round paratha or chapati sliced cleanly into equal parts among friends.",
                "simplified_steps": [
                    "Step 1: The bottom number shows how many total slices exist.",
                    "Step 2: The top number shows how many slices you have on your plate.",
                    "Step 3: If all slices are there, it makes one whole paratha."
                ],
                "practice_challenge": "If a pizza is cut into 8 equal slices and you eat 3 slices, what fraction did you eat?",
                "socratic_hint": "Place your 3 slices on top and the total 8 slices at the bottom."
            },
            "Plant Biology": {
                "title": "How Green Leaves Cook Food",
                "difficulty_level": "Foundational Level 1",
                "foundation_analogy": "Green leaves are tiny nature kitchens using sunlight and water to make tasty food for the tree.",
                "simplified_steps": [
                    "Step 1: Roots pull water up from the soil like a straw.",
                    "Step 2: Green chlorophyll in leaves catches warm sunshine.",
                    "Step 3: Leaves mix sunlight and water to prepare sweet energy for the plant."
                ],
                "practice_challenge": "What do roots act like when drinking water from moist soil?",
                "socratic_hint": "Think of sipping juice through a straw."
            }
        }

        for topic in weak_topics:
            if topic in topic_remediation_catalog:
                entry = topic_remediation_catalog[topic]
                lessons.append({
                    "topic": topic,
                    "lesson_title": entry["title"],
                    "difficulty": entry["difficulty_level"],
                    "foundation_analogy": entry["foundation_analogy"],
                    "simplified_steps": entry["simplified_steps"],
                    "practice_challenge": entry["practice_challenge"],
                    "socratic_hint": entry["socratic_hint"]
                })
            else:
                lessons.append({
                    "topic": topic,
                    "lesson_title": f"Foundation Review: {topic}",
                    "difficulty": "Foundational Level 1",
                    "foundation_analogy": f"Breaking down {topic} with everyday examples and step by step guidance.",
                    "simplified_steps": [
                        "Step 1: Understand the core term with real life items.",
                        "Step 2: Work through a solved example together.",
                        "Step 3: Try one short practice question."
                    ],
                    "practice_challenge": f"Can you explain the main idea of {topic} in your own words?",
                    "socratic_hint": "Think about where you see this topic in your home or school routine."
                })

        return lessons

    def generate_parent_summary_report(
        self,
        overall_percentage: float,
        weak_topics: List[str],
        subject: str,
        grade_level: str
    ) -> Dict[str, Any]:
        """
        Builds a multilingual summary for parents explaining child performance and action plans.
        """
        weak_text_en = ", ".join(weak_topics) if weak_topics else "All topics well understood"

        hindi_weak = "शब्द समस्याओं और तार्किक प्रश्नों" if "Word Problems and Logical Reasoning" in weak_topics else "कुछ कठिन सवालों"
        hindi_desc = (
            f"आपके बच्चे ने {subject} मूल्यांकन में {overall_percentage}% अंक प्राप्त किए हैं। "
            f"बुनियादी अवधारणाएं स्पष्ट हैं, लेकिन {hindi_weak} में थोड़ी सहायता की आवश्यकता है। "
            f"विद्या मित्र ने इसके लिए आसान उदाहरणों और कहानियों वाले अभ्यास पाठ तैयार किए हैं।"
        )

        bengali_desc = (
            f"আপনার সন্তান {subject} মূল্যায়নে {overall_percentage}% নম্বর পেয়েছে। "
            f"মৌলিক বিষয়গুলি ভালো বুঝেছে, তবে দুর্বল ক্ষেত্রগুলির জন্য বিদ্যা মিত্র সহজ উদাহরণ সহ নতুন অনুশীলন পাঠ প্রস্তুত করেছে।"
        )

        return {
            "grade_level": grade_level,
            "subject": subject,
            "overall_percentage": overall_percentage,
            "identified_weak_areas": weak_topics,
            "summaries": {
                "en": f"Student scored {overall_percentage}% in {subject}. Strengths observed in core fundamentals. Dedicated remediation prepared for {weak_text_en}.",
                "hi": hindi_desc,
                "bn": bengali_desc
            },
            "recommended_parent_action": "Encourage the child to complete the 10 minute interactive foundation lesson without worrying about memorization."
        }
