import { Link } from "react-router-dom";
import { Layers } from "lucide-react";

export default function Logo({ to = "/" }) {
  return (
    <Link to={to} className="logo">
      <span className="logo-mark">
        <Layers size={18} />
      </span>
      <span className="logo-text">NoteSphere</span>
    </Link>
  );
}
