# 📦 Vidya Mitra — Installed Libraries & Dependency Audit Log

> **Purpose**: This file logs every third-party package, runtime library, and system dependency installed for this project so they can be completely removed upon project completion.

---

## 📋 Audit Inventory

### 1. Global System-Level Packages
*No global system or apt packages were installed during setup.*
- Status: **None**

### 2. Python Packages pip
*All Python dependencies are containerized or specified in `ai-service/requirements.txt`.*
- `fastapi==0.115.0`
- `uvicorn==0.30.6`
- `pydantic==2.9.2`
- `langchain==0.3.0`
- `langchain-community==0.3.0`
- `chromadb==0.5.5`
- `sentence-transformers==3.1.1`
- `pillow==10.4.0`
- `python-multipart==0.0.9`
- `requests==2.32.3`
- `numpy==1.26.4`
- Status on Host Machine: **Not installed globally**.

### 3. Node.js Packages npm
*All Node dependencies are isolated inside `mobile-app/package.json`.*
- `@react-native-async-storage/async-storage`
- `@react-navigation/native`
- `@react-navigation/stack`
- `react-native-linear-gradient`
- `react-native-safe-area-context`
- `react-native-screens`
- `react-native-gesture-handler`
- Status on Host Machine: **Not yet downloaded to host `node_modules/`**.

### 4. Java / Maven Packages
*All Maven artifacts are specified in `backend/pom.xml`.*
- `spring-boot-starter-web`
- `spring-boot-starter-data-mongodb`
- `spring-boot-starter-data-jpa`
- `postgresql`
- `spring-boot-starter-security`
- `lombok`
- Status on Host Machine: **Not downloaded to `~/.m2` on host**.

---

## 🧹 Post-Project Removal Command Reference

When the project is finished, execute the following commands to ensure complete removal from your system:

```bash
# 1. Remove Python virtual environment
rm -rf ai-service/venv ai-service/.venv

# 2. Remove Node modules and cache
rm -rf mobile-app/node_modules
npm cache clean --force

# 3. Clean Docker volumes & containers
docker-compose down -v --rmi all

# 4. Remove temporary dataset outputs
rm -f ml-training/dataset_generator/ncert_socratic_train.jsonl
```
