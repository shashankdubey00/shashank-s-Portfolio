import { useEffect, useMemo, useRef, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import TechRadar from "./TechRadar";

const profile = {
  name: "Shashank Dubey",
  role: "Freelance Full Stack MERN Developer",
  intro:
    "I build production-ready web applications with clean frontend experiences and reliable backend systems.",
  github: "https://github.com/shashankdubey00",
  linkedin: "https://www.linkedin.com/in/shashank-dubey-link",
  twitter: "https://x.com/shashankcoding",
  email: "dubeyshashank444@gmail.com",
  location: "India"
};

const projects = [
  {
    name: "Connect Campus",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    summary:
      "A campus collaboration platform where students can connect, share updates, and discover opportunities in one place.",
    highlights: "Community feed, collaboration workflows, responsive dashboard",
    live: "https://connect-campus-ashen.vercel.app/",
    source: profile.github
  },
  {
    name: "GV Tutor",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    summary:
      "An education-focused platform that helps students and parents discover tutoring services with clear program information.",
    highlights: "Structured course presentation, service pages, lead-ready interface",
    live: "https://www.goodwilledu.in/",
    source: profile.github
  },
  {
    name: "Transparent Digital Governance",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    summary:
      "A governance transparency project focused on making key public information and digital workflows more accessible.",
    highlights: "Information visibility, process clarity, public-facing usability",
    live: "https://transparent-digital-governance-fmq3.onrender.com/",
    source: profile.github
  },
  {
    name: "Portfolio System Console",
    stack: ["React", "Tailwind", "Node.js", "MongoDB"],
    summary: "Additional deployed work slot from existing portfolio timeline.",
    highlights: "Project data sync pending",
    live: "#",
    source: profile.github,
    placeholder: true
  },
  {
    name: "Realtime Collaboration Workspace",
    stack: ["React", "Express", "Socket.io", "MongoDB"],
    summary: "Additional deployed work slot from existing portfolio timeline.",
    highlights: "Project data sync pending",
    live: "#",
    source: profile.github,
    placeholder: true
  }
];

const skills = [
  {
    title: "Frontend",
    color: "cyan",
    icon: "🖥",
    items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "JavaScript (ES6+)"]
  },
  {
    title: "Backend",
    color: "green",
    icon: "🧩",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Socket.io"]
  },
  {
    title: "Database",
    color: "yellow",
    icon: "🗄",
    items: ["MongoDB", "Mongoose", "Redis (basic)", "Firebase"]
  },
  {
    title: "Tools & DevOps",
    color: "purple",
    icon: "⌘",
    items: ["Git", "GitHub", "Vercel", "Render", "Postman", "VS Code"]
  }
];

const processSteps = [
  {
    id: "01 / Plan",
    tone: "yellow",
    icon: "📋",
    title: "Understand & Architect",
    body: "I start by breaking down requirements, planning the data models, API structure, and component hierarchy before writing a single line of code."
  },
  {
    id: "02 / Build",
    tone: "cyan",
    icon: "⚡",
    title: "Build Clean & Fast",
    body: "Full stack development with clean code practices - reusable components, RESTful APIs, and proper error handling throughout."
  },
  {
    id: "03 / Deploy",
    tone: "green",
    icon: "🚀",
    title: "Ship & Support",
    body: "Production deployment on Vercel/Render with environment configs, testing, and post-launch support to ensure everything runs smoothly."
  }
];

const journeyCards = [
  ["$ current_role", "Freelancing"],
  ["$ tech_stack", "MERN Full Stack"],
  ["$ priority", "Delivery & Scalability"],
  ["$ next_chapter", "AI Integration + Systems"]
];

const navItems = [
  { id: "projects", label: "/work" },
  { id: "skills", label: "/skills" },
  { id: "about", label: "/whoami" },
  { id: "contact", label: "/ping" }
];

