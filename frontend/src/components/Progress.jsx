import { starterTopics } from "../data/topics.js";

export default function Progress({
  topicScores,
  answeredCount,
  correctCount,
  onStart,
}) {
  const topics = starterTopics.map((topic) => ({
    ...topic,
    score: topicScores[topic.name] ?? topic.score,
  }));
  const accuracy = answeredCount
    ? Math.round((correctCount / answeredCount) * 100)
    : 0;

  return (
    <div className="progress-page">
      <section className="progress-intro" aria-labelledby="progress-title">
        <div>
          <p className="eyebrow">YOUR LEARNING MAP</p>

          <h2 id="progress-title">Progress, at your pace.</h2>

          <p>
            Every answer gives us a better picture of what you know and what to
            practise next.
          </p>
        </div>

        <span className="progress-intro-mark" aria-hidden="true">
          ↗
        </span>
      </section>

      <section className="progress-summary" aria-label="Session results">
        <article>
          <span className="summary-icon summary-icon-purple" aria-hidden="true">
            ◷
          </span>

          <p>Answered this session</p>

          <strong>{answeredCount}</strong>
        </article>

        <article>
          <span className="summary-icon summary-icon-green" aria-hidden="true">
            ✓
          </span>

          <p>Correct answers</p>

          <strong>
            {correctCount} <small>of {answeredCount}</small>
          </strong>
        </article>

        <article>
          <span className="summary-icon summary-icon-peach" aria-hidden="true">
            ✦
          </span>

          <p>Session accuracy</p>

          <strong>
            {accuracy}<small>%</small>
          </strong>
        </article>
      </section>

      <section className="confidence-panel" aria-labelledby="confidence-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CONFIDENCE BY TOPIC</p>
            <h3 id="confidence-title">Where you are right now</h3>
          </div>

          <span className="muted-note">A starting point, not a final grade</span>
        </div>

        <div className="confidence-list">
          {topics.map((topic) => (
            <article className="confidence-row" key={topic.name}>
              <span
                className={`topic-symbol topic-symbol-${topic.color}`}
                aria-hidden="true"
              >
                {topic.symbol}
              </span>

              <div className="confidence-copy">
                <h4>{topic.name}</h4>
                <p>{topic.detail}</p>
              </div>

              <div className="confidence-meter">
                <div
                  className="topic-progress"
                  role="img"
                  aria-label={`${topic.name}: ${topic.score}% confidence`}
                >
                  <span
                    className={`progress-fill fill-${topic.color}`}
                    style={{ width: `${topic.score}%` }}
                  />
                </div>

                <span>{topic.score}%</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="next-step-card" aria-labelledby="next-step-title">
        <span className="next-step-icon" aria-hidden="true">
          ✳
        </span>

        <div>
          <p className="eyebrow">SUGGESTED NEXT STEP</p>

          <h3 id="next-step-title">Keep building with a short practice set.</h3>

          <p>We’ll bring back topics that need a little more attention.</p>
        </div>

        <button
          className="button button-primary"
          type="button"
          onClick={onStart}
        >
          Start studying <span aria-hidden="true">→</span>
        </button>
      </aside>
    </div>
  );
}
