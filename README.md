# AI Resume Analyzer — Backend (FastAPI + NLP)

## 🎥 Demo Video

https://github.com/user-attachments/assets/0915645d-3fa3-40f0-bbec-db3bcf3fd505

## 📸 Preview
![Prompt Screenshot](/frontend/public/Demo1.png)

## ✨ Features

- 📄 Resume Text Extraction – Supports PDF & DOCX
- 🔑 Keyword Extraction – NLP-driven insights using KeyBERT
- 🤝 Resume vs Job Description Matching – Powered by Sentence Transformers
- 💡 AI Suggestions – Personalized resume improvements via OpenAI GPT
- ⚡ Frontend-ready – Fully CORS-enabled for React/Vite integration

## 🛠 Tech Stack

- FastAPI – Lightning-fast Python API framework
- KeyBERT – Keyword extraction from resumes
- Sentence Transformers – Resume vs Job Description similarity
- OpenAI GPT – AI-driven suggestions
- PDF/DOCX parsing – Extract text from resumes

## 💡 Use Cases

- Recruitment platforms
- Career coaching & resume improvement tools
- Job matching applications
- Personal resume assistants

## ⚡ Quick Start
1️⃣ Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate
```
2️⃣ Install dependencies
```bash
pip install -r requirements.txt
```
3️⃣ Set your OpenAI API key
```bash
export OPENAI_API_KEY="yourkey"
```
4️⃣ Run the server
```bash
uvicorn app.main:app --reload --port 8000
```
5️⃣ Explore API docs
```bash
http://localhost:8000/docs
```

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you’d like to change.

## 🪪 License
MIT License © 2025 [Hadi Shah](https://github.com/hadishah123)