const defaultApiBase = import.meta.env.DEV ? "http://localhost:5000" : "https://shashanks-portfolio-api.onrender.com";
const API_BASE = (import.meta.env.VITE_API_BASE_URL || defaultApiBase).replace(/\/$/, "");
const CONTACT_WEBHOOK_URL = (import.meta.env.VITE_CONTACT_WEBHOOK_URL || "").trim();
const HERO_LABEL = "FREELANCE FULL STACK MERN DEVELOPER";

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function useSectionSpy(ids) {
  const [activeSection, setActiveSection] = useState(ids[0]);

  useEffect(() => {
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      { threshold: [0.35, 0.55, 0.8], rootMargin: "-90px 0px -35% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids]);

  return activeSection;
}

function formatDateTime(value) {
  const date = new Date(value);
  return date.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function SlashLabel({ value }) {
  return (
    <span>
      <span className="slash">/</span>
      {value.slice(1)}
    </span>
  );
}

function Navbar({ theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const activeSection = useSectionSpy(navItems.map((item) => item.id));

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const handleMobileThemeToggle = () => {
    onThemeToggle();
    setMenuOpen(false);
  };

  const resumeActive = location.pathname === "/resume";

  return (
    <header className="navbar-wrap">
      <div className="navbar">
        <Link to="/" className="brand-link">
          <p className="brand">CONTROL ROOM</p>
        </Link>

        <div className="nav-desktop">
          {navItems.map((item) => {
            const isActive = location.pathname === "/" && activeSection === item.id;
            return (
              <a key={item.id} href={`#${item.id}`} className={`nav-link ${isActive ? "active" : ""}`}>
                <SlashLabel value={item.label} />
              </a>
            );
          })}
          <NavLink to="/resume" className={`nav-link ${resumeActive ? "active" : ""}`}>
            <SlashLabel value="/resume" />
          </NavLink>
          <button type="button" className="theme-icon-btn" onClick={onThemeToggle} aria-label="Toggle theme">
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>

        <button
          type="button"
          className="menu-btn"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}>
        <div className="mobile-links" onClick={(event) => event.stopPropagation()}>
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="mobile-link"
              style={{ transitionDelay: `${80 * index}ms` }}
              onClick={() => setMenuOpen(false)}
            >
              <SlashLabel value={item.label} />
            </a>
          ))}
          <Link
            to="/resume"
            className="mobile-link"
            style={{ transitionDelay: `${80 * navItems.length}ms` }}
            onClick={() => setMenuOpen(false)}
          >
            <SlashLabel value="/resume" />
          </Link>
          <button
            type="button"
            className="mobile-theme"
            style={{ transitionDelay: `${80 * (navItems.length + 1)}ms` }}
            onClick={handleMobileThemeToggle}
          >
            {theme === "dark" ? "☀ Light Mode" : "☾ Dark Mode"}
          </button>
        </div>
      </div>
      <div className="nav-line" />
    </header>
  );
}

function HomePage() {
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [projectCount, setProjectCount] = useState(0);
  const [profileImageError, setProfileImageError] = useState(false);
  const [statusRef, statusVisible] = useReveal(0.4);
  const [mouseShift, setMouseShift] = useState({ x: 0, y: 0 });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);
  const [copyState, setCopyState] = useState("");

  useEffect(() => {
    let idx = 0;
    const timer = setInterval(() => {
      idx += 1;
      setTyped(HERO_LABEL.slice(0, idx));
      if (idx >= HERO_LABEL.length) {
        clearInterval(timer);
        setTypingDone(true);
      }
    }, 40);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!statusVisible) return undefined;

    let raf;
    const start = performance.now();
    const duration = 800;

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setProjectCount(Math.round(eased * 5));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [statusVisible]);

  useEffect(() => {
    if (!copyState) return undefined;
    const timer = setTimeout(() => setCopyState(""), 2000);
    return () => clearTimeout(timer);
  }, [copyState]);

  const particleSet = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: ((i * 29) % 100) + 1,
        y: ((i * 41) % 100) + 1,
        size: i % 3 === 0 ? 4 : 2,
        speed: (i % 5) + 1
      })),
    []
  );

  const contactLinks = [
    { key: "github", label: "GitHub", value: profile.github, href: profile.github, icon: "◉" },
    { key: "linkedin", label: "LinkedIn", value: profile.linkedin, href: profile.linkedin, icon: "◉" },
    { key: "twitter", label: "X / Twitter", value: profile.twitter, href: profile.twitter, icon: "◉" },
    {
      key: "email",
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: "◉"
    }
  ];

  const handleCopy = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState(key);
    } catch {
      setCopyState(key);
    }
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    if (sending) return;

    if (!CONTACT_WEBHOOK_URL) {
      setContactStatus({
        type: "error",
        text: "Contact form is not configured yet. Add VITE_CONTACT_WEBHOOK_URL in frontend environment variables."
      });
      return;
    }

    setSending(true);
    setContactStatus({ type: "", text: "" });

    const payload = {
      ...contactForm,
      source: "portfolio-control-room",
      submittedAt: new Date().toISOString()
    };

    const retryDelays = [0, 4000, 6000];
    let lastError = null;

    for (let attempt = 0; attempt < retryDelays.length; attempt += 1) {
      if (retryDelays[attempt] > 0) {
        setContactStatus({
          type: "info",
          text: `Waking service and retrying (${attempt + 1}/${retryDelays.length})...`
        });
        await sleep(retryDelays[attempt]);
      }

      try {
        const response = await fetch(CONTACT_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "content-type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(payload)
        });

        setContactForm({ name: "", email: "", message: "" });
        setContactStatus({ type: "success", text: "Message sent successfully. I will get back to you soon." });
        setSending(false);
        return;
      } catch (error) {
        lastError = error;
      }
    }

    setContactStatus({
      type: "error",
      text: "Could not send right now. Please try again in a minute or email me directly at dubeyshashank444@gmail.com."
    });
    setSending(false);
    console.error("Contact submit failed:", lastError);
  };

  return (
    <main>
      <section
        className="hero"
        onMouseMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
          setMouseShift({ x, y });
        }}
      >
        <div className="hero-radial" aria-hidden="true" />
        <div className="hero-particles" aria-hidden="true">
          {particleSet.map((particle) => (
            <span
              key={particle.id}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                transform: `translate(${mouseShift.x * particle.speed * 1.5}px, ${mouseShift.y * particle.speed * 1.5}px)`
              }}
            />
          ))}
        </div>

        <div className="hero-grid">
          <div className="hero-left">
            <p className="hero-label">
              {typed}
              {typingDone ? <span className="typing-cursor">▋</span> : null}
            </p>

            {!profileImageError ? (
              <div className="profile-photo-wrap">
                <img
                  src="/assets/profile.jpg"
                  alt="Shashank Dubey"
                  className="profile-photo"
                  onError={() => setProfileImageError(true)}
                />
                <span className="online-dot" aria-hidden="true" />
              </div>
            ) : (
              <div className="profile-photo-placeholder">Add photo to /public/assets/profile.jpg</div>
            )}

            <h1 className={`hero-name ${typingDone ? "show" : ""}`}>{profile.name}</h1>
            <p className={`hero-tagline ${typingDone ? "show" : ""}`}>{profile.intro}</p>

            <div className="pill-row">
              {["MongoDB", "Express", "React", "Node.js"].map((item) => (
                <span key={item} className="tech-pill">
                  <span className="pill-prefix">&gt;</span> {item}
                </span>
              ))}
            </div>

            <div className="cta-row">
              <a href="#projects" className="btn btn-primary">
                View My Work ↓
              </a>
              <Link to="/resume" className="btn btn-primary">
                Download Resume
              </Link>
              <a className="btn btn-icon pulse-ring" href={profile.github} target="_blank" rel="noreferrer">
                GH
              </a>
            </div>

            <div className="social-links-row">
              <a href={profile.github} target="_blank" rel="noreferrer">
                <span className="live-dot" /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <span className="live-dot" /> LinkedIn
              </a>
              <a href={profile.twitter} target="_blank" rel="noreferrer">
                <span className="live-dot" /> X/Twitter
              </a>
            </div>
          </div>

          <div className="hero-mid">
            <TechRadar />
          </div>

          <div className="hero-right" ref={statusRef}>
            <article className="status-card card-base">
              <div className="status-head">
                <h2>System Status</h2>
                <span className="status-live">
                  <span className="live-dot" /> live
                </span>
              </div>

              <div className="status-grid">
                <div>
                  <p>Name</p>
                  <strong>Shashank Dubey</strong>
                </div>
                <div>
                  <p>Current Work</p>
                  <strong>Freelancing</strong>
                </div>
                <div>
                  <p>Specialization</p>
                  <strong>MERN Full Stack</strong>
                </div>
                <div>
                  <p>Live Projects</p>
                  <strong>{projectCount}</strong>
                </div>
                <div>
                  <p>Experience</p>
                  <strong>2+ Years</strong>
                </div>
                <div>
                  <p>Status</p>
                  <strong className="text-green">🟢 Open to Work</strong>
                </div>
              </div>

              <div className="status-foot">🕐 Response time: within 24hrs</div>
            </article>
          </div>
        </div>
      </section>

      <section id="skills" className="section-block">
        <p className="section-label">$ skills --list</p>
        <div className="skills-grid">
          {skills.map((group, index) => (
            <RevealCard key={group.title} index={index} className="card-base skill-card">
              <p className={`skill-icon ${group.color}`}>{group.icon}</p>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <span>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </RevealCard>
          ))}
        </div>
      </section>

      <section id="projects" className="section-block">
        <div className="section-head-row">
          <p className="section-title-with-dot">
            <span className="live-dot" /> Live Project Showcase
          </p>
          <span className="pill-badge">5 Projects Deployed</span>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <RevealCard key={project.name} index={index} className="card-base project-card" delayStep={100}>
              <p className="live-badge">
                <span className="sonar-wrap">
                  <span className="sonar-dot" />
                  <span className="sonar-ripple" />
                </span>
                Live
              </p>
              <h3>{project.name}</h3>
              <p className="project-summary">{project.summary}</p>
              <div className="pill-row compact">
                {project.stack.map((tech) => (
                  <span key={`${project.name}-${tech}`} className="tech-pill">
                    <span className="pill-prefix">&gt;</span> {tech}
                  </span>
                ))}
              </div>
              <p className="project-feature">
                <strong>Key features:</strong> {project.highlights}
              </p>
              {project.placeholder ? <p className="project-placeholder-note">Project link will be updated from your source data.</p> : null}
              <div className="project-actions">
                <a
                  className="btn btn-primary"
                  href={project.live}
                  target={project.live === "#" ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-disabled={project.live === "#"}
                >
                  Launch →
                </a>
                <a href={project.source} target="_blank" rel="noreferrer" className="mini-icon-link" aria-label="GitHub source">
                  GH
                </a>
              </div>
            </RevealCard>
          ))}
        </div>
      </section>

      <section id="process" className="section-block">
        <p className="section-label">$ process --view</p>
        <h2 className="section-subtitle">From idea to deployed product - here&apos;s my approach</h2>
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <RevealCard key={step.id} index={index} className="card-base process-card" delayStep={150}>
              <p className="process-icon">{step.icon}</p>
              <p className={`process-id ${step.tone}`}>{step.id}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </RevealCard>
          ))}
        </div>
      </section>

      <section id="about" className="section-block about-grid">
        <div>
          <p className="section-label">$ whoami</p>
          <article className="card-base about-main">
            <p>
              I&apos;m Shashank Dubey, a freelance full stack MERN developer based in India. I started with curiosity about how websites actually work under the hood - that curiosity turned into building real products for real clients. I care deeply about clean code, scalable architecture, and interfaces that actually feel good to use.
            </p>
            <div className="about-facts">
              <p>📍 Based in: India</p>
              <p>💼 Available for: Freelance projects</p>
              <p>🕐 Timezone: IST (UTC+5:30)</p>
              <p>🌐 Languages: Hindi, English</p>
            </div>
          </article>
        </div>
        <div className="journey-stack">
          {journeyCards.map(([key, value], index) => (
            <RevealCard key={key} index={index} className="card-base journey-card from-right" delayStep={120}>
              <p>{key}</p>
              <strong>{value}</strong>
            </RevealCard>
          ))}
        </div>
      </section>

      <section id="contact" className="section-block contact-grid-wrap">
        <p className="section-label">&gt; /ping shashank</p>
        <div className="availability-pill">🟢 Currently open to 1-2 new projects · Response within 24hrs</div>

        <div className="contact-grid">
          <article className="card-base contact-form-card">
            <h3>Let&apos;s Build Something</h3>
            <p>
              Have a project in mind? Whether it&apos;s a full product from scratch or improving an existing system - let&apos;s talk.
            </p>

            <form onSubmit={handleContactSubmit}>
              <input
                required
                placeholder="Name"
                value={contactForm.name}
                onChange={(event) => setContactForm((prev) => ({ ...prev, name: event.target.value }))}
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={(event) => setContactForm((prev) => ({ ...prev, email: event.target.value }))}
              />
              <textarea
                required
                placeholder="Message"
                rows={5}
                value={contactForm.message}
                onChange={(event) => setContactForm((prev) => ({ ...prev, message: event.target.value }))}
              />
              <button type="submit" className="btn btn-primary full-width" disabled={sending}>
                {sending ? "Sending..." : "Send Message ->"}
              </button>
              {contactStatus.text ? (
                <p
                  className={
                    contactStatus.type === "error"
                      ? "form-error"
                      : contactStatus.type === "info"
                        ? "form-info"
                        : "form-success"
                  }
                >
                  {contactStatus.text}
                </p>
              ) : null}
            </form>
          </article>

          <div className="contact-links-col">
            {contactLinks.map((item) => (
              <article key={item.key} className="card-base contact-link-card">
                <a href={item.href} target={item.key === "email" ? undefined : "_blank"} rel="noreferrer">
                  <span className="contact-left">
                    <span className="contact-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  <span className="contact-value">{item.value}</span>
                </a>
                <button type="button" onClick={() => handleCopy(item.value, item.key)} aria-label={`Copy ${item.label}`}>
                  {copyState === item.key ? "✓ Copied!" : "⧉"}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-line" />
        <div className="footer-row">
          <p>© 2026 Shashank Dubey - Built with curiosity and intent.</p>
          <p className="footer-center">CONTROL ROOM</p>
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GH
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              IN
            </a>
            <a href={profile.twitter} target="_blank" rel="noreferrer">
              X
            </a>
          </div>
        </div>
        <p className="footer-bottom">Feeling curious? Try /terminal</p>
      </footer>
    </main>
  );
}

function RevealCard({ children, className, delayStep = 100, index = 0 }) {
  const [ref, visible] = useReveal(0.2);

  return (
    <article
      ref={ref}
      className={`${className} reveal ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * delayStep}ms` }}
    >
      {children}
    </article>
  );
}

