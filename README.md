<<<<<<< HEAD
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
=======
<div align="center">

# 📚 Vidya Mitra
### *विद्या मित्र — Your Child's Knowledge Friend*

**An AI-powered private tutor bridging the English-medium learning gap for rural India**

<p>
  <img src="https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge" alt="status"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="license"/>
  <img src="https://img.shields.io/badge/Platform-Android%20%7C%20iOS-success?style=for-the-badge" alt="platform"/>
</p>

<p>
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="java"/>
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="springboot"/>
  <img src="https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react-native"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb"/>
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="postgres"/>
  <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white" alt="langchain"/>
  <img src="https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white" alt="ollama"/>
  <img src="https://img.shields.io/badge/HuggingFace-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="huggingface"/>
</p>

<p>
  <a href="#-getting-started"><img src="https://img.shields.io/badge/🚀_Get_Started-4CAF50?style=for-the-badge" alt="get-started"/></a>
  <a href="#-features"><img src="https://img.shields.io/badge/✨_Features-2196F3?style=for-the-badge" alt="features"/></a>
  <a href="#-architecture"><img src="https://img.shields.io/badge/🏗️_Architecture-9C27B0?style=for-the-badge" alt="architecture"/></a>
  <a href="#-api-reference"><img src="https://img.shields.io/badge/📡_API_Docs-FF5722?style=for-the-badge" alt="api"/></a>
  <a href="#-contributing"><img src="https://img.shields.io/badge/🤝_Contribute-FFC107?style=for-the-badge" alt="contribute"/></a>
</p>

</div>

---

## 📖 About The Project

Across India, millions of parents who studied in their **native language** are now raising children enrolled in **English-medium schools**. The result is a widening gap — parents can't check homework, can't explain concepts, and can't follow what their own children are learning.

**Vidya Mitra** closes that gap. Point your camera at a textbook line and get an instant translation. Hand the phone to your child and a fine-tuned LLM tutor explains the same concept in simple, age-appropriate language — by voice or text — for students from **Nursery to Class 5**.

> 🎯 **Mission:** No parent should feel locked out of their child's education because of a language barrier.

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 📷 | **Live Camera Translation** | Point at any textbook line — on-device OCR + NLLB-200 translates instantly, overlaid on the camera feed |
| 🗣️ | **Voice Tutor** | Ask questions in Hindi, Tamil, Telugu & more — get spoken answers in simple, child-friendly language |
| 🧠 | **Fine-Tuned LLM** | Phi-3 Mini fine-tuned on NCERT curriculum to explain topics the way a kind teacher would |
| 📚 | **RAG over NCERT** | Every explanation is grounded in actual Class 1–5 textbook content via ChromaDB retrieval |
| 📝 | **Auto-Generated Tests** | LangChain generates quizzes and exercises matched to the student's class and weak areas |
| 📅 | **Smart Scheduling** | Spaced-repetition style test scheduling based on performance history |
| 📊 | **Parent Dashboard** | Weekly progress reports in the parent's own language — no English required |
| 🌐 | **Offline-First** | Cached explanations and on-device fallback model for low-connectivity villages |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   📱  React Native App                   │
│      Camera OCR  ·  Voice UI  ·  Chat  ·  Test Screen     │
└───────────────────────────┬───────────────────────────────┘
                            │ REST / WebSocket
┌───────────────────────────▼───────────────────────────────┐
│                  ☕  Spring Boot Gateway                  │
│        Auth  ·  Student Profiles  ·  Progress Tracker     │
└───────────────────────────┬───────────────────────────────┘
                            │
┌───────────────────────────▼───────────────────────────────┐
│              🦜  LangChain Orchestration Layer             │
│         Agent  ·  RAG Pipeline  ·  Translation Service     │
└───────────────────────────┬───────────────────────────────┘
                            │
┌───────────────────────────▼───────────────────────────────┐
│         🤖  Ollama  ·  Gemma-4  ·  Whisper  ·  NLLB     │
└───────────────────────────┬───────────────────────────────┘
                            │
┌───────────────────────────▼───────────────────────────────┐
│      🍃 MongoDB   ·   🐘 PostgreSQL   ·   🎨 ChromaDB      │
└─────────────────────────────────────────────────────────┘
```

<div align="center">
<a href="https://github.com/Sain-Kai/vidya-mitra/blob/main/docs/architecture.md">
<img src="https://img.shields.io/badge/📐_View_Full_Architecture_Doc-673AB7?style=for-the-badge" alt="arch-doc"/>
</a>
</div>

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="33%">

**Frontend**
- React Native
- Vision Camera (OCR)
- React Navigation
- Redux Toolkit

</td>
<td valign="top" width="33%">

**Backend**
- Spring Boot 3
- Spring Security (JWT)
- Spring Data MongoDB
- Spring Data JPA

</td>
<td valign="top" width="33%">

**AI / ML**
- LangChain
- Ollama (Phi-3 Mini)
- HuggingFace Transformers
- ChromaDB + NLLB-200
- Whisper (STT)

</td>
</tr>
<tr>
<td valign="top" width="33%">

**Databases**
- MongoDB (profiles, chat)
- PostgreSQL (tests, scores)
- ChromaDB (vector store)
- Redis (cache, queue)

</td>
<td valign="top" width="33%">

**Infra**
- Docker + Compose
- GitHub Actions CI/CD
- Firebase Cloud Messaging
- Render / Railway hosting

</td>
<td valign="top" width="33%">

**Languages**
- Java 17
- TypeScript
- Python (FastAPI svc)

</td>
</tr>
</table>

---

## 📂 Project Structure

```
vidya-mitra/
├── 📱 mobile-app/                 # React Native client
│   ├── src/
│   │   ├── screens/
│   │   │   ├── CameraTranslate/
│   │   │   ├── TutorChat/
│   │   │   └── TestScreen/
│   │   ├── components/
│   │   └── services/api.ts
│   └── package.json
│
├── ☕ backend/                    # Spring Boot gateway
│   ├── src/main/java/com/vidyamitra/
│   │   ├── auth/
│   │   ├── student/
│   │   ├── session/
│   │   └── progress/
│   └── pom.xml
│
├── 🐍 ai-service/                 # FastAPI + LangChain
│   ├── app/
│   │   ├── rag/
│   │   ├── translation/
│   │   ├── voice/
│   │   └── agents/tutor_agent.py
│   └── requirements.txt
│
├── 🧠 finetuning/                 # Model training pipeline
│   ├── datasets/ncert_pairs.jsonl
│   └── train_qlora.py
│
├── 🐳 docker-compose.yml
└── 📄 README.md
```

---

## 🚀 Getting Started

### Prerequisites

<p>
  <img src="https://img.shields.io/badge/Node.js-≥18-339933?style=flat-square&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Java-≥17-ED8B00?style=flat-square&logo=openjdk&logoColor=white"/>
  <img src="https://img.shields.io/badge/Python-≥3.10-3776AB?style=flat-square&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-required-2496ED?style=flat-square&logo=docker&logoColor=white"/>
</p>

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Sain-Kai/vidya-mitra.git
cd vidya-mitra
```

