import { starterTopics } from "../data/topics.js";

export default function Dashboard({ topicScores, answeredCount, correctCount, onStart }) {
  const topics = starterTopics.map((topic) => ({ ...topic, score: topicScores[topic.name] ?? topic.score }));
  const weakestTopic = [...topics].sort((a, b) => a.score - b.score)[0];
  const accuracy = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;
  return (
    <div className="dashboard-page">
      <section className="welcome-row" aria-labelledby="welcome-title"><div>
        <p className="eyebrow">YOUR NEXT WIN STARTS HERE</p><h2 id="welcome-title">Good to see you, learner <span aria-hidden="true">✦</span></h2>
        <p className="welcome-copy">A little practice today makes the tricky stuff feel easier tomorrow.</p>
      </div><div className="streak-pill"><span aria-hidden="true">☀</span> Your study space</div></section>
      <section className="hero-card" aria-labelledby="focus-title"><div className="hero-copy">
        <p className="eyebrow eyebrow-light">YOUR NEXT FOCUS</p><h3 id="focus-title">Let’s make {weakestTopic.name.toLowerCase()} click.</h3>
        <p>We’ll start with a quick question and build from there, at your pace.</p>
        <button className="button button-light" type="button" onClick={onStart}>Start a focused session <span aria-hidden="true">→</span></button>
      </div><div className="hero-art" aria-hidden="true"><span className="orbit orbit-one" /><span className="orbit orbit-two" />
        <span className="hero-spark spark-one">✦</span><span className="hero-spark spark-two">✳</span><span className="hero-core">b<span>.</span></span></div></section>
      <section className="stat-grid" aria-label="Study summary">
        <article className="stat-card"><span className="stat-icon stat-icon-violet" aria-hidden="true">◷</span><div><p className="stat-label">Questions answered</p><p className="stat-value">{answeredCount}<span> this session</span></p></div><span className="stat-decoration" aria-hidden="true">↗</span></article>
        <article className="stat-card"><span className="stat-icon stat-icon-green" aria-hidden="true">✓</span><div><p className="stat-label">Session accuracy</p><p className="stat-value">{accuracy}<span>% so far</span></p></div><span className="stat-decoration" aria-hidden="true">↗</span></article>
        <article className="stat-card"><span className="stat-icon stat-icon-orange" aria-hidden="true">✦</span><div><p className="stat-label">Best next step</p><p className="stat-value stat-topic">{weakestTopic.name}</p></div><span className="stat-decoration" aria-hidden="true">↗</span></article>
      </section>
      <section className="topics-section" aria-labelledby="topics-title"><div className="section-heading"><div><p className="eyebrow">YOUR LEARNING MAP</p><h3 id="topics-title">Topics to explore</h3></div><span className="muted-note">Your practice shapes what comes next</span></div>
        <div className="topic-grid">{topics.map((topic) => <article className="topic-card" key={topic.name}>
          <span className={`topic-symbol topic-symbol-${topic.color}`} aria-hidden="true">{topic.symbol}</span><div className="topic-card-copy"><h4>{topic.name}</h4><p>{topic.detail}</p></div>
          <div className="topic-score"><strong>{topic.score}%</strong><span>confidence</span></div><div className="topic-progress" role="img" aria-label={`${topic.name}: ${topic.score}% confidence`}><span className={`progress-fill fill-${topic.color}`} style={{ width: `${topic.score}%` }} /></div>
        </article>)}</div>
      </section>
      <aside className="nudge-card" aria-label="Study tip"><span className="nudge-icon" aria-hidden="true">✦</span>
        <p><strong>A helpful reminder</strong><br />Getting a question wrong is useful information. It helps us find the right next step for you.</p><span className="nudge-decoration" aria-hidden="true">✧</span>
      </aside>
    </div>
  );
}
