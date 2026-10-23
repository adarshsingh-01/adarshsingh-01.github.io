import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  const location = useLocation();
  const inbox = location.pathname === "/inbox";

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "Adarsh Singh — Full-stack engineer";
    }
  }, [location.pathname]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      {!inbox && <Nav />}
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<Project />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!inbox && <Footer />}
    </>
  );
}
