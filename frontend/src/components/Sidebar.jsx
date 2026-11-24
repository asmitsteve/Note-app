import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Plus, StickyNote, X } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";
import { getInitials } from "../utils/helpers";

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out");
    navigate("/");
  };

  const linkClass = ({ isActive }) => `side-link ${isActive ? "active" : ""}`;

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-top">
        <Logo to="/dashboard" />
        <button className="icon-btn sidebar-close" onClick={onClose} aria-label="Close menu">
          <X size={20} />
        </button>
      </div>

      <button className="btn btn-primary btn-block" onClick={() => navigate("/notes/new")}>
        <Plus size={18} />
        Create Note
      </button>

      <nav className="side-nav">
        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={19} />
          Dashboard
        </NavLink>
        <NavLink to="/notes" end className={linkClass}>
          <StickyNote size={19} />
          My Notes
        </NavLink>
        <NavLink to="/notes/new" className={linkClass}>
          <Plus size={19} />
          New Note
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div className="profile-card">
          <div className="avatar">{getInitials(user ? user.name : "")}</div>
          <div className="profile-info">
            <strong>{user ? user.name : "User"}</strong>
            <span>{user ? user.email : ""}</span>
          </div>
        </div>
        <button className="btn btn-outline btn-block" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
