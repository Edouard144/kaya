/**
 * Auth context — uses server functions for login/register.
 */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { getToken, setToken, type User } from "./api";
import { login as serverLogin, register as serverRegister, getMe } from "./fns/auth";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const u = await getMe({ data: { token } });
      setUser(u);
    } catch {
      // Token invalid or DB down — clear stale session silently
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = async (email: string, password: string) => {
    const r = await serverLogin({ data: { email, password } });
    setToken(r.token);
    setUser(r.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const r = await serverRegister({ data: { name, email, password } });
    setToken(r.token);
    setUser(r.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside <AuthProvider>");
  return v;
}
