const navigation = [
  { id: "overview", label: "Overview", icon: "⌂" },
  { id: "study", label: "Study session", icon: "✳" },
  { id: "progress", label: "My progress", icon: "↗" },
];

export default function Sidebar({ currentView, onNavigate }) {
  return (
    <aside className="sidebar" aria-label="Study workspace">
      <a className="brand" href="#overview" onClick={(event) => { event.preventDefault(); onNavigate("overview"); }} aria-label="BlindSpot home">
        <span className="brand-mark" aria-hidden="true">b.</span><span>blindspot</span>
      </a>
      <nav className="primary-nav" aria-label="Main navigation">
        <p className="nav-label">WORKSPACE</p>
        {navigation.map((item) => (
          <button className={`nav-link ${currentView === item.id ? "is-active" : ""}`} key={item.id} type="button"
            aria-current={currentView === item.id ? "page" : undefined} onClick={() => onNavigate(item.id)}>
            <span className="nav-icon" aria-hidden="true">{item.icon}</span><span>{item.label}</span>
            {item.id === "study" && <span className="nav-dot" aria-label="Ready to study" />}
          </button>
        ))}
      </nav>
      <section className="sidebar-tip" aria-labelledby="sidebar-tip-title">
        <span className="tip-spark" aria-hidden="true">✦</span><h2 id="sidebar-tip-title">Small steps add up</h2>
        <p>Ten focused minutes can make a real difference.</p>
      </section>
      <footer className="sidebar-footer"><span className="avatar" aria-hidden="true">S</span>
        <span className="profile-copy"><strong>Study space</strong><small>Personal account</small></span><span className="more-icon" aria-hidden="true">···</span>
      </footer>
    </aside>
  );
}
