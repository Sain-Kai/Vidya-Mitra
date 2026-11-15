# 🏛️ Vidya Mitra — System & Pedagogical Architecture

Vidya Mitra is designed as a distributed, privacy-first, cross-platform educational platform tailored for Indian students (Classes 1 to 8) and their families.

---

## 🏗️ High-Level System Architecture

```mermaid
graph TD
    subgraph Client ["📱 Client Layer (React Native Cross-Platform)"]
        UI_Home["Home Dashboard (Student / Parent Mode)"]
        UI_Cam["Live Vision Camera & Reticle Selector"]
        UI_Tutor["Socratic Chat & In-Lesson Checkpoints"]
        UI_Assess["Adaptive Diagnostic Assessments"]
        UI_Planner["Exam & Revision Timetable Planner"]
        UI_Eval["Question Paper & Answer Sheet Grader"]
    end

    subgraph Gateway ["☕ Microservice Gateway (Spring Boot 3)"]
        Auth["Spring Security & JWT"]
        StudentSvc["Student Cognitive Profiler"]
        SchedSvc["Spaced-Repetition Scheduler"]
        TeacherPatternSvc["Teacher Evaluation Pattern Analyzer"]
        AuditSvc["Parent Audit & Activity Logger"]
    end

    subgraph AIService ["🐍 AI & Multimodal Engine (FastAPI + LangChain)"]
        OCR_Indic["On-Device / Cloud Indic OCR (Devanagari, Bengali, Tamil, etc.)"]
        IndicTrans["IndicTrans2 / NLLB-200 Translation Service"]
        SocraticTutor["Socratic Pedagogy Chain (Phi-3.5 / Nemotron / Gemma)"]
        Simplifier["3-Tier Progressive Simplification Engine"]
        PaperGrader["Multimodal Answer Sheet Grader & Step Deductions"]
        RAG["Hybrid RAG Retriever (Dense + BM25)"]
    end

    subgraph Data ["🍃 Data & Storage Tier"]
        Mongo[("MongoDB: Chat Sessions & Cognitive Profiles")]
        Postgres[("PostgreSQL: Question Bank & Relational Scores")]
        Chroma[("ChromaDB: NCERT Class 1-8 Vector Embeddings")]
        RedisCache[("Redis: Spaced Repetition & Translation Cache")]
    end

    Client -->|REST / WebSocket| Gateway
    Client -->|On-Device Offline Fallback| OCR_Indic
    Gateway -->|Async RPC| AIService
    Gateway -->|CRUD| Mongo
    Gateway -->|Relational Data| Postgres
    AIService -->|Semantic Search| Chroma
    AIService -->|Cache Hits| RedisCache
```

---

## 🧩 Pedagogical Core: Progressive Simplification Cascade

To break the "mug-up" (rote learning) culture and protect slow or shy learners from embarrassment, Vidya Mitra enforces a 3-tier progressive simplification cascade:

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant Tutor as Vidya Mitra AI Tutor
    actor Parent

    Student->>Tutor: "Why do leaves appear green and how do plants make food?"
    Tutor->>Student: Level 1 (Concept): Explains Chlorophyll, sunlight, CO2 and Water.
    Student->>Tutor: "I didn't understand. It's confusing."
    Tutor->>Student: Level 2 (Story Analogy): Compares leaves to a sunlit kitchen and chef with green apron.
    Student->>Tutor: "Still not clear..."
    Tutor->>Student: Level 3 (Concrete Steps): 3 physical real-life actions (sunlight + water + air = fruit).
    Tutor->>Student: 🛑 In-Lesson Checkpoint: "Quick recall! What does a leaf need?"
    Student->>Tutor: Selects correct answer!
    Tutor->>Student: 🎉 "Well done! Let's take the next step together."
    Tutor->>Parent: Generates Audio Progress Note in Mother Tongue.
```

---

## 📄 Question Paper & Answer Sheet Grading Architecture

```mermaid
flowchart TD
    QP["1. School Question Paper (Photo/PDF)"] --> OCR_QP["OCR & Question Parser"]
    AS["2. Student Handwritten Answer Sheet (Photo)"] --> OCR_AS["Handwriting Recognition"]

    OCR_QP --> RubricGen["Marking Scheme & Rubrics Generator"]
    OCR_AS --> StepMatcher["Step-by-Step Step Marking Engine"]

    RubricGen --> StepMatcher
    StepMatcher --> PatternAnalyzer["Teacher Evaluation Pattern Analyzer"]

    PatternAnalyzer --> ScoreOut["Estimated Marks & Percentage"]
    PatternAnalyzer --> Deductions["Where Marks Were Lost (e.g. Omitted Formula, No Units)"]
    PatternAnalyzer --> RemedialTips["Actionable Teacher Expectations Checklist"]
```

---

## 🗄️ Database Schemas

### 1. MongoDB: Student Cognitive Profile
```json
{
  "_id": "673f1a2b89c0",
  "fullName": "Aarav Sharma",
  "grade": 4,
  "motherTongue": "hi",
  "currentStreakDays": 7,
  "cognitiveLevel": 2,
  "identifiedWeaknesses": [
    "Speed & Time Problems",
    "Logical Word Puzzles"
  ],
  "topicMastery": {
    "Numbers & Place Value": 95,
    "Fractions & Decimals": 78,
    "Speed, Distance & Time": 42,
    "Logical Reasoning": 35
  }
}
```

### 2. MongoDB: Exam Schedule & Spaced Repetition
```json
{
  "_id": "sched_9921",
  "studentId": "673f1a2b89c0",
  "examTitle": "Mid-Term Examination",
  "examDate": "2026-11-25",
  "daysRemaining": 10,
  "revisionPlan": [
    {
      "cycleName": "Phase 1: Concept & Story Foundations",
      "startDate": "2026-11-15",
      "endDate": "2026-11-18",
      "dailyTasks": ["NCERT Chapter 3 review", "10-question diagnostic quiz"]
    },
    {
      "cycleName": "Phase 2: Deep Practice & Weak Area Drills",
      "startDate": "2026-11-19",
      "endDate": "2026-11-22",
      "dailyTasks": ["Word problem drills", "Formula practice"]
    },
    {
      "cycleName": "Phase 3: Mock Exam & Teacher Rubrics Polish",
      "startDate": "2026-11-23",
      "endDate": "2026-11-25",
      "dailyTasks": ["Timed full mock test", "Answer sheet evaluation"]
    }
  ]
}
```
