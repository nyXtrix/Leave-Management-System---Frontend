import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import type { ReactNode } from "react";
import { useDispatch } from "react-redux";
import {
  setProfile as setReduxProfile,
  clearProfile as clearReduxProfile,
} from "../store/slices/userSlice";
import type { UserProfile }  from "../types/auth";
import { authService } from "../services/auth.service";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  can: (module: string, action: string) => boolean;
  login: (email: string, password: string, subdomain?: string) => Promise<void>;
  register: (payload: any) => Promise<void>;
  setupUser: (payload: { token: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setProfile: (user: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const initialized = useRef(false);

  const checkAuth = useCallback(async () => {
    try {
      const profile = await authService.getMe();
      setUser(profile);
      dispatch(setReduxProfile(profile));
    } catch {
      setUser(null);
      dispatch(clearReduxProfile());
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    void checkAuth();
  }, [checkAuth]);

  const can = useCallback(
    (module: string, action: string): boolean => {
      if (!user) return false;
      return user.permissions[module]?.includes(action) || false;
    },
    [user],
  );

  const login = useCallback(
    async (email: string, password: string, subdomain?: string) => {
      setIsLoading(true);
      try {
        const code = await authService.login({ email, password }, subdomain);
        await authService.exchangeCode(code);
        await checkAuth();
      } catch (err) {
        setUser(null);
        dispatch(clearReduxProfile());
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [checkAuth, dispatch],
  );

  const register = useCallback(
    async (payload: any) => {
      setIsLoading(true);
      try {
        const code = await authService.registerCompany(payload);
        await authService.exchangeCode(code);
        await checkAuth();
      } catch (err) {
        setUser(null);
        dispatch(clearReduxProfile());
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [checkAuth, dispatch],
  );

  const setupUser = useCallback(
    async (payload: { token: string; password: string }) => {
      setIsLoading(true);
      try {
        const code = await authService.setPassword(payload);
        await authService.exchangeCode(code);
        await checkAuth();
      } catch (err) {
        setUser(null);
        dispatch(clearReduxProfile());
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [checkAuth, dispatch],
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } finally {
      setUser(null);
      dispatch(clearReduxProfile());
      setIsLoading(false);
    }
  }, [dispatch]);

  const refreshUser = useCallback(async () => {
    await checkAuth();
  }, [checkAuth]);

  const setProfile = useCallback(
    (profile: UserProfile) => {
      setUser(profile);
      dispatch(setReduxProfile(profile));
    },
    [dispatch],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        can,
        login,
        register,
        setupUser,
        logout,
        refreshUser,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
