import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as apiLogin, register as apiRegister, me as apiMe } from '../api/auth';

/**
 * PUBLIC_INTERFACE
 * Provides a React Context for authentication state and actions.
 */
export const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * Hook to access authentication context (user, loading, login, register, logout).
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * PUBLIC_INTERFACE
 * AuthProvider wraps children and hydrates auth state from the backend (or mocks).
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const u = await apiMe();
        if (mounted) setUser(u);
      } catch {
        // ignore errors; remain unauthenticated
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email, password) => {
    const { user: u } = await apiLogin(email, password);
    setUser(u);
    return u;
  };

  const register = async (email, password) => {
    const { user: u } = await apiRegister(email, password);
    setUser(u);
    return u;
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
