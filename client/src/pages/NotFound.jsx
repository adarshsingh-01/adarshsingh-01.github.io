import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not found — Adarsh Singh";
  }, []);

  return (
    <div className="page not-found container">
      <p className="kicker">404</p>
      <h1>This page is not on the map.</h1>
      <Link className="btn" to="/">
        Back home
      </Link>
    </div>
  );
}
