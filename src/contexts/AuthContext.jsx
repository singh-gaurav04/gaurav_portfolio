import { createContext, useContext, useEffect, useState } from "react";
import {
  changePassword as changePasswordRequest,
  getMe,
  login as loginRequest,
  logout as logoutRequest,
} from "../api/admin";
import { clearAdminToken, getAdminToken, setAdminToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(!!getAdminToken());

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    getMe()
      .then(setAdmin)
      .catch(() => {
        clearAdminToken();
        setAdmin(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await loginRequest(email, password);
    setAdminToken(data.access_token);
    const me = await getMe();
    setAdmin(me);
    return me;
  };

  const changePassword = async (payload) => {
    const data = await changePasswordRequest(payload);
    if (data?.access_token) setAdminToken(data.access_token);
    return data;
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch {
      /* token may already be invalid */
    }
    clearAdminToken();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{ admin, loading, login, logout, changePassword, isAuthenticated: !!admin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
