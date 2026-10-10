#"""AI question adjustment service will go here."""

import os
from pathlib import Path

from dotenv import load_dotenv
from google import genai

# Load the API key from backend/.env
load_dotenv(Path(__file__).parent / ".env")

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing from backend/.env")

client = genai.Client(api_key=api_key)


def generate_feedback(question, student_answer, correct_answer, topic):
    """Generate personalised feedback using Gemini AI."""

    prompt = f"""
    You are Invisible AI, a friendly and patient study tutor.

    Topic: {topic}
    Question: {question}
    Student's answer: {student_answer}
    Correct answer: {correct_answer}

    Explain the mistake in simple language.
    Give one helpful hint.
    Be encouraging and concise.
    Do not simply repeat the correct answer.
    """

    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents=prompt,
    )
    return response.text

    return response.text