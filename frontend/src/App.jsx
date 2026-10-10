import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import StudySession from "./components/StudySession.jsx";
import Progress from "./components/Progress.jsx";
import { questions } from "./data/questions.js";
import { starterTopics } from "./data/topics.js";

const pageTitles = { overview: "Your overview", study: "Study session", progress: "My progress" };

export default function App() {
  const [currentView, setCurrentView] = useState("overview");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [topicScores, setTopicScores] = useState(() => Object.fromEntries(starterTopics.map(({ name, score }) => [name, score])));
  const question = questions[questionIndex];
  const wasCorrect = isChecked && selectedAnswer === question?.correctAnswer;

  function startSession() {
    setQuestionIndex(0); setSelectedAnswer(null); setIsChecked(false);
    setCorrectCount(0); setAnsweredCount(0); setCurrentView("study");
  }
  function checkAnswer() {
    if (selectedAnswer === null || isChecked || !question) return;
    const isCorrect = selectedAnswer === question.correctAnswer;
    setIsChecked(true); setAnsweredCount((count) => count + 1);
    if (isCorrect) setCorrectCount((count) => count + 1);
    setTopicScores((scores) => ({ ...scores, [question.topic]: Math.max(20, Math.min(99, scores[question.topic] + (isCorrect ? 4 : -3))) }));
  }
  function nextQuestion() {
    setQuestionIndex((index) => index + 1); setSelectedAnswer(null); setIsChecked(false);
  }
  function navigate(view) {
    if (view === "study" && questionIndex >= questions.length) startSession();
    else setCurrentView(view);
  }

  return <div className="app-shell">
    <Sidebar currentView={currentView} onNavigate={navigate} />
    <div className="main-column">
      <header className="topbar"><div><p className="topbar-overline">YOUR PERSONAL STUDY SPACE</p><h1>{pageTitles[currentView]}</h1></div>
        <button className="help-button" type="button" aria-label="Help and study tips">?</button>
      </header>
      <main className="page-content" id="main-content" tabIndex="-1">
        {currentView === "overview" && <Dashboard topicScores={topicScores} answeredCount={answeredCount} correctCount={correctCount} onStart={startSession} />}
        {currentView === "study" && <StudySession question={question} questionNumber={Math.min(questionIndex + 1, questions.length)} totalQuestions={questions.length} selectedAnswer={selectedAnswer} isChecked={isChecked} wasCorrect={wasCorrect} onSelect={setSelectedAnswer} onCheck={checkAnswer} onNext={nextQuestion} onReturn={() => setCurrentView("overview")} />}
        {currentView === "progress" && <Progress topicScores={topicScores} answeredCount={answeredCount} correctCount={correctCount} onStart={startSession} />}
      </main>
      <footer className="page-footer"><span>Made for the way you learn.</span><span>One question at a time <span aria-hidden="true">✦</span></span></footer>
    </div>
  </div>;
}
