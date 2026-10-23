import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Cover from "../components/Cover";
import { getNextProject, getProject } from "../../../shared/content.js";
import NotFound from "./NotFound";

export default function Project() {
  const { slug } = useParams();
  const project = getProject(slug);
  const next = project ? getNextProject(project.slug) : null;

  useEffect(() => {
    if (project) document.title = `${project.title} — Adarsh Singh`;
  }, [project]);

  if (!project) return <NotFound />;

  return (
    <article className="page project">
      <div className="container">
        <Link className="back" to="/#work">
          ← All work
        </Link>
        <p className="kicker">
          {project.index} — {project.eyebrow}
        </p>
        <header className="project-head">
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </header>
        <Cover project={project} large />
        <dl className="meta-grid">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.stack.join(" · ")}</dd>
          </div>
        </dl>
        <div className="project-links">
          {project.links.map((link) => (
            <a key={link.href} className="btn" href={link.href} target="_blank" rel="noreferrer">
              {link.label} ↗
            </a>
          ))}
        </div>
        <div className="split">
          <section>
            <h2>The brief</h2>
            <p>{project.brief}</p>
          </section>
          <section>
            <h2>What shipped</h2>
            <ul className="role-list">
              {project.shipped.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="outcome">{project.outcome}</p>
          </section>
        </div>
        {next && (
          <Link className="next-project" to={`/work/${next.slug}`}>
            <span>Next project</span>
            <strong>{next.title}</strong>
          </Link>
        )}
      </div>
    </article>
  );
}
