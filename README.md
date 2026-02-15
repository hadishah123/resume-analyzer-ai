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

## ⚡ Quick Start for ../backend
1️⃣ Create a virtual environment
```bash
cd ./backend
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
**backend is live at:** `http://127.0.0.1:8000/`

## ⚡ Quick Start for ../frontend
1️⃣ Go to the folder
```bash
cd ./frontend
```
2️⃣ Start the server
```bash
npm run dev
```
**frontend is live at:** `http://localhost:5173/`

Note: for both frontend and backend use different terminal, and the status of backend will be shown at: `http://127.0.0.1:8000/`
## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you’d like to change.

## 🪪 License
MIT License © 2025 [Hadi Shah](https://github.com/hadishah123)
