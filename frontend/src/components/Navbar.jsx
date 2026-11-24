import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Logo />

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <a href="#features" onClick={closeMenu}>
            Features
          </a>
          <a href="#benefits" onClick={closeMenu}>
            Benefits
          </a>

          <div className="nav-actions">
            {user ? (
              <Link to="/dashboard" className="btn btn-primary" onClick={closeMenu}>
                Open Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary" onClick={closeMenu}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
