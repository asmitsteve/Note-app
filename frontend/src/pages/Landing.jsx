import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Palette,
  PenLine,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: PenLine,
    title: "Effortless writing",
    text: "Capture ideas the moment they arrive with a clean, distraction-free editor.",
  },
  {
    icon: Search,
    title: "Instant search",
    text: "Find any note in seconds by searching across titles and content.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    text: "Passwords are hashed and every request is protected with JWT authentication.",
  },
  {
    icon: Zap,
    title: "Fast and smooth",
    text: "Create, edit and delete notes instantly with a snappy, responsive interface.",
  },
  {
    icon: Smartphone,
    title: "Works everywhere",
    text: "A fully responsive layout that feels great on phones, tablets and desktops.",
  },
  {
    icon: Palette,
    title: "Beautifully designed",
    text: "Colorful cards and a calm, modern layout that keeps you focused.",
  },
];

const benefits = [
  "Keep all your thoughts in one organized place",
  "Sort notes by newest or oldest in one click",
  "Your notes are private and visible only to you",
  "Pick up exactly where you left off on any device",
  "No clutter, no learning curve, just write",
];

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="landing">
      <Navbar />

      <section className="hero">
        <div className="blob blob-1" />
        <div className="blob blob-2" />

        <div className="container hero-grid">
          <div className="hero-text">
            <span className="badge">
              <Sparkles size={15} />
              Simple. Private. Beautiful.
            </span>
            <h1>
              Your Thoughts, <span className="gradient-text">Organized.</span>
            </h1>
            <p className="hero-sub">
              NoteSphere is a modern workspace to capture ideas, plans and
              memories. Write quickly, search instantly and keep everything
              safe, all in one calm and beautiful place.
            </p>

            <div className="hero-buttons">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="btn btn-primary btn-lg"
              >
                {user ? "Open Dashboard" : "Get Started"}
                <ArrowRight size={18} />
              </Link>
              {!user && (
                <Link to="/login" className="btn btn-outline btn-lg">
                  Login
                </Link>
              )}
            </div>

            <p className="hero-note">Free to use. No credit card needed.</p>
          </div>

          <div className="hero-visual">
            <div className="preview-window">
              <div className="preview-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="preview-body">
                <div className="preview-note color-purple">
                  <h4>Product roadmap</h4>
                  <p>Ship the new onboarding flow and collect early feedback from the team.</p>
                  <small>Today</small>
                </div>
                <div className="preview-note color-blue">
                  <h4>Reading list</h4>
                  <p>Finish the design systems book and take notes on every chapter.</p>
                  <small>Yesterday</small>
                </div>
                <div className="preview-note color-pink">
                  <h4>Weekend plan</h4>
                  <p>Morning hike, grocery run and a quiet evening of writing.</p>
                  <small>2 days ago</small>
                </div>
                <div className="preview-note color-green">
                  <h4>Ideas</h4>
                  <p>A tiny app that turns voice memos into tidy, searchable notes.</p>
                  <small>Last week</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Features</span>
            <h2>Everything you need to stay organized</h2>
            <p>
              Powerful where it matters, simple everywhere else. NoteSphere gives
              you the essentials without the noise.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div className="feature-card" key={feature.title}>
                  <div className="feature-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="benefits" className="section section-tint">
        <div className="container benefits-grid">
          <div>
            <span className="eyebrow">Benefits</span>
            <h2>Think clearly. Work calmly.</h2>
            <p className="benefits-sub">
              A tidy notes space helps you focus on what matters. Here is what
              you get with NoteSphere.
            </p>
            <ul className="benefit-list">
              {benefits.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="benefit-panel">
            <div className="benefit-panel-icon">
              <Lock size={30} />
            </div>
            <h3>Your notes are only yours</h3>
            <p>
              Every note is tied to your account. Nobody else can read, edit or
              delete what you write.
            </p>
            <Link
              to={user ? "/dashboard" : "/register"}
              className="btn btn-light btn-lg"
            >
              {user ? "Go to Dashboard" : "Create your free account"}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta">
            <h2>Ready to organize your thoughts?</h2>
            <p>Join NoteSphere and start writing in less than a minute.</p>
            <Link
              to={user ? "/dashboard" : "/register"}
              className="btn btn-light btn-lg"
            >
              {user ? "Open Dashboard" : "Get Started"}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
