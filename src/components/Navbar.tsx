import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        MagentaGrid
      </Link>

      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/about" onClick={closeMenu}>
          About
        </Link>

        <Link to="/blog" onClick={closeMenu}>
          Blog
        </Link>
        {user && (
  <Link to="/dashboard" onClick={closeMenu}>
    Dashboard
  </Link>
)}
      </div>
    </nav>
  );
}

export default Navbar;