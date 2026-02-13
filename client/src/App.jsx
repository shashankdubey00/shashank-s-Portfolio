import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useParams } from "react-router-dom";

const profile = {
  name: "Shashank Dubey",
  role: "Freelance Full Stack MERN Developer",
  intro:
    "I build production-ready web applications with clean frontend experiences and reliable backend systems.",
  github: "https://github.com/shashankdubey00",
  linkedin: "https://www.linkedin.com/in/shashank-dubey-link",
  twitter: "https://x.com/shashankcoding"
};

const projects = [
  {
    name: "Connect Campus",
    stack: "React, Node.js, Express, MongoDB",
    summary:
      "A campus collaboration platform where students can connect, share updates, and discover opportunities in one place.",
    highlights: "Community feed, collaboration workflows, responsive dashboard",
    live: "https://connect-campus-ashen.vercel.app/"
  },
  {
    name: "GV Tutor",
    stack: "React, Node.js, Express, MongoDB",
    summary:
      "An education-focused platform that helps students and parents discover tutoring services with clear program information.",
    highlights: "Structured course presentation, service pages, lead-ready interface",
    live: "https://www.goodwilledu.in/"
  },
  {
    name: "Transparent Digital Governance",
    stack: "React, Node.js, Express, MongoDB",
    summary:
      "A governance transparency project focused on making key public information and digital workflows more accessible.",
    highlights: "Information visibility, process clarity, public-facing usability",
    live: "https://transparent-digital-governance-fmq3.onrender.com/"
  }
];

const journey = [
  {
    version: "Now",
    label: "Freelancing",
    desc: "Currently working as a freelance full stack MERN developer on real client projects."
  },
  {
    version: "Core",
    label: "MERN Stack",
    desc: "Building complete products with MongoDB, Express, React, and Node.js."
  },
  {
    version: "Focus",
    label: "Delivery",
    desc: "Prioritizing scalability, UI quality, and maintainable backend architecture."
  }
];

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

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

function TopBar({ theme, onThemeToggle }) {
  return (
    <header className="topbar">
      <Link to="/" className="brand-link">
        <p className="brand">CONTROL ROOM</p>
      </Link>
      <div className="topbar-actions">
        <nav>
          <NavLink to="/" end>
            Projects
          </NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
        </nav>
        <button
          type="button"
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "Light Theme" : "Dark Theme"}
        </button>
      </div>
    </header>
  );
}

function HomePage() {
  const tech = useMemo(() => ["MongoDB", "Express", "React", "Node.js"], []);

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="tag">{profile.role.toUpperCase()}</p>
          <h1>{profile.name}</h1>
          <p className="subtitle">{profile.intro}</p>
          <div className="tech-row">
            {tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="social-row">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={profile.twitter} target="_blank" rel="noreferrer">
              X / Twitter
            </a>
          </div>
        </div>

        <div className="status-panel">
          <h2>Current Profile</h2>
          <div className="grid">
            <article>
              <p>Name</p>
              <strong>{profile.name}</strong>
            </article>
            <article>
              <p>Current Work</p>
              <strong>Freelancing</strong>
            </article>
            <article>
              <p>Specialization</p>
              <strong>MERN Full Stack</strong>
            </article>
            <article>
              <p>Live Projects</p>
              <strong>5</strong>
            </article>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <h2>Live Project Showcase</h2>
        <div className="cards">
          {projects.map((project) => (
            <article key={project.name} className="card">
              <p className="state">Live</p>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <p className="stack">{project.stack}</p>
              <strong>{project.highlights}</strong>
              <a className="project-link" href={project.live} target="_blank" rel="noreferrer">
                View Live Project
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section">
        <h2>About & Journey</h2>
        <div className="timeline">
          {journey.map((item) => (
            <article key={item.version + item.label}>
              <p>{item.version}</p>
              <h3>{item.label}</h3>
              <span>{item.desc}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section terminal">
        <h2>Contact</h2>
        <p>Reach out through any of these profiles:</p>
        <code>GitHub: {profile.github}</code>
        <code>LinkedIn: {profile.linkedin}</code>
        <code>X/Twitter: {profile.twitter}</code>
      </section>
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
    <main>
      <section className="section">
        <div className="blog-page-head">
          <h1>Blogs</h1>
        </div>
        <p className="subtitle">Read all published blogs.</p>

        {status ? <p className="blog-status">{status}</p> : null}

        <div className="blog-list solo-list">
          {blogs.length === 0 ? (
            <article className="blog-card">
              <h3>No blogs yet</h3>
              <p>Check back soon for new posts.</p>
            </article>
          ) : (
            blogs.map((blog) => (
              <article className="blog-card" key={blog.id}>
                <p className="blog-date">Posted: {formatDateTime(blog.createdAt)}</p>
                <p className="blog-date">Updated: {formatDateTime(blog.updatedAt || blog.createdAt)}</p>
                <h3>{blog.title}</h3>
                {blog.summary ? <p>{blog.summary}</p> : null}
                <Link className="project-link" to={`/blogs/${blog.id}`}>
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
    <main>
      <section className="section">
        <Link to="/blogs" className="project-link">
          Back to Blogs
        </Link>

        {status ? <p className="blog-status">{status}</p> : null}

        {blog ? (
          <article className="blog-card blog-detail">
            <p className="blog-date">Posted: {formatDateTime(blog.createdAt)}</p>
            <p className="blog-date">Updated: {formatDateTime(blog.updatedAt || blog.createdAt)}</p>
            <h1>{blog.title}</h1>
            {blog.summary ? <p className="summary">{blog.summary}</p> : null}
            <p className="content">{blog.content}</p>
            {blog.tags?.length ? (
              <div className="blog-tags">
                {blog.tags.map((tag) => (
                  <span key={`${blog.id}-${tag}`}>{tag}</span>
                ))}
              </div>
            ) : null}
          </article>
        ) : null}
      </section>
    </main>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="space-bg" aria-hidden="true">
        <div className="stars stars-sm" />
        <div className="stars stars-md" />
        <div className="stars stars-lg" />
      </div>
      <div className="app-shell">
        <TopBar theme={theme} onThemeToggle={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
