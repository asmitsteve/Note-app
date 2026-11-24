import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "../components/Logo";
import FormField from "../components/FormField";
import { Spinner } from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../services/api";
import { isValidEmail } from "../utils/helpers";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(form.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const data = await login({
        email: form.email.trim(),
        password: form.password,
      });
      toast.success(`Welcome back, ${data.name}!`);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <Logo />
        <div className="auth-brand-text">
          <h2>Welcome back to your workspace.</h2>
          <p>
            Log in to pick up right where you left off. All your notes are
            waiting for you.
          </p>
        </div>
        <small>© {new Date().getFullYear()} NoteSphere</small>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <div className="auth-mobile-logo">
            <Logo />
          </div>
          <h1>Login to NoteSphere</h1>
          <p className="auth-sub">Enter your details to access your notes.</p>

          <form onSubmit={handleSubmit} noValidate>
            <FormField
              id="email"
              name="email"
              type="email"
              label="Email address"
              icon={Mail}
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />
            <FormField
              id="password"
              name="password"
              type="password"
              label="Password"
              icon={Lock}
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="current-password"
            />

            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
              {loading && <Spinner size={18} />}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
