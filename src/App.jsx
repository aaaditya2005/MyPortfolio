import { useEffect, useMemo, useState } from "react";
import localPortfolioData from "../data/portfolio.json";
import {
  ArrowDownToLine,
  ExternalLink,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  X
} from "lucide-react";
import { StackIcon } from "./iconMap.jsx";


const navItems = [
  ["Home", "home"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Education", "education"],
  ["Achievements", "achievements"],
  ["Contact", "contact"]
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [activeSkill, setActiveSkill] = useState(0);
  const [activeEducation, setActiveEducation] = useState(0);
  const [personalOpen, setPersonalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((response) => response.json())
      .then(setPortfolio)
      .catch(() => setPortfolio(null));
  }, []);

  const currentSkill = useMemo(() => {
    return portfolio?.skills.technical[activeSkill] || null;
  }, [activeSkill, portfolio]);

  if (!portfolio) {
    return (
      <main className="loading-screen">
        <div className="loading-mark">A</div>
        <p>Loading portfolio...</p>
      </main>
    );
  }

  const { profile, personal, skills, projects, experience, education, achievements } = portfolio;

  return (
    <>
      <header className="site-header">
       <a className="brand" href="#home" aria-label="Go to home">
        <img src={profile.image} alt={profile.name} className="brand-img" />
        {profile.name}
      </a>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                scrollToId(id);
                setMenuOpen(false);
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button className="about-button" type="button" onClick={() => setPersonalOpen(true)}>
            More About Me
          </button>
          <button
            className="menu-button"
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow">{profile.role}</p>
           <h1>
            <span className="greeting-line">Hi!👋 I'm</span>
            <span className="name-line">{profile.name}</span>
          </h1>

            <p className="hero-headline">{profile.headline}</p>
            <p className="hero-summary">{profile.summary}</p>
            <div className="hero-actions">
              <button type="button" onClick={() => scrollToId("projects")}>
                View Projects
              </button>
              <a href={`mailto:${profile.email}`}>
                <Mail size={18} />
                Contact
              </a>
            </div>
          </div>
          <div className="hero-visual" aria-label={`${profile.name} profile image`}>
            <img src={profile.image} alt={`${profile.name} profile placeholder`} />
          </div>
        </section>

        <section id="skills" className="section-shell">
          <SectionHeader
            kicker="Skills"
            title="Technical Skills"
            text="My technologies and tools."
          />

          {skills.technical[0] && (
            <div className="skill-detail">
              {/* <div>
                <p className="eyebrow">{skills.technical[0].category}</p>
                <h3>{skills.technical[0].description}</h3>
              </div> */}
              <div className="logo-grid">
                {skills.technical[0].items.map((item) => (
                  <article className="logo-tile" key={item.name}>
                    <StackIcon name={item.icon} className="stack-logo" />
                    <span>{item.name}</span>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="non-tech-block">
            <SectionHeader
              kicker="Skills"
              title="Non Technical Skills"
              text="Personal skills that support teamwork, leadership, and consistent growth."
            />
            <div className="logo-grid non-tech-grid">
              {skills.nonTechnical.map((item) => (
                <article className="logo-tile" key={item.name}>
                  <StackIcon name={item.icon} className="stack-logo" />
                  <span>{item.name}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-shell">
          <SectionHeader
            kicker="Work"
            title="Projects"
            text="Here are few projects that I built"
          />
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-strip" key={project.title}>
                <ProjectMockup image={project.image} tone={project.imageTone} title={project.title} />
                <div className="project-content">
                  <p className="eyebrow">{project.type}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-pills">
                    {project.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Github size={18} />
                      GitHub
                    </a>
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <ExternalLink size={18} />
                      Live Website
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section-shell">
  <SectionHeader
    kicker="Journey"
    title="Experience"
    text="Below is my work across professional internships, freelance projects, and college clubs"
  />
  <div className="experience-grid">
    {experience.map((item) => (
      <article className="experience-card" key={`${item.title}-${item.period}`}>
        <div className="experience-title">
          <span>{item.period}</span>
          <h3>{item.title}</h3>
          <p>{item.place}</p>
        </div>
        {/* ADD THE STYLE ATTRIBUTE HERE */}
        <p style={{ whiteSpace: "pre-line" }}>{item.description}</p>
        <a href={item.projectLink} target="_blank" rel="noreferrer">
          <ExternalLink size={18} />
          Related Link
        </a>
      </article>
    ))}
  </div>
</section>


        <section id="education" className="section-shell education-section">
          <SectionHeader
            kicker="Education"
            title="Focused Timeline"
            text="Select one milestone at a time to bring it into focus."
          />
          <div className="education-layout">
            <div className="timeline" role="tablist" aria-label="Education timeline">
              {education.map((item, index) => (
                <button
                  className={activeEducation === index ? "active" : ""}
                  key={item.title}
                  type="button"
                  onClick={() => setActiveEducation(index)}
                  role="tab"
                >
                  <span className="timeline-dot" />
                  <span>{item.title}</span>
                  <small>{item.period}</small>
                </button>
              ))}
            </div>
            <article className="education-focus">
              <GraduationCap size={34} />
              <p className="eyebrow">{education[activeEducation].status}</p>
              <h3>{education[activeEducation].title}</h3>
              <dl>
                <div>
                  <dt>School / College</dt>
                  <dd>{education[activeEducation].institution}</dd>
                </div>
                <div>
                  <dt>Board / University</dt>
                  <dd>{education[activeEducation].board}</dd>
                </div>
                <div>
                  <dt>Year</dt>
                  <dd>{education[activeEducation].period}</dd>
                </div>
                <div>
                  <dt>Result</dt>
                  <dd>{education[activeEducation].score}</dd>
                </div>
              </dl>
            </article>
          </div>
        </section>

        <section id="achievements" className="section-shell">
          <SectionHeader
            kicker="Milestones"
            title="Achievements and Certifications"
            text="Below are some achievements and certifications"
          />
          <div className="achievement-row">
            {achievements.map((item) => (
              <article className="achievement-card" key={`${item.title}-${item.period}`}>
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href={item.proof} target="_blank" rel="noreferrer">
                  <ExternalLink size={18} />
                 Related Link
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let us build something useful.</h2>
        </div>
        <address>
          <a href={`mailto:${profile.email}`}>
            <Mail size={18} />
            {profile.email}
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
            <Phone size={18} />
            {profile.phone}
          </a>
          <span>
            <MapPin size={18} />
            {profile.location}
          </span>
        </address>
        <div className="footer-socials">
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href={profile.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={20} />
          </a>
        </div>
      </footer>

      <div className="floating-actions" aria-label="Quick links">
        <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="Open GitHub" title="GitHub">
          <Github size={20} />
          <span className="action-label">GitHub</span>
        </a>
        <a href={profile.resume} download aria-label="Download resume" title="Resume">
          <ArrowDownToLine size={20} />
          <span className="action-label">Resume</span>
        </a>
      </div>

      {personalOpen && (
  <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="personal-title">
    <article className="personal-modal">
      <button className="modal-close" type="button" onClick={() => setPersonalOpen(false)} aria-label="Close">
        <X size={20} />
      </button>
      
      <div className="personal-intro">
        <div className="personal-copy">
          <p className="eyebrow">{personal.guruLabel}</p>
          <h2 id="personal-title">{personal.title}</h2>
          <p>{personal.about}</p>
          
          {/* Hobbies Section Added Here */}
          {personal.hobbies && (
            <div className="personal-hobbies">
              <p className="eyebrow">Hobbies</p>
              <p>{personal.hobbies}</p>
            </div>
          )}
        </div>
        
        <div className="guru-card">
          <img src={personal.guruImage} alt={personal.guruLabel} />
        </div>
      </div>

      <div className="advice-panel">
        <p className="eyebrow">Personal Lessons</p>
        <h3>{personal.adviceTitle || "Best Advices That I Ever Received"}</h3>
        <div className="advice-list">
          {personal.advices.map((advice, index) => (
            <blockquote key={advice}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>"{advice}"</p>
            </blockquote>
          ))}
        </div>
      </div>
    </article>
  </div>
)}

    </>
  );
}

function SectionHeader({ kicker, title, text }) {
  return (
    <div className="section-header">
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function ProjectMockup({ tone, title, image }) {
  if (image) {
    return (
      <div className={`project-mockup image`} aria-label={`${title} website preview`}>
        <img src={image} alt={`${title} screenshot`} className="project-screenshot" />
      </div>
    );
  }

  return (
    <div className={`project-mockup ${tone}`} aria-label={`${title} website preview`}>
      <div className="mock-browser">
        <span />
        <span />
        <span />
      </div>
      <div className="mock-layout">
        <div className="mock-sidebar" />
        <div className="mock-main">
          <span />
          <strong />
          <div className="mock-cards">
            <i />
            <i />
            <i />
          </div>
          <div className="mock-lines">
            <em />
            <em />
            <em />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;