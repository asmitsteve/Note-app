import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo />
          <p>A calm, beautiful place to capture and organize everything you think.</p>
        </div>

        <div className="footer-links">
          <h4>Product</h4>
          <a href="#features">Features</a>
          <a href="#benefits">Benefits</a>
        </div>

        <div className="footer-links">
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Create account</Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} NoteSphere. Built with the MERN stack.</p>
      </div>
    </footer>
  );
}
