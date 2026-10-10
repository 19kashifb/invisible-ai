export default function StudySession({ question, questionNumber, totalQuestions, selectedAnswer, isChecked, wasCorrect, onSelect, onCheck, onNext, onReturn }) {
  if (!question) return <section className="completion-card" aria-labelledby="completion-title">
    <span className="completion-mark" aria-hidden="true">✦</span><p className="eyebrow">SESSION COMPLETE</p>
    <h2 id="completion-title">That’s a solid step forward.</h2><p>You’ve finished this set. Your topic confidence has been updated for this session.</p>
    <button className="button button-primary" type="button" onClick={onReturn}>Back to your overview <span aria-hidden="true">→</span></button>
  </section>;
  const progressValue = Math.round(((questionNumber - 1) / totalQuestions) * 100);
  return <div className="study-layout">
    <section className="question-panel" aria-labelledby="question-title">
      <div className="session-topline"><button className="text-button" type="button" onClick={onReturn}><span aria-hidden="true">←</span> Back to overview</button><span className="session-count">Question <strong>{questionNumber}</strong> of {totalQuestions}</span></div>
      <div className="session-progress" role="img" aria-label={`Session progress: ${progressValue}%`}><span style={{ width: `${progressValue}%` }} /></div>
      <div className="question-meta"><span className="topic-tag">{question.topic}</span><span>{question.level}</span></div>
      <h2 id="question-title">{question.prompt}</h2>
      <form onSubmit={(event) => { event.preventDefault(); onCheck(); }}><fieldset className="answer-list" disabled={isChecked}><legend className="visually-hidden">Choose one answer</legend>
        {question.answers.map((answer, index) => <label className={`answer-option ${selectedAnswer === index ? "is-selected" : ""} ${isChecked && index === question.correctAnswer ? "is-correct" : ""} ${isChecked && selectedAnswer === index && !wasCorrect ? "is-incorrect" : ""}`} key={answer}>
          <input type="radio" name="answer" value={index} checked={selectedAnswer === index} onChange={() => onSelect(index)} /><span className="answer-letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span><span className="answer-text">{answer}</span>
          {isChecked && index === question.correctAnswer && <span className="answer-result" aria-label="Correct answer">✓</span>}{isChecked && selectedAnswer === index && !wasCorrect && <span className="answer-result" aria-label="Your answer was incorrect">↺</span>}
        </label>)}
      </fieldset>
      {isChecked && <aside className={`feedback-box ${wasCorrect ? "feedback-correct" : "feedback-try-again"}`} aria-live="polite"><strong>{wasCorrect ? "That’s right!" : "Not quite, and that’s okay."}</strong><p>{question.explanation}</p></aside>}
      <div className="question-actions">{isChecked ? <button className="button button-primary" type="button" onClick={onNext}>Next question <span aria-hidden="true">→</span></button> : <button className="button button-primary" type="submit" disabled={selectedAnswer === null}>Check answer <span aria-hidden="true">→</span></button>}<span className="gentle-note"><span aria-hidden="true">✦</span> Take your time</span></div>
      </form>
    </section>
    <aside className="study-aside" aria-labelledby="study-aside-title"><div className="aside-illustration" aria-hidden="true"><span>✦</span><div className="book-shape"><i /><i /><i /></div></div>
      <p className="eyebrow">A LITTLE CONTEXT</p><h3 id="study-aside-title">Practice that meets you where you are.</h3><p>Answer at your own pace. Your practice helps us choose what to revisit and what you’re ready to learn next.</p>
      <div className="aside-divider" /><p className="aside-footnote"><span aria-hidden="true">◎</span> Your progress stays in this demo session.</p>
    </aside>
  </div>;
}

