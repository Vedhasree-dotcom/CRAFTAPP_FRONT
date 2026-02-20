import React, { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../Services/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    setAuthToken(token);

    if (token) {
      const decoded = decodeToken(token);
      const payloadUser = decoded || null;

      setUser(payloadUser);
      localStorage.setItem("user", JSON.stringify(payloadUser));
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }

    setLoading(false);
  }, [token]);

  const register = async (form) => {
    return await api.post("/auth/register", form);
  };

 const login = async (form) => {
  const res = await api.post("/auth/login", form);

  if (res?.data?.accessToken) {
    const newToken = res.data.accessToken;

    setAuthToken(newToken);   // important
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  return res;
};

  const forgotPassword = async (email) => {
    return await api.post("/auth/forgot-password", { email });
  };

  const logout = () => {
    api.post("/auth/logout").catch(() => {});
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loading, register, login, forgotPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