### 2️⃣ Spin up the databases

```bash
docker-compose up -d mongodb postgres redis chromadb
```

### 3️⃣ Start the AI service (LangChain + Ollama)

```bash
cd ai-service
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Pull the fine-tuned model
ollama pull phi3:mini
ollama run phi3:mini

uvicorn app.main:app --reload --port 8000
```

### 4️⃣ Start the Spring Boot backend

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

### 5️⃣ Run the mobile app

```bash
cd mobile-app
npm install
npx react-native run-android   # or run-ios
```

<div align="center">
<img src="https://img.shields.io/badge/✅_You're_all_set!-00C853?style=for-the-badge" alt="done"/>
</div>

---

## ⚙️ Environment Variables

Create a `.env` file in `backend/` and `ai-service/`:

```env
# backend/.env
MONGO_URI=mongodb://localhost:27017/vidyamitra
POSTGRES_URL=jdbc:postgresql://localhost:5432/vidyamitra
JWT_SECRET=your_jwt_secret_here
FCM_SERVER_KEY=your_firebase_key
AI_SERVICE_URL=http://localhost:8000

# ai-service/.env
OLLAMA_HOST=http://localhost:11434
CHROMA_DB_PATH=./chroma_store
NLLB_MODEL=facebook/nllb-200-distilled-600M
WHISPER_MODEL=openai/whisper-small
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|--------------|
| `POST` | `/api/auth/register` | Register a parent account |
| `POST` | `/api/auth/login` | Login, returns JWT |
| `POST` | `/api/students` | Create a child profile |
| `POST` | `/api/tutor/ask` | Ask the LLM tutor a question |
| `POST` | `/api/translate/ocr` | Translate camera-detected text |
| `POST` | `/api/voice/stt` | Speech → text |
| `POST` | `/api/voice/tts` | Text → speech |
| `GET`  | `/api/tests/generate/{studentId}` | Generate a scheduled test |
| `GET`  | `/api/progress/{studentId}/weekly` | Get weekly progress report |

<details>
<summary><b>📦 Example: Ask the tutor</b></summary>

```bash
curl -X POST http://localhost:8080/api/tutor/ask \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "64f3a1b2c3d4e5f6a7b8c9d1",
    "subject": "mathematics",
    "topic": "multiplication",
    "question": "3 times 7 kya hota hai?",
    "language": "hi"
  }'
```

**Response**

```json
{
  "answer": "3 times 7 hota hai 21! Socho 3 doston ke paas 7-7 toffees hain...",
  "audioUrl": "https://cdn.vidyamitra.app/tts/msg_4.ogg",
  "ragSources": ["ncert_class3_math_ch4_p15"],
  "latencyMs": 840
}
```

</details>

---

## 🗺️ Roadmap

- [x] Spring Boot gateway + auth
- [x] MongoDB schema (profiles, sessions, messages)
- [x] RAG pipeline over NCERT Class 1–5
- [x] Camera OCR + live translation overlay
- [ ] Phi-3 Mini fine-tuning (QLoRA) — *in progress*
- [ ] Whisper STT fine-tune for Indian accents
- [ ] Offline on-device model (llama.cpp)
- [ ] Multi-child family dashboard
- [ ] Regional language expansion (12 → 22 languages)

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn and build. Any contribution is **greatly appreciated**.

```bash
# 1. Fork the repo
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m "Add some AmazingFeature"

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

<div align="center">
<a href="https://github.com/Sain-Kai/vidya-mitra/issues">
<img src="https://img.shields.io/badge/🐛_Report_Bug-D32F2F?style=for-the-badge" alt="bug"/>
</a>
<a href="https://github.com/Sain-Kai/vidya-mitra/issues">
<img src="https://img.shields.io/badge/💡_Request_Feature-1976D2?style=for-the-badge" alt="feature"/>
</a>
</div>

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👤 Author

<div align="center">

**Sain**
*AI Engineer · Java Backend Developer*

<p>
  <a href="https://github.com/Sain-Kai">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="github"/>
  </a>
  <a href="https://linkedin.com/in/your-profile">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin"/>
  </a>
</p>

---

<sub>Built with ❤️ for every parent who just wants to understand their child's homework.</sub>

</div>
>>>>>>> origin/main
