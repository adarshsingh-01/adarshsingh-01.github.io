export default function Cover({ project, large = false }) {
  return (
    <div className={`cover cover-${project.slug} ${large ? "is-large" : ""}`} aria-hidden="true">
      <div className="cover-lines">
        {project.coverLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <span className="cover-mark">{project.stack[0]}</span>
    </div>
  );
}
