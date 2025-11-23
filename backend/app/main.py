from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services.extract_text import extract_resume_text
from app.services.nlp_pipeline import score_resume, extract_keywords
from app.services.llm_client import generate_suggestions


class AnalyzeRequest(BaseModel):
    resume_text: str
    job_description: str


app = FastAPI(
    title="AI Resume Analyzer Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def root():
    return {"message": "AI Resume Analyzer API is running"}


@app.post("/upload_resume")
async def upload_resume(file: UploadFile = File(...)):
    text = extract_resume_text(file)
    return {"resume_text": text}


@app.post("/analyze")
async def analyze_resume(payload: AnalyzeRequest):
    resume_text = payload.resume_text
    job_description = payload.job_description

    # Score resume vs JD
    match_score = score_resume(resume_text, job_description)

    # Keyword extraction
    resume_kw = extract_keywords(resume_text)
    jd_kw = extract_keywords(job_description)
    missing_keywords = [k for k in jd_kw if k not in resume_kw]

    # AI Suggestions
    suggestions = generate_suggestions(resume_text, job_description)

    return {
        "match_score": match_score,
        "missing_keywords": missing_keywords,
        "suggestions": suggestions
    }
