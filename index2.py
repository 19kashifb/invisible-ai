import sqlite3

# Create the database
connection = sqlite3.connect("study_app.db")

# Create a cursor to execute SQL commands
cursor = connection.cursor()

# Create the attempts table
cursor.execute("""
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

# Save changes to the database
connection.commit()
connection.close()

print("Database and table created successfully!")

# Save a student's quiz attempt
def save_attempt(student_id, topic, question, student_answer, correct_answer):

    connection = sqlite3.connect("study_app.db")
    cursor = connection.cursor()

    # Check whether the student's answer is correct
    if student_answer.strip().lower() == correct_answer.strip().lower():
        is_correct = 1
    else:
        is_correct = 0

    # Saves the attempt of the student in the database
    cursor.execute("""
        INSERT INTO attempts
        (student_id, topic, question, student_answer, correct_answer, is_correct)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (student_id, topic, question, student_answer, correct_answer, is_correct))

    connection.commit()
    connection.close()

    print("Quiz attempt saved successfully!")

save_attempt(1, "Fractions", "What is 1 + 1?", "2", "2")
save_attempt(1, "Algebra", "What is 2 + 2?", "5", "4")
save_attempt(1, "Algebra", "What is 3 + 3?", "6", "6")

# retrieve a student's performance for each topic from the database
def get_topic_performance(student_id):

    connection = sqlite3.connect("study_app.db")
    cursor = connection.cursor()
    #selecting the data needed from the database
    cursor.execute("""
        SELECT
            topic,
            COUNT(*) AS total_attempts,
            SUM(is_correct) AS correct_answers
        FROM attempts
        WHERE student_id = ?
        GROUP BY topic
    """, (student_id,))

    results = cursor.fetchall()

    connection.close()

    return results




# Identify the student's weakest topic
def get_weakest_topic(student_id):

    performance = get_topic_performance(student_id)

    if not performance:
        return None

    weakest = min(
        performance,
        key=lambda row: row[2] / row[1]
    )

    return weakest[0]




