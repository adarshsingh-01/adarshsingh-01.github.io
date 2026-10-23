import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cover from "../components/Cover";
import {
  education,
  experience,
  marquee,
  profile,
  projects as localProjects,
  skillGroups,
} from "../../../shared/content.js";

export default function Home() {
  const [projects, setProjects] = useState(localProjects);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/projects", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length) setProjects(data);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company_url") || "").trim()) {
      setStatus("sent");
      setSentTo(String(data.get("email") || "you"));
      form.reset();
      return;
    }

    setStatus("sending");
    setError("");

    const openMailDraft = () => {
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const company = String(data.get("company") || "").trim();
      const message = String(data.get("message") || "").trim();
      const subject = encodeURIComponent(`Portfolio note from ${name}`);
      const body = encodeURIComponent(`${message}\n\nFrom ${name}\n${email}${company ? `\n${company}` : ""}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setSentTo(email);
      setStatus("mailed");
      form.reset();
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
          company_url: data.get("company_url"),
        }),
      });
      const payload = await response.json().catch(() => null);
      if (response.ok && payload?.ok) {
        setSentTo(String(data.get("email") || "").trim());
        setStatus("sent");
        form.reset();
        return;
      }
      if (response.status === 404 || payload === null) {
        openMailDraft();
        return;
      }
      throw new Error(payload?.error || "Could not send that message.");
    } catch (submitError) {
      if (submitError.message === "Failed to fetch") {
        openMailDraft();
        return;
      }
      setStatus("error");
      setError(submitError.message);
    }
  }

  return (
    <div className="page">
      <p className="rail">Adarsh Singh — TCS Noida</p>

      <section className="hero container">
        <div className="hero-grid">
          <div>
            <p className="kicker">
              <span className="dot" aria-hidden="true" />
              {profile.availability}
            </p>
            <h1 className="display">
              {profile.firstName}
              <br />
              <em>{profile.lastName}</em>
            </h1>
            <p className="lede">{profile.summary}</p>
            <div className="hero-actions">
              <Link className="btn" to="/#work">
                Selected work
              </Link>
              <a className="btn btn-ghost" href={profile.resume} download="Adarsh-Singh-Resume.pdf">
                Download résumé
              </a>
            </div>
            <p className="hero-mail">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span aria-hidden="true">·</span>
              <a href={profile.phoneHref}>{profile.phone}</a>
            </p>
          </div>
          <aside className="hero-side">
            <div className="portrait-wrap">
              <img className="portrait" src={profile.avatar} alt="Portrait of Adarsh Singh" />
            </div>
            <ul className="fact-list">
              <li>
                <span>Based in</span>
                {profile.location}
              </li>
              <li>
                <span>Now</span>
                Software Engineer, TCS
              </li>
              <li>
                <span>Degree</span>
                {education.degree}
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy}>
              {marquee.map((item) => (
                <li key={`${copy}-${item}`}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <section className="section container" id="work">
        <div className="section-head">
          <p className="kicker">01 — Selected work</p>
          <h2>Two products a person can open.</h2>
          <p>
            LedgerLoop explains a payment match before it is confirmed. MindMeld turns cognitive practice into a record
            of progress.
          </p>
        </div>
        <div className="work-list">
          {projects.map((project) => (
            <article className="work-card" key={project.slug}>
              <Link to={`/work/${project.slug}`}>
                <div className="work-copy">
                  <p className="kicker">
                    {project.index} — {project.eyebrow}
                  </p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <ul className="tags">
                    {project.stack.slice(0, 4).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <Cover project={project} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section container" id="experience">
        <div className="section-head">
          <p className="kicker">02 — Experience</p>
          <h2>At TCS in Noida. Model evaluation before that.</h2>
        </div>
        <div className="roles">
          {experience.map((job) => (
            <article className="role" key={job.org}>
              <div className="role-top">
                <div>
                  <h3>{job.role}</h3>
                  <p>{job.org}</p>
                </div>
                <p className="dates">{job.dates}</p>
              </div>
              <ul className="role-list">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <article className="edu">
          <div>
            <p className="kicker">Education</p>
            <h3>{education.school}</h3>
            <p>
              {education.degree}
              <br />
              {education.place} · {education.dates}
            </p>
          </div>
          <ul className="tags">
            {education.coursework.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section container" id="craft">
        <div className="section-head">
          <p className="kicker">03 — Craft</p>
          <h2>The stack I work in.</h2>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-wrap" id="contact">
        <div className="contact-grid">
          <div>
            <p className="kicker light">04 — Contact</p>
            <h2>Tell me what you are hiring for.</h2>
            <p>
              Roles, a collaboration, or a specific question. The note goes through this site’s API and waits in
              Adarsh’s inbox.
            </p>
            <div className="direct">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.phoneHref}>{profile.phone}</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>

          {status === "sent" || status === "mailed" ? (
            <div className="thanks" role="status">
              <p className="thanks-title">{status === "mailed" ? "Opening email." : "Received."}</p>
              <p>
                {status === "mailed"
                  ? "Your email app should open with this note addressed to Adarsh."
                  : `A reply will come to ${sentTo || "the address you entered"}.`}
              </p>
              <button className="btn btn-light" type="button" onClick={() => setStatus("idle")}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate={false}>
              <label>
                <span>Name</span>
                <input name="name" autoComplete="name" required minLength={2} maxLength={80} />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required maxLength={120} />
              </label>
              <label>
                <span>Company or team</span>
                <input name="company" autoComplete="organization" maxLength={120} />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" required minLength={10} maxLength={2000} rows={5} />
              </label>
              <label className="hp">
                Website
                <input name="company_url" tabIndex={-1} autoComplete="off" />
              </label>
              {status === "error" && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button className="btn btn-light" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
