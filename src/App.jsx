import React, { useMemo, useState } from 'react';
import {
  LayoutDashboard, NotebookPen, ScanLine, BrainCircuit, Route, ChartNoAxesCombined,
  Settings, Search, Bell, ChevronDown, Plus, ArrowUpRight, Clock3, Flame,
  BookOpen, Sparkles, MoreHorizontal, Check, Circle, FileText, Camera,
  LockKeyhole, CalendarDays, Target, X, Trash2, Pencil, Play, Trophy
} from 'lucide-react';

const initialNotes = [
  { id: 1, title: 'Podstawy biologii komórki', subject: 'Biologia', date: 'Dzisiaj', color: 'purple', body: 'Komórka jest podstawową jednostką strukturalną i funkcjonalną organizmów. Najważniejsze organella: jądro, mitochondria, rybosomy i siateczka śródplazmatyczna.' },
  { id: 2, title: 'Równania kwadratowe', subject: 'Matematyka', date: 'Wczoraj', color: 'blue', body: 'Postać ogólna: ax² + bx + c = 0. Delta: Δ = b² − 4ac. Pierwiastki obliczamy ze wzoru x = (−b ± √Δ) / 2a.' },
  { id: 3, title: 'Czasy angielskie — powtórka', subject: 'Angielski', date: '18 lis 2026', color: 'orange', body: 'Present Simple opisuje rutyny i fakty. Present Continuous opisuje czynności trwające teraz lub ustalone plany.' }
];

const navItems = [
  { id: 'home', label: 'Przegląd', icon: LayoutDashboard, section: 'MENU' },
  { id: 'notes', label: 'Moje notatki', icon: NotebookPen, section: 'NAUKA' },
  { id: 'scanner', label: 'AI Scanner', icon: ScanLine, section: 'NAUKA', tag: 'SOON' },
  { id: 'quizzes', label: 'Quizy', icon: BrainCircuit, section: 'NAUKA' },
  { id: 'roadmap', label: 'Moja roadmapa', icon: Route, section: 'NAUKA' },
  { id: 'progress', label: 'Postępy', icon: ChartNoAxesCombined, section: 'MENU' }
];