function ResumePage() {
  const navigate = useNavigate();
  const RESUME_PATH = "/assets/resume.pdf";

  const onDownload = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(RESUME_PATH, { method: "HEAD", cache: "no-store" });
      const contentType = (response.headers.get("content-type") || "").toLowerCase();
      const isPdf = contentType.includes("application/pdf");
      if (!response.ok || !isPdf) {
        alert("Resume PDF not found. Add file to /public/assets/resume.pdf");
        return;
      }
      window.open(RESUME_PATH, "_blank", "noopener,noreferrer");
    } catch {
      alert("Resume PDF not found. Add file to /public/assets/resume.pdf");
    }
  };

  return (
    <main className="resume-page">
      <div className="resume-topbar no-print">
        <button type="button" className="link-button" onClick={() => navigate("/")}>
          ← Back to Portfolio
        </button>
        <button type="button" className="btn btn-primary" onClick={onDownload}>
          ⬇ Download PDF
        </button>
      </div>

      <div className="resume-sheet">
        <header className="resume-header">
          <h1>Shashank Dubey</h1>
          <p>Full Stack MERN Developer</p>
          <div className="resume-contact">
            <span>{profile.github}</span>
            <span>·</span>
            <span>{profile.linkedin}</span>
            <span>·</span>
            <span>{profile.email}</span>
            <span>·</span>
            <span>India</span>
          </div>
        </header>

        <ResumeSection title="SKILLS">
          <p>
            <strong>Frontend:</strong> React.js, JavaScript, HTML5, CSS3, Tailwind CSS
          </p>
          <p>
            <strong>Backend:</strong> Node.js, Express.js, REST APIs, JWT, Socket.io
          </p>
          <p>
            <strong>Database:</strong> MongoDB, Mongoose, Firebase
          </p>
          <p>
            <strong>Tools:</strong> Git, GitHub, Vercel, Render, Postman
          </p>
        </ResumeSection>

        <ResumeSection title="PROJECTS">
          {projects.map((project) => (
            <article key={project.name} className="resume-project">
              <p className="resume-project-head">
                <strong>{project.name}</strong> <span className="text-green">● Live</span>
              </p>
              <p>{project.summary}</p>
              <div className="resume-tags">
                {project.stack.map((tech) => (
                  <span key={`${project.name}-${tech}`}>{tech}</span>
                ))}
              </div>
              <p>
                <a href={project.live} target="_blank" rel="noreferrer">
                  View Live →
                </a>
              </p>
            </article>
          ))}
        </ResumeSection>

        <ResumeSection title="EXPERIENCE">
          <p>
            <strong>Freelance Full Stack Developer | Self-Employed | 2023 - Present</strong>
          </p>
          <p>• Built and deployed 5+ full stack web applications for clients</p>
          <p>• Delivered production-ready MERN stack projects end-to-end</p>
          <p>• Focused on clean UI, scalable APIs, and reliable deployments</p>
        </ResumeSection>

        <ResumeSection title="EDUCATION">
          <p>Education details: add your latest degree, institution, and graduation year.</p>
        </ResumeSection>

        <ResumeSection title="ABOUT">
          <p>
            I&apos;m Shashank Dubey, a freelance full stack MERN developer based in India. I care deeply about clean code,
            scalable architecture, and interfaces that feel great to use.
          </p>
        </ResumeSection>
      </div>
    </main>
  );
}

