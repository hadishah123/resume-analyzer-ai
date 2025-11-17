import tempfile
import pdfplumber
from docx import Document
from app.utils.text_cleaner import clean_text


def extract_resume_text(file):
    """Extract text from uploaded PDF or DOCX resume."""

    filename = file.filename
    ext = filename.split(".")[-1].lower()

    # Save temporary file
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}")
    tmp.write(file.file.read())
    tmp.close()

    if ext == "pdf":
        with pdfplumber.open(tmp.name) as pdf:
            pages = [page.extract_text() or "" for page in pdf.pages]
            return clean_text("\n".join(pages))

    elif ext == "docx":
        doc = Document(tmp.name)
        paragraphs = [p.text for p in doc.paragraphs]
        return clean_text("\n".join(paragraphs))

    else:
        return "Unsupported file type. Upload PDF or DOCX."