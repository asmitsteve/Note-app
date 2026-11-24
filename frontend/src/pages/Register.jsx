import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "../components/Logo";
import FormField from "../components/FormField";
import { Spinner } from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../services/api";
import { isValidEmail } from "../utils/helpers";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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

    if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(form.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      toast.success("Account created! Welcome to NoteSphere.");
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
          <h2>Start organizing your thoughts today.</h2>
          <p>
            Create your free NoteSphere account and keep every idea, plan and
            memory in one beautiful place.
          </p>
        </div>
        <small>© {new Date().getFullYear()} NoteSphere</small>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <div className="auth-mobile-logo">
            <Logo />
          </div>
          <h1>Create your account</h1>
          <p className="auth-sub">It only takes a minute to get started.</p>

          <form onSubmit={handleSubmit} noValidate>
            <FormField
              id="name"
              name="name"
              label="Full name"
              icon={User}
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              autoComplete="name"
            />
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
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
            />
            <FormField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm password"
              icon={Lock}
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />

            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
              {loading && <Spinner size={18} />}
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