function ResumeSection({ title, children }) {
  return (
    <section className="resume-section">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function TerminalPage() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState([
    { text: "Shashank Dubey's Terminal v1.0" },
    { text: "Type 'help' to see available commands." },
    { text: "" }
  ]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const appendLines = (newLines) => setLines((prev) => [...prev, ...newLines]);

  const runCommand = (raw) => {
    const cmd = raw.trim();
    if (!cmd) {
      appendLines([{ text: "" }]);
      return;
    }

    const low = cmd.toLowerCase();

    if (low === "help") {
      appendLines([
        { text: "help      -> list available commands" },
        { text: "whoami    -> print developer bio" },
        { text: "ls        -> list directories" },
        { text: "ls projects -> list all projects + urls" },
        { text: "skills    -> print tech stack tree" },
        { text: "contact   -> print contact links" },
        { text: "resume    -> open resume page" },
        { text: "clear     -> clear terminal output" },
        { text: "exit      -> go home" },
        { text: "cd /      -> go home" }
      ]);
      return;
    }

    if (low === "whoami") {
      appendLines([
        {
          text: "I'm Shashank Dubey, a freelance full stack MERN developer focused on clean interfaces, robust APIs, and production-ready delivery."
        }
      ]);
      return;
    }

    if (low === "ls") {
      appendLines([{ text: "projects/  skills/  contact/  resume/" }]);
      return;
    }

    if (low === "ls projects") {
      appendLines(
        projects.map((project) => ({ text: `${project.name} -> ${project.live === "#" ? "URL pending" : project.live}` }))
      );
      return;
    }

    if (low === "skills") {
      appendLines([
        { text: "skills" },
        { text: "├─ frontend" },
        { text: "│  ├─ React.js" },
        { text: "│  ├─ Tailwind CSS" },
        { text: "│  └─ JavaScript (ES6+)" },
        { text: "├─ backend" },
        { text: "│  ├─ Node.js" },
        { text: "│  ├─ Express.js" },
        { text: "│  └─ Socket.io" },
        { text: "└─ database" },
        { text: "   ├─ MongoDB" },
        { text: "   ├─ Mongoose" },
        { text: "   └─ Firebase" }
      ]);
      return;
    }

    if (low === "contact") {
      appendLines([
        { text: `GitHub: ${profile.github}`, href: profile.github },
        { text: `LinkedIn: ${profile.linkedin}`, href: profile.linkedin },
        { text: `X: ${profile.twitter}`, href: profile.twitter },
        { text: `Email: ${profile.email}`, href: `mailto:${profile.email}` }
      ]);
      return;
    }

    if (low === "resume") {
      appendLines([{ text: "Opening resume..." }]);
      setTimeout(() => navigate("/resume"), 500);
      return;
    }

    if (low === "clear") {
      setLines([]);
      return;
    }

    if (low === "exit" || low === "cd /") {
      appendLines([{ text: "Redirecting to home..." }]);
      setTimeout(() => navigate("/"), 500);
      return;
    }

    appendLines([{ text: `bash: ${cmd}: command not found. Type 'help'.` }]);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    appendLines([{ text: `visitor@shashank:~$ ${input}` }]);
    setHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);
    runCommand(input);
    setInput("");
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHistoryIndex((prev) => {
        const next = prev < 0 ? history.length - 1 : Math.max(prev - 1, 0);
        setInput(history[next] || "");
        return next;
      });
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHistoryIndex((prev) => {
        if (prev < 0) return -1;
        const next = prev + 1;
        if (next >= history.length) {
          setInput("");
          return -1;
        }
        setInput(history[next] || "");
        return next;
      });
    }
  };

  return (
    <main className="terminal-page" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-screen">
        {lines.map((line, index) =>
          line.href ? (
            <p key={`${line.text}-${index}`}>
              <a href={line.href} target={line.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer">
                {line.text}
              </a>
            </p>
          ) : (
            <p key={`${line.text}-${index}`}>{line.text}</p>
          )
        )}

        <form onSubmit={onSubmit} className="terminal-input-row">
          <label htmlFor="terminal-input">visitor@shashank:~$ </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </main>
  );
}

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs`);
        if (!res.ok) {
          setStatus("Could not load blogs.");
          return;
        }

        const data = await res.json();
        setBlogs(data);
      } catch {
        setStatus("Blog service is currently unavailable.");
      }
    };

    loadBlogs();
  }, []);

  return (
    <main className="utility-page">
      <section className="section-block">
        <h1>Blogs</h1>
        <p>Read all published blogs.</p>
        {status ? <p>{status}</p> : null}

        <div className="projects-grid">
          {blogs.length === 0 ? (
            <article className="card-base project-card">
              <h3>No blogs yet</h3>
              <p>Check back soon for new posts.</p>
            </article>
          ) : (
            blogs.map((blog) => (
              <article className="card-base project-card" key={blog.id}>
                <p>Posted: {formatDateTime(blog.createdAt)}</p>
                <p>Updated: {formatDateTime(blog.updatedAt || blog.createdAt)}</p>
                <h3>{blog.title}</h3>
                {blog.summary ? <p>{blog.summary}</p> : null}
                <Link className="btn btn-primary" to={`/blogs/${blog.id}`}>
                  Open Blog Details
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [status, setStatus] = useState("Loading blog...");

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs/${id}`);
        if (!res.ok) {
          setStatus("Blog not found.");
          return;
        }

        const data = await res.json();
        setBlog(data);
        setStatus("");
      } catch {
        setStatus("Blog service is currently unavailable.");
      }
    };

    loadBlog();
  }, [id]);

  return (
    <main className="utility-page">
      <section className="section-block">
        <Link to="/blogs" className="btn btn-primary">
          Back to Blogs
        </Link>

        {status ? <p>{status}</p> : null}

        {blog ? (
          <article className="card-base project-card">
            <p>Posted: {formatDateTime(blog.createdAt)}</p>
            <p>Updated: {formatDateTime(blog.updatedAt || blog.createdAt)}</p>
            <h1>{blog.title}</h1>
            {blog.summary ? <p>{blog.summary}</p> : null}
            <p>{blog.content}</p>
            {blog.tags?.length ? (
              <div className="pill-row compact">
                {blog.tags.map((tag) => (
                  <span key={`${blog.id}-${tag}`} className="tech-pill">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ) : null}
      </section>
    </main>
  );
}

function AppLayout({ theme, toggleTheme }) {
  const location = useLocation();
  const isTerminal = location.pathname === "/terminal";
  const isResume = location.pathname === "/resume";

  return (
    <>
      {!isTerminal && !isResume ? <Navbar theme={theme} onThemeToggle={toggleTheme} /> : null}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/terminal" element={<TerminalPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogDetailsPage />} />
      </Routes>
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <AppLayout theme={theme} toggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))} />
      </div>
    </BrowserRouter>
  );
}

export default App;

