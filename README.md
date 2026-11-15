<div align="center">

# 📚 Vidya Mitra
### *Your Child's Socratic Learning Friend & Parent Bridge*

**An AI-Powered Multilingual Learning Companion for Indian Students and Their Families**

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
  <img src="https://img.shields.io/badge/ChromaDB-Vector%20RAG-red?style=for-the-badge" alt="chroma"/>
  <img src="https://img.shields.io/badge/IndicTrans2-10%2B%20Languages-yellow?style=for-the-badge" alt="indic"/>
</p>

<p>
  <a href="#-project-status--next-stage"><img src="https://img.shields.io/badge/📌_Project_Status-FF5722?style=for-the-badge" alt="status"/></a>
  <a href="#-key-capabilities"><img src="https://img.shields.io/badge/✨_Features-2196F3?style=for-the-badge" alt="features"/></a>
  <a href="#-repository-structure"><img src="https://img.shields.io/badge/📂_Repository_Structure-4CAF50?style=for-the-badge" alt="structure"/></a>
  <a href="LIBRARIES_INSTALLED.md"><img src="https://img.shields.io/badge/📦_Dependency_Audit-607D8B?style=for-the-badge" alt="libraries"/></a>
</p>

</div>

---

## 📌 Project Status & Next Stage

* **Current Status**: Project structural reorganization completed into modular sub-packages. Core frontend screens implemented covering Live Translation, Socratic Tutoring, Assessments, Doubt Solving, Exam Planning, Paper Evaluation, and Learning Diagnostics. Spring Boot gateway and FastAPI microservices scaffolded with domain models.
* **Decided Next Stage**: **Stage 2 — NCERT Class 1-8 Multilingual Vector Indexing & Offline Indic OCR Engine Integration**.

---

## 📖 The Mission & Indian Context

In the Indian educational landscape, extraordinary diversity in regional languages exists alongside deep literacy divides. Millions of parents who grew up speaking regional mother tongues enroll their children in English-medium schools with aspirations of a brighter future.

However, this creates severe real-world challenges:
1. **The Parent Guidance Gap**: Parents cannot guide their children in their daily studies because of language barriers or illiteracy. They feel locked out of their child's education.
2. **The Tuition & Slow Learner Gap**: In crowded classrooms or private tuitions, students have different learning speeds. Slow learners often fall behind, feeling too shy or fearful of peer bullying to ask teachers to explain a concept repeatedly.
3. **The Mug-Up Strategy**: Students are often forced to memorize without understanding the underlying foundations.
4. **Exam Week Teacher Unavailability**: When exams arrive, teachers are busy with grading and meetings, leaving anxious students stranded without guidance.

**Vidya Mitra** is built to solve these exact challenges. It is a patient, zero-judgment, foundational AI companion that translates textbooks in real time for parents, simplifies explanations progressively for students, and provides structured exam preparation and paper evaluation.

---

## ✨ Key Capabilities

| # | Capability | Description |
|---|---|---|
| 📷 | **1. Live Camera Translation** | Point the camera at any textbook line or paragraph — translates in real-time directly on-device in a persistent lower bottom-sheet in 10+ regional Indian languages. |
| 📊 | **2. Diagnostic Performance Analysis** | Multi-format assessments that diagnose weak sub-topics and adapt subsequent lessons. |
| 📅 | **3. Exam & Spaced Revision Planner** | Input upcoming exam dates to automatically generate a 3-phase revision cycle. |
| 💡 | **4. Multimodal Doubt Solver** | Photograph a textbook problem, upload a PDF, or type a doubt for deep step-by-step reasoning and everyday real-world examples. |
| 🌱 | **5. Anti-Rote Progressive Simplification** | Explains according to the student's cognitive level. If the student does not understand, one tap simplifies it further: **Level 1 to Level 2 to Level 3**. |
| 🛑 | **6. In-Lesson Interactive Recaps** | Pauses long lessons at cognitive stops with micro-questions and recall checks to guarantee mastery before advancing. |
| 🧠 | **7. Socratic Reasoning & Inquiry** | Guides students through step-by-step thinking rather than handing out raw answers to homework. |
| 📝 | **8. Exam-Ready Test Preparation** | Generates tailored mock examinations aligned with the student's exact class syllabus. |
| ✍️ | **9. Question Paper & Answer Sheet Grader** | Upload school question papers and student handwritten answer sheets; the vision engine grades step-by-step and estimates scores. |
| 👨‍🏫 | **10. Teacher Evaluation Pattern Insights** | Identifies why marks were deducted and aligns students with teacher marking criteria. |

---

## 📂 Repository Structure

```
Vidya-Mitra/
├── 📱 mobile-app/
│   ├── android/
│   ├── ios/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── navigation/
│   │   └── screens/
│   │       ├── SplashScreen.js
│   │       ├── HomeScreen.js
│   │       ├── LiveTranslateScreen.js
│   │       ├── TutorChatScreen.js
│   │       ├── AssessmentScreen.js
│   │       ├── DoubtSolverScreen.js
│   │       ├── ExamPlannerScreen.js
│   │       ├── PaperEvaluatorScreen.js
│   │       └── PerformanceScreen.js
│   ├── package.json
│   └── App.js
│
├── ☕ backend/
│   ├── src/main/java/com/vidyamitra/
│   │   ├── controller/
│   │   ├── model/
│   │   └── service/
│   ├── src/main/resources/
│   │   └── application.yml
│   ├── pom.xml
│   └── Dockerfile
│
├── 🐍 ai-service/
│   ├── app/
│   │   ├── services/
│   │   │   ├── translation_engine.py
│   │   │   ├── socratic_tutor.py
│   │   │   └── exam_evaluator.py
│   │   └── main.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── 🧠 ml-training/
│   ├── configs/
│   ├── dataset_generator/
│   └── kaggle_notebooks/
│
├── 📚 datasets/
│   └── ncert_curricula/
│
├── 📖 docs/
│   ├── ARCHITECTURE.md
│   └── assets/screenshots/
│
├── 📦 LIBRARIES_INSTALLED.md
├── 🐳 docker-compose.yml
├── 📄 package.json
└── 📄 LICENSE
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone git@github.com:Sain-Kai/Vidya-Mitra.git
cd Vidya-Mitra
```

### 2️⃣ Start Infrastructure with Docker Compose
```bash
docker-compose up -d
```

### 3️⃣ Run the AI Microservice FastAPI
```bash
cd ai-service
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 4️⃣ Run the Backend Gateway Spring Boot
```bash
cd backend
./mvnw spring-boot:run
```

### 5️⃣ Run the Mobile Application React Native
```bash
cd mobile-app
npm install

# For Android:
npm run android

# For iOS:
npm run ios
```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

<div align="center">
<sub>Built with ❤️ for every student striving for understanding and every parent supporting their child's dreams.</sub>
</div>
