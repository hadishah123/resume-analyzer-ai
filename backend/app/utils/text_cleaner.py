import re

def clean_text(text: str):
    """Basic cleaning for resume and JD text."""
    text = text.replace("\n\n", "\n")
    text = re.sub(r"\s+", " ", text)
    return text.strip()
