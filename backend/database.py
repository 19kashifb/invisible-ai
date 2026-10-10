##"""Database connection setup will go here."""
import sqlite3
from pathlib import Path

# Keep the database inside the backend folder
DATABASE_PATH = Path(__file__).parent / "study_app.db"


def get_connection():
    """Create a connection to the SQLite database."""
    return sqlite3.connect(DATABASE_PATH)

#creating the table
def initialise_database():
    """Create the attempts table if it does not already exist."""
    with get_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS attempts (
                attempt_id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id INTEGER,
                topic TEXT,
                question TEXT,
                student_answer TEXT,
                correct_answer TEXT,
                is_correct INTEGER
            )
        """)

#saves users answers in the database
def save_attempt(
    student_id,
    topic,
    question,
    student_answer,
    correct_answer,
):
    """Save a student's quiz attempt."""
    is_correct = int(
        student_answer.strip().lower()
        == correct_answer.strip().lower()
    )

    with get_connection() as connection:
        connection.execute("""
            INSERT INTO attempts (
                student_id,
                topic,
                question,
                student_answer,
                correct_answer,
                is_correct
            )
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            student_id,
            topic,
            question,
            student_answer,
            correct_answer,
            is_correct,
        ))

    return bool(is_correct)


def get_topic_performance(student_id):
    """Retrieve a student's performance for each topic."""
    with get_connection() as connection:
        cursor = connection.execute("""
            SELECT
                topic,
                COUNT(*) AS total_attempts,
                SUM(is_correct) AS correct_answers
            FROM attempts
            WHERE student_id = ?
            GROUP BY topic
        """, (student_id,))

        return cursor.fetchall()


def get_weakest_topic(student_id):
    """Identify the topic with the lowest accuracy."""
    performance = get_topic_performance(student_id)

    if not performance:
        return None

    weakest = min(
        performance,
        key=lambda row: row[2] / row[1],
    )

    return weakest[0]


# Initialise the database when this module is imported.
initialise_database()