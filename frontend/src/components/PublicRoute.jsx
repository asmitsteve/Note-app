import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageLoader from "./Loader";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageLoader text="Loading..." />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