function App() {
  const [active, setActive] = useState('home');
  const [notes, setNotes] = useState(initialNotes);
  const [roadmap, setRoadmap] = useState([
    { id: 1, title: 'Powtórzyć funkcje matematyczne', done: true, detail: 'Matematyka · 30 min' },
    { id: 2, title: 'Przerobić układ krwionośny', done: false, detail: 'Biologia · 45 min' },
    { id: 3, title: 'Nauczyć się 20 nowych słówek', done: false, detail: 'Angielski · 20 min' }
  ]);
  const [showNote, setShowNote] = useState(false);
  const [editing, setEditing] = useState(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteSubject, setNoteSubject] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [newTask, setNewTask] = useState('');
  const [search, setSearch] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [answer, setAnswer] = useState('');
  const [quizResult, setQuizResult] = useState(null);

  const openNewNote = (note = null) => {
    setEditing(note);
    setNoteTitle(note?.title || '');
    setNoteSubject(note?.subject || '');
    setNoteBody(note?.body || '');
    setShowNote(true);
  };
  const saveNote = (e) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;
    if (editing) setNotes(notes.map(n => n.id === editing.id ? { ...n, title: noteTitle, subject: noteSubject || 'Inne', body: noteBody, date: 'Przed chwilą' } : n));
    else setNotes([{ id: Date.now(), title: noteTitle, subject: noteSubject || 'Inne', body: noteBody, date: 'Przed chwilą', color: 'purple' }, ...notes]);
    setShowNote(false);
  };
  const filteredNotes = useMemo(() => notes.filter(n => `${n.title} ${n.subject}`.toLowerCase().includes(search.toLowerCase())), [notes, search]);
  const toggleTask = id => setRoadmap(roadmap.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const addTask = e => { e.preventDefault(); if (!newTask.trim()) return; setRoadmap([...roadmap, { id: Date.now(), title: newTask, detail: 'Własny cel · Do zaplanowania', done: false }]); setNewTask(''); };

  const pageTitle = navItems.find(n => n.id === active)?.label || 'Przegląd';

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">O</div><span>omni<span className="brand-light">edu</span></span></div>
      <div className="workspace"><div className="workspace-avatar">S</div><div><b>Moja przestrzeń</b><small>Plan osobisty</small></div><ChevronDown size={15}/></div>
      {['MENU', 'NAUKA'].map(section => <div className="nav-group" key={section}>
        <div className="nav-label">{section}</div>
        {navItems.filter(n => n.section === section).map(item => <button key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`} onClick={() => setActive(item.id)}>
          <item.icon size={18}/><span>{item.label}</span>{item.tag && <em>{item.tag}</em>}
        </button>)}
      </div>)}
      <div className="sidebar-bottom">
        <div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={17}/></div><b>Twoja nauka, nowy poziom</b><p>Odkrywaj inteligentne narzędzia do nauki.</p><button onClick={() => setActive('scanner')}>Poznaj możliwości <ArrowUpRight size={14}/></button></div>
        <button className="nav-item settings"><Settings size={18}/>Ustawienia</button>
        <div className="profile"><div className="profile-avatar">A</div><div><b>Alex Student</b><small>Bezpłatny plan</small></div><MoreHorizontal size={18}/></div>
      </div>
    </aside>

    <main className="main-area">
      <header className="topbar">
        <div className="breadcrumbs">Twoja przestrzeń <span>/</span> <b>{pageTitle}</b></div>
        <div className="top-actions"><div className="search-box"><Search size={16}/><input placeholder="Szukaj..." value={search} onChange={e => setSearch(e.target.value)}/><kbd>⌘ K</kbd></div><button className="icon-button"><Bell size={18}/><i/></button><div className="top-avatar">A</div></div>
      </header>
      <div className="content">
        {active === 'home' && <Dashboard setActive={setActive} notes={notes} roadmap={roadmap} openNewNote={openNewNote}/>}
        {active === 'notes' && <NotesPage notes={filteredNotes} openNewNote={openNewNote} deleteNote={id => setNotes(notes.filter(n => n.id !== id))}/>}
        {active === 'scanner' && <ScannerPage/>}
        {active === 'quizzes' && <QuizPage quizStarted={quizStarted} setQuizStarted={setQuizStarted} answer={answer} setAnswer={setAnswer} quizResult={quizResult} setQuizResult={setQuizResult}/>}
        {active === 'roadmap' && <RoadmapPage roadmap={roadmap} toggleTask={toggleTask} newTask={newTask} setNewTask={setNewTask} addTask={addTask}/>}
        {active === 'progress' && <ProgressPage roadmap={roadmap} notes={notes}/>}
      </div>
      <footer className="footer"><span>© 2026 Omniedu</span><span>Ucz się we własnym tempie <span className="footer-dot">✦</span></span></footer>
    </main>

    {showNote && <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && setShowNote(false)}><form className="modal" onSubmit={saveNote}>
      <div className="modal-head"><div><span className="eyebrow">TWOJE MATERIAŁY</span><h2>{editing ? 'Edytuj notatkę' : 'Nowa notatka'}</h2></div><button type="button" className="icon-button" onClick={() => setShowNote(false)}><X size={18}/></button></div>
      <label>Tytuł notatki<input required autoFocus value={noteTitle} onChange={e => setNoteTitle(e.target.value)} placeholder="Np. Fotosynteza — najważniejsze informacje"/></label>
      <label>Przedmiot<input value={noteSubject} onChange={e => setNoteSubject(e.target.value)} placeholder="Np. Biologia"/></label>
      <label>Treść<textarea rows="6" value={noteBody} onChange={e => setNoteBody(e.target.value)} placeholder="Zapisz tutaj swoje materiały..."/></label>
      <div className="modal-actions"><button type="button" className="button secondary" onClick={() => setShowNote(false)}>Anuluj</button><button className="button primary" type="submit"><Check size={16}/> Zapisz notatkę</button></div>
    </form></div>}
  </div>;
}

function PageHeading({eyebrow, title, subtitle, action}) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}
function Dashboard({setActive, notes, roadmap, openNewNote}) {
  const done = roadmap.filter(t => t.done).length;
  return <>
    <PageHeading eyebrow="WTOREK, 24 LISTOPADA 2026" title={<>Dobrze Cię widzieć, Alex <span className="wave">✦</span></>} subtitle="Małe kroki każdego dnia prowadzą do wielkich rezultatów." action={<button className="button primary" onClick={() => openNewNote()}><Plus size={17}/> Nowa notatka</button>}/>
    <section className="welcome-banner"><div className="banner-copy"><div className="banner-pill"><Sparkles size={13}/> TWOJA STREFA NAUKI</div><h2>Wiedza zaczyna się<br/>od <span>dobrego planu.</span></h2><p>Zorganizuj naukę, śledź postępy i osiągaj swoje cele z Omniedu.</p><button className="banner-button" onClick={() => setActive('roadmap')}>Zobacz swoją roadmapę <ArrowUpRight size={15}/></button></div><div className="banner-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-glow"/><div className="book-stack"><div className="book book-back"/><div className="book book-mid"/><div className="book book-front"><Sparkles size={28}/><span>LEARN<br/>EVERY DAY</span></div></div><div className="floating-note"><Check size={13}/> Cel osiągnięty</div><div className="floating-star">✦</div></div></section>
    <div className="section-title"><div><h2>Twój przegląd</h2><p>Sprawdź, jak idzie Ci nauka.</p></div><span className="muted-label">TEN TYDZIEŃ</span></div>
    <div className="stats-grid">
      <StatCard icon={Flame} tone="orange" label="Seria nauki" value="5 dni" note="Świetna regularność!" trend="+2 dni"/>
      <StatCard icon={NotebookPen} tone="violet" label="Notatki" value={String(notes.length).padStart(2,'0')} note="Twoja baza wiedzy" trend="+1"/>
      <StatCard icon={Target} tone="green" label="Cele ukończone" value={`${done}/${roadmap.length}`} note="Twoja roadmapa" trend="W toku"/>
      <StatCard icon={Clock3} tone="blue" label="Czas nauki" value="4,5 h" note="Łącznie w tym tygodniu" trend="+12%"/>
    </div>
    <div className="dashboard-columns">
      <section className="panel"><div className="panel-heading"><div><h3>Ostatnie notatki</h3><p>Wróć do swojej wiedzy</p></div><button className="text-button" onClick={() => setActive('notes')}>Wszystkie <ArrowUpRight size={14}/></button></div>
        {notes.slice(0,3).map(n => <div className="recent-note" key={n.id}><div className={`note-icon ${n.color || 'purple'}`}><FileText size={18}/></div><div className="note-info"><b>{n.title}</b><span>{n.subject} <i/> {n.date}</span></div><ArrowUpRight className="subtle-arrow" size={16}/></div>)}
        <button className="add-inline" onClick={() => openNewNote()}><Plus size={15}/> Dodaj nową notatkę</button>
      </section>
      <section className="panel"><div className="panel-heading"><div><h3>Plan na dziś</h3><p>Twoje najbliższe cele</p></div><button className="text-button" onClick={() => setActive('roadmap')}>Roadmapa <ArrowUpRight size={14}/></button></div>
        {roadmap.slice(0,3).map(t => <div className="today-task" key={t.id}><span className={`task-check ${t.done ? 'checked' : ''}`}>{t.done && <Check size={12}/>}</span><div><b className={t.done ? 'completed' : ''}>{t.title}</b><span>{t.detail}</span></div></div>)}
        <div className="task-progress"><div className="progress-label"><span>Dzisiejszy postęp</span><b>{roadmap.length ? Math.round(roadmap.filter(t=>t.done).length / roadmap.length * 100) : 0}%</b></div><div className="progress-track"><div style={{width: `${roadmap.length ? roadmap.filter(t=>t.done).length / roadmap.length * 100 : 0}%`}}/></div></div>
      </section>
    </div>
    <div className="tools-section"><div className="section-title"><div><h2>Twoje narzędzia</h2><p>Wszystko, czego potrzebujesz do skutecznej nauki.</p></div></div><div className="tools-grid">
      <ToolCard icon={NotebookPen} tone="violet" title="Notatki" desc="Twórz i porządkuj własne materiały." onClick={() => setActive('notes')} label="Otwórz notatki"/>
      <ToolCard icon={ScanLine} tone="blue" title="AI Scanner" desc="Skanuj pytania i otrzymuj pomoc AI." onClick={() => setActive('scanner')} label="Wkrótce" soon/>
      <ToolCard icon={BrainCircuit} tone="pink" title="Quizy" desc="Sprawdź swoją wiedzę i wyniki." onClick={() => setActive('quizzes')} label="Rozwiąż quiz"/>
      <ToolCard icon={Route} tone="green" title="Roadmapa" desc="Zaplanuj naukę po swojemu." onClick={() => setActive('roadmap')} label="Zaplanuj naukę"/>
    </div></div>
  </>;
}
function StatCard({icon: Icon, tone, label, value, note, trend}) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={18}/></div><span className="stat-label">{label}</span><div className="stat-value">{value}</div><div className="stat-bottom"><span>{note}</span><em>{trend}</em></div></div>;
}
function ToolCard({icon: Icon, tone, title, desc, onClick, label, soon}) {
  return <button className="tool-card" onClick={onClick}><div className={`tool-icon ${tone}`}><Icon size={20}/></div>{soon && <span className="soon-tag">WKRÓTCE</span>}<h3>{title}</h3><p>{desc}</p><span className="tool-link">{label} <ArrowUpRight size={14}/></span></button>;
}
function NotesPage({notes, openNewNote, deleteNote}) {
  return <><PageHeading eyebrow="TWOJA BAZA WIEDZY" title="Moje notatki" subtitle="Wszystkie Twoje materiały w jednym, uporządkowanym miejscu." action={<button className="button primary" onClick={() => openNewNote()}><Plus size={17}/> Dodaj notatkę</button>}/>
    <div className="notes-toolbar"><div className="filter-chip active">Wszystkie <span>{notes.length}</span></div><div className="filter-chip">Ostatnio edytowane</div><span className="muted-label"> {notes.length} NOTATEK</span></div>
    {notes.length ? <div className="notes-grid">{notes.map(n=><article className="note-card" key={n.id}><div className="note-card-top"><div className={`note-icon ${n.color || 'purple'}`}><FileText size={19}/></div><button className="icon-button small" onClick={() => deleteNote(n.id)} title="Usuń"><Trash2 size={15}/></button></div><span className="note-subject">{n.subject}</span><h3>{n.title}</h3><p>{n.body || 'Ta notatka nie ma jeszcze treści. Otwórz edycję, aby ją uzupełnić.'}</p><div className="note-card-footer"><span><Clock3 size={13}/> {n.date}</span><button className="text-button" onClick={() => openNewNote(n)}>Edytuj <Pencil size={13}/></button></div></article>)}</div> : <div className="empty-state"><NotebookPen size={30}/><h3>Nie znaleziono notatek</h3><p>Dodaj notatkę lub zmień wyszukiwaną frazę.</p></div>}
  </>;
}
function ScannerPage() {
  return <><PageHeading eyebrow="INTELIGENTNA POMOC" title="AI Scanner" subtitle="Zamień zdjęcie zadania w zrozumiałe wyjaśnienie."/><div className="scanner-layout"><div className="scanner-main"><div className="scanner-badge"><Sparkles size={14}/> AI POWERED LEARNING</div><h2>Twoje pytanie.<br/><span>Jasna odpowiedź.</span></h2><p>W przyszłości wystarczy zrobić zdjęcie zadania, a Omniedu pomoże Ci zrozumieć rozwiązanie krok po kroku.</p><div className="upload-placeholder"><div className="upload-icon"><Camera size={25}/></div><b>Skanowanie będzie dostępne wkrótce</b><span>Pracujemy nad tą funkcją. Już niedługo tutaj dodasz zdjęcie zadania.</span><button className="button secondary" disabled><LockKeyhole size={15}/> Funkcja niedostępna</button></div></div><aside className="scanner-aside"><div className="aside-art"><div className="scan-frame"><FileText size={42}/><span/><span/><span/></div><Sparkles className="scan-spark" size={24}/></div><h3>Ucz się, rozumiejąc</h3><p>Nie tylko poznawaj odpowiedzi. Zrozum, skąd się biorą.</p><div className="feature-line"><Check size={15}/> Wyjaśnienia krok po kroku</div><div className="feature-line"><Check size={15}/> Wsparcie wielu przedmiotów</div><div className="feature-line"><Check size={15}/> Nauka we własnym tempie</div></aside></div></>;
}
function QuizPage({quizStarted,setQuizStarted,answer,setAnswer,quizResult,setQuizResult}) {
  const finish = () => setQuizResult(answer === 'b' ? 'Brawo! Poprawna odpowiedź.' : 'Tym razem niepoprawnie. Prawidłowa odpowiedź to mitochondrium.');
  return <><PageHeading eyebrow="SPRAWDŹ SWOJĄ WIEDZĘ" title="Quizy" subtitle="Krótka powtórka pomaga utrwalić to, czego się uczysz."/>
    {!quizStarted ? <div className="quiz-intro"><div className="quiz-visual"><div className="quiz-orbit"/><BrainCircuit size={66}/><Sparkles className="quiz-sparkle" size={23}/></div><div className="quiz-intro-copy"><span className="eyebrow">SZYBKI QUIZ NA START</span><h2>Gotowy sprawdzić,<br/>co już umiesz?</h2><p>Rozwiąż przykładowe pytanie i zobacz, jak będzie działał moduł quizów. Wyniki w tej wersji są zapisywane tylko w bieżącej sesji.</p><div className="quiz-meta"><span><BookOpen size={15}/> Biologia</span><span><Clock3 size={15}/> 1 pytanie</span><span><Trophy size={15}/> Wynik na koniec</span></div><button className="button primary" onClick={()=>{setQuizStarted(true);setQuizResult(null);setAnswer('')}}><Play size={16}/> Rozpocznij quiz</button></div></div> :
    <div className="quiz-question panel"><div className="quiz-progress-top"><span>PYTANIE 1 Z 1</span><span>Biologia · Podstawy</span></div><div className="progress-track"><div style={{width:'100%'}}/></div><h2>Które organellum komórkowe odpowiada za produkcję energii?</h2><div className="answer-list">{[['a','Rybosom'],['b','Mitochondrium'],['c','Aparat Golgiego'],['d','Jądro komórkowe']].map(([v,l])=><button key={v} className={`answer-option ${answer===v?'selected':''}`} onClick={()=>{setAnswer(v);setQuizResult(null)}}><span>{v.toUpperCase()}</span>{l}{answer===v&&<Check size={17}/>}</button>)}</div>{quizResult&&<div className={`quiz-feedback ${answer==='b'?'correct':'incorrect'}`}>{quizResult}</div>}<div className="quiz-bottom"><button className="text-button" onClick={()=>setQuizStarted(false)}>Zakończ quiz</button><button className="button primary" disabled={!answer} onClick={finish}>{quizResult?'Sprawdź ponownie':'Zatwierdź odpowiedź'} <ArrowUpRight size={15}/></button></div></div>}
  </>;
}
function RoadmapPage({roadmap,toggleTask,newTask,setNewTask,addTask}) {
  const completed=roadmap.filter(t=>t.done).length, percent=roadmap.length?Math.round(completed/roadmap.length*100):0;
  return <><PageHeading eyebrow="TWÓJ PLAN DZIAŁANIA" title="Moja roadmapa" subtitle="Podziel duże cele na małe kroki i realizuj je we własnym tempie."/>
    <div className="roadmap-summary"><div><span className="eyebrow">TWÓJ POSTĘP</span><h2>{percent}% <small>ukończone</small></h2><p>{completed} z {roadmap.length} zadań za Tobą. Każdy krok ma znaczenie!</p><div className="progress-track"><div style={{width:`${percent}%`}}/></div></div><div className="roadmap-summary-icon"><Route size={34}/></div></div>
    <div className="roadmap-columns"><section className="panel roadmap-panel"><div className="panel-heading"><div><h3>Twoje cele</h3><p>Lista zadań do zrealizowania</p></div><span className="count-pill">{roadmap.length} ZADAŃ</span></div>
      {roadmap.length ? roadmap.map((t,i)=><div className="roadmap-task" key={t.id}><button className={`task-check large ${t.done?'checked':''}`} onClick={()=>toggleTask(t.id)}>{t.done&&<Check size={14}/>}</button><div className="roadmap-task-copy"><b className={t.done?'completed':''}>{t.title}</b><span>{t.detail}</span></div><span className={`task-status ${t.done?'done':''}`}>{t.done?'Ukończone':'Do zrobienia'}</span></div>) : <div className="empty-state"><p>Twoja roadmapa jest pusta. Dodaj pierwszy cel!</p></div>}
      <form className="add-task-form" onSubmit={addTask}><input value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder="Dodaj nowy cel lub zadanie..."/><button className="button primary" type="submit"><Plus size={16}/> Dodaj</button></form>
    </section><aside className="panel roadmap-tip"><div className="tip-icon"><Target size={20}/></div><span className="eyebrow">MAŁA WSKAZÓWKA</span><h3>Planuj realistycznie.</h3><p>Najlepsza roadmapa to taka, którą możesz konsekwentnie realizować. Dodawaj małe zadania i zaznaczaj je po ukończeniu.</p><div className="tip-decoration">✦</div></aside></div>
  </>;
}
function ProgressPage({roadmap,notes}) {
  const done=roadmap.filter(t=>t.done).length;
  return <><PageHeading eyebrow="TWOJA DROGA DO CELU" title="Postępy" subtitle="Zobacz swoje dotychczasowe działania i utrzymuj dobry rytm."/><div className="stats-grid progress-stats"><StatCard icon={Flame} tone="orange" label="Seria nauki" value="5 dni" note="Dni z rzędu" trend="Aktywnie"/><StatCard icon={NotebookPen} tone="violet" label="Utworzone notatki" value={notes.length} note="Materiały w bibliotece" trend="Łącznie"/><StatCard icon={Target} tone="green" label="Ukończone cele" value={done} note="Z Twojej roadmapy" trend="Dobra robota"/><StatCard icon={Clock3} tone="blue" label="Czas nauki" value="4,5 h" note="W tym tygodniu" trend="+12%"/></div><div className="panel progress-panel"><div className="panel-heading"><div><h3>Realizacja roadmapy</h3><p>Ukończone zadania w Twoim planie</p></div><span className="count-pill">{roadmap.length?Math.round(done/roadmap.length*100):0}%</span></div><div className="big-progress"><div className="progress-track"><div style={{width:`${roadmap.length?done/roadmap.length*100:0}%`}}/></div></div><p className="muted-copy">To dopiero początek. Każda ukończona rzecz przybliża Cię do celu.</p></div></>;
}

export default App;
