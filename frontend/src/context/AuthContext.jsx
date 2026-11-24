import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";
import { TOKEN_KEY, USER_KEY } from "../services/api";

const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(true);

  const saveSession = (data) => {
    const userData = { _id: data._id, name: data.name, email: data.email };
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  // When the app opens, check if the saved token is still valid
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    authService
      .getProfile()
      .then((profile) => {
        const userData = {
          _id: profile._id,
          name: profile.name,
          email: profile.email,
        };
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        setUser(userData);
      })
      .catch(() => {
        clearSession();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (credentials) => {
    const data = await authService.loginUser(credentials);
    saveSession(data);
    return data;
  };

  const register = async (details) => {
    const data = await authService.registerUser(details);
    saveSession(data);
    return data;
  };

  const logout = () => {
    clearSession();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
