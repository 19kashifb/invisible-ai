import { useState } from "react";

import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import StudySession from "./components/StudySession.jsx";
import Progress from "./components/Progress.jsx";
import { questions } from "./data/questions.js";
import { starterTopics } from "./data/topics.js";

const pageTitles = {
  overview: "Your overview",
  study: "Study session",
  progress: "My progress",
};

export default function App() {
  const [currentView, setCurrentView] = useState("overview");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [sessionQuestions, setSessionQuestions] = useState(questions);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [topicScores, setTopicScores] = useState(() =>
    Object.fromEntries(
      starterTopics.map(({ name, score }) => [name, score]),
    ),
  );

  const question = sessionQuestions[questionIndex];
  const wasCorrect = isChecked && selectedAnswer === question?.correctAnswer;

  function startSession() {
    const weakestTopic = [...starterTopics].sort(
      (a, b) => topicScores[a.name] - topicScores[b.name],
    )[0];
  
    const prioritisedQuestions = [
      ...questions.filter((q) => q.topic === weakestTopic.name),
      ...questions.filter((q) => q.topic !== weakestTopic.name),
    ];
  
    setSessionQuestions(prioritisedQuestions);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setIsChecked(false);
    setCorrectCount(0);
    setAnsweredCount(0);
    setCurrentView("study");
  }

  async function checkAnswer() {
    if (selectedAnswer === null || isChecked || !question || isChecking) {
      return;
    }
  
    const answerText = question.answers[selectedAnswer];
    const correctAnswerText = question.answers[question.correctAnswer];
  
    setIsChecking(true);
    setAiFeedback("");
  
    const isCorrect = selectedAnswer === question.correctAnswer;
  
    setIsChecked(true);
    setAnsweredCount((count) => count + 1);
  
    if (isCorrect) {
      setCorrectCount((count) => count + 1);
    }
  
    setTopicScores((scores) => ({
      ...scores,
      [question.topic]: Math.max(
        20,
        Math.min(99, scores[question.topic] + (isCorrect ? 4 : -3)),
      ),
    }));
  
    try {
      if (!isCorrect) {
        const response = await fetch("http://127.0.0.1:8000/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: 1,
            topic: question.topic,
            question: question.prompt,
            student_answer: answerText,
            correct_answer: correctAnswerText,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Could not retrieve AI feedback");
        }
  
        const data = await response.json();
        setAiFeedback(data.feedback || "");
      } else {
        await fetch("http://127.0.0.1:8000/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: 1,
            topic: question.topic,
            question: question.prompt,
            student_answer: answerText,
            correct_answer: correctAnswerText,
          }),
        });
      }
    } catch (error) {
      console.error("Answer submission failed:", error);
      setAiFeedback(
        isCorrect
          ? ""
          : "Review the explanation below, then try breaking the question into smaller steps.",
      );
    } finally {
      setIsChecking(false);
    }
  }

  function nextQuestion() {
    setQuestionIndex((index) => index + 1);
    setSelectedAnswer(null);
    setIsChecked(false);
    setAiFeedback("");
    setIsChecking(false);
  }

  function navigate(view) {
    if (view === "study" && questionIndex >= questions.length) {
      startSession();
    } else {
      setCurrentView(view);
    }
  }

  return (
    <div className="app-shell">
      <Sidebar currentView={currentView} onNavigate={navigate} />

      <div className="main-column">
        <header className="topbar">
          <div>
            <p className="topbar-overline">YOUR PERSONAL STUDY SPACE</p>

            <h1>{pageTitles[currentView]}</h1>
          </div>

          <button
            className="help-button"
            type="button"
            aria-label="Help and study tips"
          >
            ?
          </button>
        </header>

        <main className="page-content" id="main-content" tabIndex="-1">
          {currentView === "overview" && (
            <Dashboard
              topicScores={topicScores}
              answeredCount={answeredCount}
              correctCount={correctCount}
              onStart={startSession}
            />
          )}

          {currentView === "study" && (
            <StudySession
              question={question}
              aiFeedback={aiFeedback}
              isChecking={isChecking}
              questionNumber={Math.min(questionIndex + 1, questions.length)}
              totalQuestions={questions.length}
              selectedAnswer={selectedAnswer}
              isChecked={isChecked}
              wasCorrect={wasCorrect}
              onSelect={setSelectedAnswer}
              onCheck={checkAnswer}
              onNext={nextQuestion}
              onReturn={() => setCurrentView("overview")}
            />
          )}

          {currentView === "progress" && (
            <Progress
              topicScores={topicScores}
              answeredCount={answeredCount}
              correctCount={correctCount}
              onStart={startSession}
            />
          )}
        </main>

        <footer className="page-footer">
          <span>Made for the way you learn.</span>

          <span>
            One question at a time <span aria-hidden="true">✦</span>
          </span>
        </footer>
      </div>
    </div>
  );
}


