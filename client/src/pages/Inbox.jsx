import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Inbox() {
  const [token, setToken] = useState(() => sessionStorage.getItem("inbox-token") || "");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Inbox — Adarsh Singh";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  async function load(event) {
    event?.preventDefault();
    setLoading(true);
    setError("");
    sessionStorage.setItem("inbox-token", token);

    try {
      const response = await fetch("/api/messages", {
        headers: { "x-admin-token": token },
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not open the inbox.");
      }
      setMessages(payload.messages || []);
    } catch (loadError) {
      setMessages([]);
      setError(loadError.message === "Failed to fetch" ? "The API is not running." : loadError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page inbox container">
      <Link className="back" to="/">
        ← Portfolio
      </Link>
      <p className="kicker">Private</p>
      <h1>Message inbox</h1>
      <p className="lede">Notes sent from the contact form. The token is printed in the API terminal, or set as ADMIN_TOKEN.</p>
      <form className="inbox-form" onSubmit={load}>
        <label>
          <span>Inbox token</span>
          <input
            type="password"
            value={token}
            autoComplete="current-password"
            onChange={(event) => setToken(event.target.value)}
            required
          />
        </label>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Opening…" : "Open inbox"}
        </button>
      </form>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div className="inbox-list">
        {messages.map((message) => (
          <article key={message.id}>
            <header>
              <strong>{message.name}</strong>
              <time dateTime={message.createdAt}>
                {new Date(message.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </time>
            </header>
            <p>
              <a href={`mailto:${message.email}`}>{message.email}</a>
              {message.company ? ` · ${message.company}` : ""}
            </p>
            <p>{message.message}</p>
          </article>
        ))}
        {!error && messages.length === 0 && <p className="empty">No messages yet.</p>}
      </div>
    </div>
  );
}
