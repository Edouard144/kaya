import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Auth, getToken, setToken, type User } from "./api";

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
    if (!getToken()) { setUser(null); setLoading(false); return; }
    try {
      const u = await Auth.me();
      setUser(u);
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const login = async (email: string, password: string) => {
    const r = await Auth.login({ email, password });
    setToken(r.token);
    setUser(r.user);
  };
  const register = async (name: string, email: string, password: string) => {
    const r = await Auth.register({ name, email, password });
    setToken(r.token);
    setUser(r.user);
  };
  const logout = () => { setToken(null); setUser(null); };

  return <Ctx.Provider value={{ user, loading, login, register, logout, refresh }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside <AuthProvider>");
  return v;
}

