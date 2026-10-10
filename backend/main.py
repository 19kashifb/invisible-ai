from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ai import generate_feedback
from database import save_attempt, get_weakest_topic

app = FastAPI(title="Invisible AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnswerRequest(BaseModel):
    student_id: int = 1
    topic: str
    question: str
    student_answer: str
    correct_answer: str


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/answer")
def submit_answer(data: AnswerRequest):
    is_correct = (
        data.student_answer.strip().lower()
        == data.correct_answer.strip().lower()
    )

    save_attempt(
        data.student_id,
        data.topic,
        data.question,
        data.student_answer,
        data.correct_answer,
    )

    feedback = None

    if not is_correct:
        try:
            feedback = generate_feedback(
                question=data.question,
                student_answer=data.student_answer,
                correct_answer=data.correct_answer,
                topic=data.topic,
            )
        except Exception:
            feedback = (
                "Have another go! Review the question and try breaking "
                "it down into smaller steps."
            )

    return {
        "is_correct": is_correct,
        "feedback": feedback,
        "weakest_topic": get_weakest_topic(data.student_id),
    }
