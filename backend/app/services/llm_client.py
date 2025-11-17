import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if api_key:
    client = OpenAI(api_key=api_key)
else:
    client = None
    print("⚠️ WARNING: OPENAI_API_KEY not set. Suggestions will be disabled.")


def generate_suggestions(resume_text: str, jd_text: str):
    if client is None:
        return "AI suggestions disabled (no OPENAI_API_KEY set)."

    prompt = f"""
Analyze the resume vs job description and provide improvements.

Resume:
{resume_text}

Job Description:
{jd_text}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4
    )

    return response.choices[0].message.content
