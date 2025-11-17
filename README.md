# AI Resume Analyzer — Backend (FastAPI + NLP)

This is the backend portion of the AI Resume Analyzer project.

## 🚀 Features
- Extract text from PDF/DOCX resumes
- NLP keyword extraction using KeyBERT
- Resume vs Job Description matching using Sentence Transformers
- AI-generated suggestions using GPT (OpenAI)
- Fully CORS-enabled for frontend (React / Vite)

## ▶️ How to Run

### 1. Create virtual environment 
```bash
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Set OPENAI API key
```bash
export OPENAI_API_KEY="yourkey"
```

### 4. Start server
```bash
uvicorn app.main:app --reload --port 8000
```

### API docs available at:

http://localhost:8000/docs
