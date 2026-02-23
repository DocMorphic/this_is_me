"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { DraggableCard } from "./DraggableCard";

type ViewName = "home" | "projects" | "education" | "experience";

const TYPEWRITER_WORDS = [
  "websites.",
  "ai agents.",
  "games.",
  "stuff.",
  "cool things.",
  "the future.",
  "React apps.",
  "\"what if\" ideas.",
];

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];

export default function Portfolio() {
  const [view, setView] = useState<ViewName>("home");
  const [lightTheme, setLightTheme] = useState(false);
  const [typewriterWord, setTypewriterWord] = useState("");
  const [easterEgg, setEasterEgg] = useState(false);
  const typewriterIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const konamiIndex = useRef(0);
  const easterToastRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const homeGridRef = useRef<HTMLDivElement>(null);

  // Sync theme to body for CSS .bw
  useEffect(() => {
    if (lightTheme) {
      document.body.classList.add("bw");
    } else {
      document.body.classList.remove("bw");
    }
  }, [lightTheme]);

  // Typewriter effect
  useEffect(() => {
    const type = () => {
      const w = TYPEWRITER_WORDS[typewriterIndex.current];
      if (!deleting.current) {
        charIndex.current += 1;
        setTypewriterWord(w.slice(0, charIndex.current));
        if (charIndex.current === w.length) {
          deleting.current = true;
          timeoutRef.current = setTimeout(type, 1600);
          return;
        }
        timeoutRef.current = setTimeout(type, 95);
      } else {
        charIndex.current -= 1;
        setTypewriterWord(w.slice(0, charIndex.current));
        if (charIndex.current === 0) {
          deleting.current = false;
          typewriterIndex.current = (typewriterIndex.current + 1) % TYPEWRITER_WORDS.length;
          timeoutRef.current = setTimeout(type, 300);
          return;
        }
        timeoutRef.current = setTimeout(type, 48);
      }
    };
    timeoutRef.current = setTimeout(type, 800);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const showView = useCallback((name: ViewName) => {
    setView(name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleTheme = useCallback(() => {
    setLightTheme((prev) => !prev);
  }, []);

  // Konami code easter egg
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const next = KONAMI[konamiIndex.current];
      if (e.code === next) {
        konamiIndex.current += 1;
        if (konamiIndex.current === KONAMI.length) {
          konamiIndex.current = 0;
          setEasterEgg(true);
          if (easterToastRef.current) clearTimeout(easterToastRef.current);
          easterToastRef.current = setTimeout(() => {
            setEasterEgg(false);
            easterToastRef.current = null;
          }, 3000);
        }
      } else {
        konamiIndex.current = 0;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      if (easterToastRef.current) clearTimeout(easterToastRef.current);
    };
  }, []);

  return (
    <>
      <button
        className="theme-switch"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        <div className="switch-track">
          <div className="switch-icons">
            <span>☾</span>
            <span>☀</span>
          </div>
          <div className="switch-knob" />
        </div>
      </button>

      {/* Easter egg toast */}
      {easterEgg && (
        <div className="easter-toast" role="alert">
          🎮 You found the secret! Have a great day.
        </div>
      )}

      {/* HOME */}
      <div
        id="view-home"
        className={`view ${view === "home" ? "active" : ""}`}
      >
        <div className="grid" ref={homeGridRef}>
          <DraggableCard className="card col-12 hero-card" index={0}>
            <div>
              <div className="hero-name">dharmay dave</div>
              <div className="hero-tagline">
                i make <span className="tw-word">{typewriterWord}</span>
                <span className="tw-cursor" />
              </div>
              <div className="hero-desc font-body">
                cs student at <strong style={{ color: "var(--text)" }}>TU Munich</strong>, fullstack engineer,
                game developer. i like hard problems and making &quot;what if&quot; ideas come to life.
              </div>
              <div className="now-section font-body">
                <span className="now-label">now:</span>
                <span>learning HCI</span>
                <span>·</span>
                <span>building with AI</span>
                <span>·</span>
                <span>reading the documentation</span>
              </div>
              <div className="status-line font-body">
                <span className="status-dot" />
                munich &nbsp;·&nbsp; open to internships
              </div>
            </div>
            <div className="hero-emoji">🇩🇪</div>
          </DraggableCard>

          <DraggableCard className="card col-5" index={1}>
            <div className="card-title"><span className="bracket">{`{}`}</span> STACKs.</div>
            <div className="tag-section">Web & Mobile:</div>
            <div className="tag-row">
              <span className="tag">React</span><span className="tag">Next.js</span><span className="tag">Node.js</span>
              <span className="tag">Python</span><span className="tag">Java</span><span className="tag">TypeScript</span>
              <span className="tag">React Native</span>
            </div>
            <div className="tag-section">Game Dev:</div>
            <div className="tag-row">
              <span className="tag">Godot</span><span className="tag">Unity</span><span className="tag">Unreal Engine</span>
            </div>
            <div className="tag-section">Into:</div>
            <div className="tag-row">
              <span className="tag">LLMs</span><span className="tag">AI Agents</span><span className="tag">HCI</span><span className="tag">IoT</span>
            </div>
          </DraggableCard>

          <DraggableCard
            className="card col-4 section-card card-projects link-card"
            onClick={() => showView("projects")}
            role="button"
            tabIndex={0}
            onKeyDown={(e: any) => e.key === "Enter" && showView("projects")}
            index={2}
          >
            <div className="card-icon" style={{ color: "#ffffff" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <div className="section-title" style={{ color: "#ffffff" }}>PRO<br />JECTS.</div>
          </DraggableCard>

          <DraggableCard
            className="card col-3 section-card card-edu link-card"
            onClick={() => showView("education")}
            role="button"
            tabIndex={0}
            onKeyDown={(e: any) => e.key === "Enter" && showView("education")}
            index={3}
          >
            <div className="card-icon" style={{ color: "#ffffff" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div className="section-title" style={{ color: "#ffffff" }}>EDU<br />CATION.</div>
          </DraggableCard>

          <DraggableCard className="card col-3 avail-card" index={4}>
            <div>
              <div className="avail-label">Status</div>
              <div className="avail-text">Available.</div>
              <div className="avail-sub">internships &amp; projects</div>
            </div>
            <a href="/cv.pdf" download className="cv-btn">
              <span>Download CV</span>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </DraggableCard>

          <DraggableCard className="card col-3" index={5}>
            <div className="loc-label">Location</div>
            <div className="loc-value">Munich 🇩🇪</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>TU Munich · CS</div>
            <div style={{ fontSize: 12, color: "var(--dim)", marginTop: 16 }}>originally from Rajkot, India 🇮🇳</div>
          </DraggableCard>

          <DraggableCard className="card col-3" index={6}>
            <div className="card-title" style={{ fontSize: 22, marginBottom: 16 }}>SPORT.</div>
            <div className="sport-line"><span className="sport-emoji">🏐</span><span>national <strong>volleyball</strong>, India</span></div>
            <div className="sport-line"><span className="sport-emoji">🎾</span><span>national <strong>squash</strong>, Gujarat</span></div>
            <div style={{ fontSize: 12, color: "var(--dim)", marginTop: 6 }}>2022 – 2024</div>
          </DraggableCard>

          <DraggableCard
            className="card col-3 section-card card-exp link-card"
            onClick={() => showView("experience")}
            role="button"
            tabIndex={0}
            onKeyDown={(e: any) => e.key === "Enter" && showView("experience")}
            index={7}
          >
            <div className="card-icon" style={{ color: "#ffffff" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div className="section-title" style={{ color: "#ffffff" }}>EXP<br />ERIENCE.</div>
          </DraggableCard>

          <DraggableCard className="card col-6 no-hover spotify-card" index={8}>
            <div className="spotify-header">
              <div className="spotify-logo">
                <svg width={13} height={13} viewBox="0 0 24 24" fill="white">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </div>
              <span className="spotify-label">on repeat lately</span>
            </div>
            <a className="song-item" href="https://open.spotify.com/track/1lbNgoJ5iMrMluCyhI4OQP" target="_blank" rel="noopener noreferrer">
              <div className="album-art">
                <img src="https://i.scdn.co/image/ab67616d00001e02bf705b821b031cefe91d7b90" alt="Victory Lap" loading="lazy" />
              </div>
              <div className="song-info">
                <div className="song-name">Victory Lap</div>
                <div className="song-artist">Fred again.., Skepta, PlaqueBoyMax</div>
              </div>
              <div className="song-playing"><div className="bar" /><div className="bar" /><div className="bar" /></div>
            </a>
            <a className="song-item" href="https://open.spotify.com/track/2364WrvPTUHobDNURudCbM" target="_blank" rel="noopener noreferrer">
              <div className="album-art">
                <img src="https://i.scdn.co/image/ab67616d00001e02f9c2232084a4ed05f9aa6362" alt="If You Don't Want My Love" loading="lazy" />
              </div>
              <div className="song-info">
                <div className="song-name">If You Don&apos;t Want My Love</div>
                <div className="song-artist">Jalen Ngonda</div>
              </div>
              <div className="song-playing"><div className="bar" /><div className="bar" /><div className="bar" /></div>
            </a>
          </DraggableCard>

          <DraggableCard className="card col-6 quote-card" index={9}>
            <div className="quote-text font-body">
              &quot;i don&apos;t have much experience, but i&apos;m a <strong>fast learner</strong> —
              and i&apos;ve actually been told so by many people.
              i just want to learn from and work with the best people.&quot;
            </div>
            <div className="quote-attr">— dharmay</div>
            <div className="links-row" style={{ marginTop: 20 }}>
              <a className="link-icon" href="mailto:davedharmay@gmail.com" title="Email">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x={2} y={4} width={20} height={16} rx={2} /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
              <a className="link-icon" href="https://github.com/DocMorphic" target="_blank" rel="noopener noreferrer" title="GitHub">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                </svg>
              </a>
              <a className="link-icon" href="https://www.linkedin.com/in/dharmay-dave/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </DraggableCard>

          <div className="footer-row"><span>© 2026 dharmay dave · munich</span></div>
        </div>
      </div>

      {/* PROJECTS */}
      <div id="view-projects" className={`view ${view === "projects" ? "active" : ""}`}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px 0" }}>
          <button type="button" className="back-btn" onClick={() => showView("home")}>← back</button>
          <div className="page-title">PRO<br />JECTS.</div>
          <div className="proj-list">
            <div className="proj-row" style={{ cursor: "pointer" }} onClick={() => window.open("https://github.com/DocMorphic/lighthouse", "_blank")} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && window.open("https://github.com/DocMorphic/lighthouse", "_blank")}>
              <div>
                <div className="proj-row-name">🗺️ Lighthouse</div>
                <div className="proj-row-desc">Cross-platform mobile nav app using open-source geospatial data. Real-time routing with OpenStreetMap integration and scalable maps.</div>
                <div className="proj-row-tags">
                  <span className="proj-row-tag">React Native</span>
                  <span className="proj-row-tag">Expo</span>
                  <span className="proj-row-tag">OpenStreetMap</span>
                </div>
              </div>
              <div className="proj-row-right">
                <a className="proj-ext-link" href="https://github.com/DocMorphic/lighthouse" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>github ↗</a>
              </div>
            </div>
            <div className="proj-row" style={{ cursor: "pointer" }} onClick={() => window.open("https://hashiii.vercel.app", "_blank")} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && window.open("https://hashiii.vercel.app", "_blank")}>
              <div>
                <div className="proj-row-name">🌉 Hashi</div>
                <div className="proj-row-desc">Web logic puzzle with graph-based bridge validation. Responsive and live on Vercel.</div>
                <div className="proj-row-tags">
                  <span className="proj-row-tag">TypeScript</span>
                  <span className="proj-row-tag">React</span>
                  <span className="proj-row-tag">CSS3</span>
                </div>
              </div>
              <div className="proj-row-right">
                <a className="proj-ext-link" href="https://hashiii.vercel.app" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>live ↗</a>
              </div>
            </div>
            <div className="proj-row">
              <div>
                <div className="proj-row-name">🎮 Framed</div>
                <div className="proj-row-desc">PvP arena fighter with a window-based environmental mechanic. Custom physics and collision, non-traditional arenas built from scratch in Godot.</div>
                <div className="proj-row-tags">
                  <span className="proj-row-tag">GDScript</span>
                  <span className="proj-row-tag">Godot</span>
                  <span className="tag">Blender</span>
                </div>
              </div>
              <div className="proj-row-right">
                <span style={{ fontSize: 11, color: "var(--dim)", fontFamily: "'Syne Mono', monospace" }}>local build</span>
              </div>
            </div>
            <div className="proj-row">
              <div>
                <div className="proj-row-name">🏠 Voice Home Control</div>
                <div className="proj-row-desc">IoT system on Raspberry Pi for hands-free voice control of home appliances with real-time signal processing.</div>
                <div className="proj-row-tags">
                  <span className="proj-row-tag">Python</span>
                  <span className="proj-row-tag">Raspberry Pi</span>
                  <span className="proj-row-tag">GPIO</span>
                </div>
              </div>
              <div className="proj-row-right" />
            </div>
            <div className="proj-row">
              <div>
                <div className="proj-row-name">🤖 AI Health Chatbot</div>
                <div className="proj-row-desc">Built from scratch in Python + NLP. Answers health queries, generates wellness prompts, and suggests medications from symptoms.</div>
                <div className="proj-row-tags">
                  <span className="proj-row-tag">Python</span>
                  <span className="proj-row-tag">NLP</span>
                </div>
              </div>
              <div className="proj-row-right" />
            </div>
          </div>
        </div>
      </div>

      {/* EDUCATION */}
      <div id="view-education" className={`view ${view === "education" ? "active" : ""}`}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px 0" }}>
          <button type="button" className="back-btn" onClick={() => showView("home")}>← back</button>
          <div className="page-title">EDU<br />CATION.</div>
          <div className="proj-list">
            <div className="proj-row no-hover" style={{ cursor: "default" }}>
              <div>
                <div className="proj-row-name">🎓 TU Munich</div>
                <div className="proj-row-desc">
                  <strong>Computer Science (Studienkolleg)</strong><br />
                  <span style={{ color: "var(--dim)" }}>Oct 2025 - Present</span><br />
                  Current coursework includes Advanced Mathematics, Higher Physics, Linear Algebra, Calculus, and Introduction to Programming.
                </div>
              </div>
            </div>
            <div className="proj-row no-hover" style={{ cursor: "default" }}>
              <div>
                <div className="proj-row-name">🏫 S. N. Kansagra School</div>
                <div className="proj-row-desc">
                  <strong>Valedictorian (97% in Class XII)</strong><br />
                  <span style={{ color: "var(--dim)" }}>Jun 2013 - Apr 2025</span><br />
                  Ranked among the top 0.1% in India. Specialized in Advanced Mathematics, Computer Science, and Physics.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EXPERIENCE */}
      <div id="view-experience" className={`view ${view === "experience" ? "active" : ""}`}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px 0" }}>
          <button type="button" className="back-btn" onClick={() => showView("home")}>← back</button>
          <div className="page-title">EXPE<br />RIENCE.</div>
          <div className="proj-list">
            <div className="proj-row no-hover" style={{ cursor: "default" }}>
              <div>
                <div className="proj-row-name">🚀 Sigment AI</div>
                <div className="proj-row-desc">
                  <strong>Software Engineering Intern</strong><br />
                  <span style={{ color: "var(--dim)" }}>Jul &apos;25 - Sep &apos;25</span><br />
                  Contributed to a unified marketplace platform for autonomous AI agents. Simplified integration and deployment for business operations.
                </div>
                <div className="proj-row-tags">
                  <span className="proj-row-tag">AI Agents</span>
                  <span className="proj-row-tag">Platform Eng</span>
                  <span className="proj-row-tag">Marketplace</span>
                </div>
              </div>
              <div className="proj-row-right">
                <span style={{ fontSize: 11, color: "var(--dim)", fontFamily: "'Syne Mono', monospace" }}>internship</span>
              </div>
            </div>
            <div className="proj-row no-hover" style={{ cursor: "default" }}>
              <div>
                <div className="proj-row-name">💻 Freelance Fullstack</div>
                <div className="proj-row-desc">
                  <strong>Engineering &amp; Design</strong><br />
                  <span style={{ color: "var(--dim)" }}>May &apos;25 - Present</span><br />
                  Building responsive, high-speed websites for local startups in India &amp; Germany. Solutions for education and retail sectors.
                </div>
                <div className="proj-row-tags">
                  <span className="proj-row-tag">Next.js</span>
                  <span className="proj-row-tag">React</span>
                  <span className="proj-row-tag">Node.js</span>
                  <span className="proj-row-tag">Java</span>
                </div>
              </div>
              <div className="proj-row-right">
                <span style={{ fontSize: 11, color: "var(--dim)", fontFamily: "'Syne Mono', monospace" }}>freelance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
