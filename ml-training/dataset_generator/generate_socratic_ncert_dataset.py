#!/usr/bin/env python3
"""
Synthetic Dataset Generator for Vidya Mitra LLM Fine-Tuning.
Generates instruction-tuning JSONL pairs covering:
1. Socratic Topic Explanations (Classes 1 to 8).
2. Progressive Simplification (Level 1 Standard -> Level 2 Story Analogy -> Level 3 Concrete Steps).
3. Question Paper Evaluation & Teacher Rubric Feedback.
"""
import json
import os

TOPICS = [
    {
        "subject": "Mathematics",
        "grade": 3,
        "concept": "Multiplication as Repeated Addition",
        "question": "What does 4 × 3 actually mean?",
        "level1": "Multiplication is repeated addition. 4 × 3 means adding 4 groups of 3 items (3 + 3 + 3 + 3 = 12) or 3 groups of 4.",
        "level2": "Imagine 4 friends come to your house for birthday cake. You give each friend 3 toffees. Count them: 3 for friend 1, 3 for friend 2, 3 for friend 3, and 3 for friend 4. That is 12 toffees in total!",
        "level3": "Put 3 pebbles in a box. Make 4 such boxes. When you count all the pebbles together, there are 12! That is 4 times 3.",
    },
    {
        "subject": "EVS / Science",
        "grade": 4,
        "concept": "Why Leaves are Green & Photosynthesis",
        "question": "Why are leaves green and how do plants prepare food?",
        "level1": "Leaves contain a green pigment called chlorophyll. Chlorophyll captures sunlight to convert water and carbon dioxide into glucose and oxygen through photosynthesis.",
        "level2": "Leaves are like the solar kitchen of the plant! Chlorophyll is the green apron the chef wears to catch sunlight and cook tasty sap.",
        "level3": "Plants need 3 things to eat: sunlight from the sky, water from the roots, and air. The green leaf mixes them together to make sweet food for the plant to grow tall.",
    },
    {
        "subject": "Mathematics",
        "grade": 5,
        "concept": "Fractions - What is 1/2 and 1/4?",
        "question": "Why is 1/2 bigger than 1/4 even though 4 is bigger than 2?",
        "level1": "In a fraction, the denominator represents how many equal parts the whole is divided into. Dividing by 4 produces smaller parts than dividing by 2.",
        "level2": "Imagine a round roti. If only you and your sister share it, you get 1/2 (a big half!). But if 4 cousins share the same roti, everyone gets a tiny piece (1/4). More people sharing means smaller bites!",
        "level3": "Fold a paper into 2 pieces: look how big each piece is. Now fold another paper into 4 pieces: look how small each piece is. 1 out of 2 is much bigger than 1 out of 4.",
    },
]

def generate_dataset(output_path="ncert_socratic_train.jsonl"):
    records = []
    for item in TOPICS:
        # Prompt for Level 1
        records.append({
            "system": "You are Vidya Mitra, a kind and patient AI tutor for Indian students in Classes 1 to 8. Never encourage rote learning; always explain concepts with clear foundational examples.",
            "conversations": [
                {"role": "user", "content": f"Class {item['grade']} {item['subject']}: {item['question']}"},
                {"role": "assistant", "content": f"{item['level1']}\n\n💡 Would you like an everyday story to understand this even better?"}
            ]
        })

        # Prompt for Level 2 (when student asks for simpler)
        records.append({
            "system": "You are Vidya Mitra, a kind AI tutor. The student found the concept difficult. Explain with an engaging everyday village/home story analogy.",
            "conversations": [
                {"role": "user", "content": f"I didn't understand '{item['concept']}'. Can you explain it in an easier way?"},
                {"role": "assistant", "content": f"Don't worry at all! Let's understand it with a fun story:\n\n{item['level2']}\n\nDoes this make more sense now?"}
            ]
        })

        # Prompt for Level 3 (micro-steps)
        records.append({
            "system": "You are Vidya Mitra. The student is a slow learner and needs ultra-concrete, physical micro-steps.",
            "conversations": [
                {"role": "user", "content": f"It is still confusing. Make it super simple!"},
                {"role": "assistant", "content": f"You are doing great just by asking again! Here are 3 simple steps to remember:\n\n{item['level3']}\n\nTry doing this with your hands or drawing it!"}
            ]
        })

    with open(output_path, "w", encoding="utf-8") as f:
        for r in records:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

    print(f"✅ Generated {len(records)} Socratic training records to {output_path}")

if __name__ == "__main__":
    generate_dataset()
