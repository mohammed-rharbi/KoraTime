import { create } from "zustand";
import { loginUser } from "@/api/authApi";
import { UserType } from "../lib/types";


interface AuthState {
    user: UserType | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    role: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  }
  

const useAuthStore = create<AuthState>((set) => {

    let initialToken: string | null = null;
    let initialRole: string | null = null;
    
    if (typeof window !== 'undefined') {
      initialToken = localStorage.getItem('AdminToken');
      initialRole = localStorage.getItem('AdminRole');
    }
  
    return {
      user: null,
      token: initialToken,
      role: initialRole,
      isLoading: false,
      error: null,
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await loginUser(email, password);
          set({ user: res.user, token: res.token, role: res.user.role });
          localStorage.setItem('AdminToken', res.token);
          localStorage.setItem('AdminRole', res.user.role);
        } catch (err) {
          set({ error: (err as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        set({ user: null, token: null, role: null });
        localStorage.removeItem('AdminToken');
        localStorage.removeItem('AdminRole');
      }
    };
  });


export default useAuthStore