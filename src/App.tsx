import { useState } from 'react'
import { BookOpen, CalendarDays, Check, ChevronRight, CircleHelp, Clock3, Flower2, Heart, House, Leaf, Menu, PawPrint, Play, Search, Sparkles, Target, X } from 'lucide-react'
import { placeholderNotice, placeholderSubjects } from './data/placeholders'
import SyllabusExplorer from './components/SyllabusExplorer'

type View = 'Home' | 'Syllabus' | 'Practice' | 'My Notes' | 'Flashcards'

const navItems: { label: View; icon: typeof House }[] = [
  { label: 'Home', icon: House },
  { label: 'Syllabus', icon: BookOpen },
  { label: 'Practice', icon: Target },
  { label: 'My Notes', icon: Leaf },
  { label: 'Flashcards', icon: Sparkles },
]

function App() {
  const [activeView, setActiveView] = useState<View>('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [noticeVisible, setNoticeVisible] = useState(true)
  const [search, setSearch] = useState('')

  const chooseView = (view: View) => {
    setActiveView(view)
    setMenuOpen(false)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#home" onClick={() => chooseView('Home')} aria-label="Purr and Petal home">
          <span className="brand-mark"><PawPrint size={23} strokeWidth={2.3} /></span>
          <span className="brand-words"><strong>purr & petal</strong><small>your cozy study corner</small></span>
        </a>
        <div className="sidebar-label">YOUR LITTLE SPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-link ${activeView === label ? 'active' : ''}`} onClick={() => chooseView(label)}>
              <Icon size={18} strokeWidth={1.9} /><span>{label}</span>{activeView === label && <span className="active-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="cat-card" aria-label="A little encouragement">
            <span className="cat-illustration" aria-hidden="true">ฅ^•ﻌ•^ฅ</span>
            <p>Small steps count.</p>
            <small>You’re doing better than you think.</small>
            <span className="cat-flower">✿</span>
          </div>
          <div className="sidebar-footer"><Heart size={13} fill="currentColor" /> made with love, just for you</div>
        </div>
      </aside>

      {menuOpen && <button className="mobile-scrim" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} />}
      <main className="main-area" id="home">
        <header className="topbar">
          <button className="mobile-menu icon-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          <div className="breadcrumb"><span>My study space</span><ChevronRight size={14} /><strong>{activeView}</strong></div>
          <div className="topbar-right">
            <span className="today-chip"><CalendarDays size={15} /> Your gentle study day</span>
            <div className="avatar" aria-label="Study buddy Catty">🐱</div>
          </div>
        </header>

        <div className="page-content">
          {noticeVisible && <div className="placeholder-banner" role="status">
            <span className="banner-icon"><CircleHelp size={17} /></span>
            <div><strong>{placeholderNotice.label}</strong><p>{placeholderNotice.message}</p></div>
            <button className="banner-close" onClick={() => setNoticeVisible(false)} aria-label="Dismiss placeholder notice"><X size={17} /></button>
          </div>}

          {activeView === 'Syllabus' ? <SyllabusExplorer /> : activeView === 'Home' ? (
            <>
              <section className="welcome-row">
                <div>
                  <div className="eyebrow"><Sparkles size={14} /> A LITTLE PROGRESS, EVERY DAY</div>
                  <h1>Hello, lovely <span>learner!</span> <span className="wave" aria-hidden="true">✿</span></h1>
                  <p className="welcome-copy">Make yourself comfy. We’ll take this one little step at a time.</p>
                </div>
                <div className="welcome-doodle" aria-hidden="true"><span className="doodle-sun">✳</span><span className="doodle-flower">✿</span><span className="doodle-leaf">❧</span></div>
              </section>

              <section className="hero-card">
                <div className="hero-copy">
                  <span className="hero-kicker"><Flower2 size={15} /> YOUR STUDY JOURNEY</span>
                  <h2>A soft start is<br />still a start.</h2>
                  <p>Your SSC CGL journey doesn’t need to be perfect. Just begin where you are.</p>
                  <button className="primary-button" onClick={() => chooseView('Syllabus')}>Explore my syllabus <ChevronRight size={17} /></button>
                  <div className="hero-sprinkle sprinkle-one">✿</div><div className="hero-sprinkle sprinkle-two">✧</div>
                </div>
                <div className="hero-art" aria-hidden="true">
                  <div className="sun-disc" />
                  <div className="book book-back" /><div className="book book-middle" /><div className="book book-front" />
                  <div className="plant-pot"><span className="plant-stem">╱╲</span><span className="plant-leaf">❧</span><span className="pot">▰</span></div>
                  <div className="floating-heart">♡</div>
                  <div className="tiny-cat"><span className="cat-ears">⌃⌃</span><span className="cat-face">•ᴗ•</span><span className="cat-whiskers">⌁　⌁</span></div>
                  <span className="art-star star-a">✦</span><span className="art-star star-b">✧</span><span className="art-flower">✿</span>
                </div>
              </section>

              <section className="section-heading">
                <div><h2>Your study garden <span>✿</span></h2><p>A few little places to grow your knowledge.</p></div>
                <button className="text-button" onClick={() => chooseView('Syllabus')}>View syllabus <ChevronRight size={16} /></button>
              </section>

              <section className="subject-grid" aria-label="Study subjects">
                {placeholderSubjects.map((subject) => (
                  <button className="subject-card" key={subject.id} onClick={() => chooseView('Syllabus')}>
                    <span className={`subject-icon ${subject.tone}`}>{subject.icon}</span>
                    <span className="subject-name">{subject.name}</span>
                    <span className="subject-detail">{subject.detail}</span>
                    <span className="subject-bottom"><span>Placeholder progress</span><span className="progress-value">—</span></span>
                    <span className="progress-track"><span style={{ width: `${subject.progress}%` }} /></span>
                  </button>
                ))}
              </section>

              <section className="bottom-grid">
                <div className="panel focus-panel">
                  <div className="panel-heading"><div><span className="mini-icon blush"><Clock3 size={17} /></span><h3>A moment for focus</h3></div><span className="soft-label">COMING SOON</span></div>
                  <p className="panel-copy">A quiet little timer for focused study and guilt-free breaks.</p>
                  <div className="focus-preview"><div className="focus-ring"><span>25:00</span><small>focus time</small></div><div><strong>One thing at a time.</strong><p>Take a breath, then begin.</p><button className="secondary-button" onClick={() => chooseView('Practice')}>Find a practice task <Play size={14} /></button></div></div>
                </div>
                <div className="panel note-panel">
                  <div className="panel-heading"><div><span className="mini-icon butter"><Check size={17} /></span><h3>Tiny wins count</h3></div><span className="decorative-spark">✧</span></div>
                  <div className="win-empty"><span className="win-flower">✿</span><p>Your first little win is waiting.</p><small>Approved study activity will appear here later.</small></div>
                </div>
              </section>
              <footer className="page-footer"><span>Take it at your own pace <Heart size={13} /></span><span>purr & petal · made for gentle progress</span></footer>
            </>
          ) : (
            <section className="placeholder-view">
              <div className="placeholder-view-icon"><BookOpen size={27} /></div>
              <div className="eyebrow"><Sparkles size={14} /> YOUR STUDY SPACE</div>
              <h1>{activeView === 'Practice' ? 'Practice, softly' : activeView === 'My Notes' ? 'Your little notebook' : 'Pocket-sized reminders'}</h1>
              <p className="placeholder-lede">{activeView === 'Practice' ? 'Carefully reviewed practice questions will live here.' : activeView === 'My Notes' ? 'Your personal notes and saved thoughts will find a home here.' : 'Small flashcards will help you revisit what you learn.'}</p>
              <div className="coming-card"><span className="coming-flower">✿</span><div><strong>This little corner is growing</strong><p>Milestone 1 is setting up the visual foundation. This section is a placeholder, not a complete study feature.</p></div></div>
              <div className="search-placeholder"><Search size={17} /><input aria-label="Search placeholder content" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search will be available with syllabus data…" disabled /><span>SOON</span></div>
              <button className="secondary-button return-button" onClick={() => chooseView('Home')}>Back to my study space <ChevronRight size={15} /></button>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
