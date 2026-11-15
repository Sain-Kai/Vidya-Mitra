<div align="center">

# 📚 Vidya Mitra (विद्या मित्र)
### *Your Child's Socratic Learning Friend & Parent Bridge*

**An AI-Powered Multilingual Learning Companion for Indian Students (Classes 1 to 8) and Their Families**

<p>
  <img src="https://img.shields.io/badge/Status-In%20Active%20Build-success?style=for-the-badge" alt="status"/>
  <img src="https://img.shields.io/badge/Target-Classes%201%20to%208-blue?style=for-the-badge" alt="target"/>
  <img src="https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-orange?style=for-the-badge" alt="platform"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="license"/>
</p>

<p>
  <img src="https://img.shields.io/badge/React%20Native-0.86-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react-native"/>
  <img src="https://img.shields.io/badge/Spring%20Boot-3.3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="springboot"/>
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="fastapi"/>
  <img src="https://img.shields.io/badge/Phi--3.5%20%7C%20Gemma%20%7C%20Nemotron-Kaggle%20Fine--Tuning-blueviolet?style=for-the-badge&logo=kaggle&logoColor=white" alt="kaggle"/>
  <img src="https://img.shields.io/badge/ChromaDB-Vector%20RAG-red?style=for-the-badge" alt="chroma"/>
  <img src="https://img.shields.io/badge/IndicTrans2-10%2B%20Languages-yellow?style=for-the-badge" alt="indic"/>
</p>

<p>
  <a href="#-project-status--next-stage"><img src="https://img.shields.io/badge/📌_Project_Status-FF5722?style=for-the-badge" alt="status"/></a>
  <a href="#-key-capabilities"><img src="https://img.shields.io/badge/✨_Features-2196F3?style=for-the-badge" alt="features"/></a>
  <a href="#-repository-structure"><img src="https://img.shields.io/badge/📂_Repository_Structure-4CAF50?style=for-the-badge" alt="structure"/></a>
  <a href="docs/KAGGLE_FINETUNING_GUIDE.md"><img src="https://img.shields.io/badge/🧠_Kaggle_Training_Guide-FF9800?style=for-the-badge" alt="kaggle-guide"/></a>
  <a href="LIBRARIES_INSTALLED.md"><img src="https://img.shields.io/badge/📦_Dependency_Audit-607D8B?style=for-the-badge" alt="libraries"/></a>
</p>

</div>

---

## 📌 Project Status & Next Stage

* **Current Status**: Multi-format diagnostic testing interface (MCQ, Short, Long, Logical) with weakness analysis active.
* **Decided Next Stage**: **Build multimodal doubt solver and study material explainer screen**.

---

## 📖 The Mission & Indian Context

In the Indian educational landscape, extraordinary diversity in regional languages exists alongside deep literacy divides. Millions of parents who grew up speaking regional mother tongues (Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, etc.) enroll their children in English-medium schools with aspirations of a brighter future.

However, this creates severe real-world challenges:
1. **The Parent Guidance Gap**: Parents cannot guide their children in their daily studies because of language barriers or illiteracy. They feel locked out of their child's education.
2. **The Tuition & Slow Learner Gap**: In crowded classrooms or private tuitions, students have different learning speeds. Slow learners often fall behind, feeling too shy or fearful of peer bullying to ask teachers to explain a concept repeatedly.
3. **The "Mug-Up" (Rote Learning) Strategy**: Students are often forced to memorize without understanding the underlying foundations.
4. **Exam Week Teacher Unavailability**: When exams arrive, teachers are busy with grading and meetings, leaving anxious students stranded without guidance.

**Vidya Mitra (विद्या मित्र)** is built to solve these exact challenges. It is a patient, zero-judgment, foundational AI companion that translates textbooks in real time for parents, simplifies explanations progressively for students, and provides structured exam preparation and paper evaluation.

---

## ✨ Key Capabilities

| # | Capability | Description |
|---|---|---|
| 📷 | **1. Live Camera Translation** | Point the camera at any textbook line or paragraph — translates in real-time directly on-device in a persistent lower bottom-sheet in 10+ regional Indian languages. |
| 📊 | **2. Diagnostic Performance Analysis** | Multi-format assessments (MCQ, Short Answer, Long Answer, Logical Reasoning) that diagnose weak sub-topics and adapt subsequent lessons. |
| 📅 | **3. Exam & Spaced Revision Planner** | Input upcoming exam dates to automatically generate a 3-phase revision cycle (Foundations $\to$ Drills $\to$ Mock Tests). |
| 💡 | **4. Multimodal Doubt Solver** | Photograph a textbook problem, upload a PDF, or type a doubt for deep step-by-step reasoning and everyday real-world examples. |
| 🌱 | **5. Anti-Rote Progressive Simplification** | Explains according to the student's cognitive level. If the student does not understand, one tap simplifies it further: **Level 1 (Concept) $\to$ Level 2 (Story/Analogy) $\to$ Level 3 (Concrete Steps)**. |
| 🛑 | **6. In-Lesson Interactive Recaps** | Pauses long lessons at cognitive stops with micro-questions and recall checks to guarantee mastery before advancing. |
| 🧠 | **7. Socratic Reasoning & Inquiry** | Guides students through step-by-step thinking rather than handing out raw answers to homework. |
| 📝 | **8. Exam-Ready Test Preparation** | Generates tailored mock examinations aligned with the student's exact class syllabus (Classes 1 to 8). |
| ✍️ | **9. Question Paper & Answer Sheet Grader** | Upload school question papers and student handwritten answer sheets; the vision engine grades step-by-step and estimates scores. |
| 👨‍🏫 | **10. Teacher Evaluation Pattern Insights** | Identifies why marks were deducted (e.g., omitted formulas, missing units, missing arrows in diagrams) and aligns students with teacher marking criteria. |

