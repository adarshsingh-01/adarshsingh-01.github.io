import { profile } from "../../../shared/content.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="brand-mark">Adarsh Singh</p>
          <p>Software engineer · {profile.location}</p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.phoneHref}>{profile.phone}</a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
        <p className="colophon">Built with React, Node, Express, and MongoDB. © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
