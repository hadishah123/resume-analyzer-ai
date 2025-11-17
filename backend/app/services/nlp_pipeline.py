from sentence_transformers import SentenceTransformer, util
from keybert import KeyBERT

# Load ML models once at startup (fast!)
embedder = SentenceTransformer("all-MiniLM-L6-v2")
kw_model = KeyBERT("all-MiniLM-L6-v2")


def score_resume(resume_text: str, jd_text: str):
    """Compute similarity between resume and job description."""
    emb_resume = embedder.encode(resume_text)
    emb_jd = embedder.encode(jd_text)

    score = util.cos_sim(emb_resume, emb_jd)[0][0].item()
    return round(score * 100, 2)


def extract_keywords(text: str):
    """Extract top keywords using KeyBERT."""
    keywords = kw_model.extract_keywords(text, top_n=12)
    return [kw[0] for kw in keywords]