---

## 📂 Repository Structure

```
Vidya-Mitra/
├── 📱 mobile-app/               # React Native cross-platform mobile client
│   ├── android/                 # Android native project & gradle wrapper
│   ├── ios/                     # iOS native project & Podfile
│   ├── src/
│   │   ├── components/          # Reusable UI components (GradientCard, SubjectGrid, etc.)
│   │   ├── constants/           # Color palettes, Indic language codes
│   │   ├── navigation/          # React Navigation RootNavigator (all screens)
│   │   └── screens/             # 9 core screens:
│   │       ├── SplashScreen.js        # Animated welcome screen
│   │       ├── HomeScreen.js          # Student/Parent dual-mode home
│   │       ├── LiveTranslateScreen.js # Camera OCR + lower translation sheet
│   │       ├── TutorChatScreen.js     # Socratic chat + progressive simplification
│   │       ├── AssessmentScreen.js    # MCQ, Long, Short & Logical testing
│   │       ├── DoubtSolverScreen.js   # Study material & photo doubt explainer
│   │       ├── ExamPlannerScreen.js   # Spaced repetition revision calendar
│   │       ├── PaperEvaluatorScreen.js# Question paper & answer sheet grader
│   │       └── PerformanceScreen.js   # Weakness analysis & parent audio report
│   ├── package.json
│   └── App.js
│
├── ☕ backend/                  # Spring Boot 3 Gateway & Cognitive Profiler
│   ├── src/main/java/com/vidyamitra/
│   │   ├── controller/          # REST endpoints (students, evaluation, schedules)
│   │   ├── model/               # StudentProfile, ExamSchedule, PaperEvaluationRecord
│   │   └── service/             # SpacedRepetitionScheduler, TeacherGradingAnalyzer
│   ├── src/main/resources/      # application.yml
│   ├── pom.xml                  # Maven dependencies (Java 17, Spring Boot 3.3)
│   └── Dockerfile
│
├── 🐍 ai-service/               # FastAPI + LangChain AI & Vision Engine
│   ├── app/
│   │   ├── services/
│   │   │   ├── translation_engine.py  # IndicTrans2 / NLLB multi-Indic translation
│   │   │   ├── socratic_tutor.py      # Progressive simplification tutor
│   │   │   └── exam_evaluator.py      # Multimodal question paper & answer grader
│   │   └── main.py              # FastAPI endpoints
│   ├── requirements.txt
│   └── Dockerfile
│
├── 🧠 ml-training/              # Kaggle GPU Fine-Tuning Pipeline
│   ├── configs/                 # QLoRA configs (Phi-3.5, Nemotron-4B, Gemma-2)
│   ├── dataset_generator/       # NCERT Socratic training data generator
│   └── kaggle_notebooks/        # Turnkey Kaggle Python training scripts
│
├── 📚 datasets/                 # NCERT Multilingual Curricula (Classes 1 to 8)
│   └── ncert_curricula/         # Textbooks in English, Bengali, Hindi, Tamil, Telugu
│
├── 📖 docs/                     # Specifications & Architecture
│   ├── ARCHITECTURE.md          # Complete system & pedagogical architecture
│   ├── KAGGLE_FINETUNING_GUIDE.md # Step-by-step Kaggle GPU fine-tuning guide
│   └── assets/screenshots/      # App emulator screenshots
│
├── 📦 LIBRARIES_INSTALLED.md    # Dependency and package audit log for cleanup
├── 🐳 docker-compose.yml        # Orchestration (MongoDB, Postgres, Redis, ChromaDB, AI, Backend)
├── 📄 package.json              # Monorepo command runner
└── 📄 LICENSE                   # MIT License
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Sain-Kai/Vidya-Mitra.git
cd Vidya-Mitra
```

### 2️⃣ Start Infrastructure with Docker Compose
```bash
docker-compose up -d
```

### 3️⃣ Run the AI Microservice (FastAPI)
```bash
cd ai-service
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 4️⃣ Run the Backend Gateway (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```

### 5️⃣ Run the Mobile Application (React Native)
```bash
cd mobile-app
npm install

# For Android:
npm run android

# For iOS:
npm run ios
```

---

## 🧠 Fine-Tuning LLMs on Kaggle Free Tier

Vidya Mitra provides turnkey QLoRA pipelines for fine-tuning compact, high-reasoning models on Kaggle's free GPU tier (T4 or P100):
- **Microsoft Phi-3.5-mini-instruct (3.8B)**
- **NVIDIA Nemotron-Mini-4B-Instruct**
- **Google Gemma-2-2B / 9B**

👉 **[Kaggle Fine-Tuning Guide (docs/KAGGLE_FINETUNING_GUIDE.md)](docs/KAGGLE_FINETUNING_GUIDE.md)**

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

<div align="center">
<sub>Built with ❤️ for every student striving for understanding and every parent supporting their child's dreams.</sub>
</div>
