from ai import generate_feedback

feedback = generate_feedback(
    question="What is the sum of the interior angles of a triangle?",
    student_answer="90 degrees",
    correct_answer="180 degrees",
    topic="Geometry",
)

print("\n--- Invisible AI Feedback ---\n")
print(feedback)

