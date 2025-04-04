import { create } from "zustand";
import { loginUser } from "@/api/authApi";
import { UserType } from "../lib/types";

interface AuthState {
    user: UserType | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    role: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
    const initialToken = typeof window !== 'undefined' ? localStorage.getItem('AdminToken') : null;
    const initialRole = typeof window !== 'undefined' ? localStorage.getItem('AdminRole') : null;

    return {
        user: null,
        token: initialToken,
        role: initialRole,
        isLoading: false,
        error: null,
        isAuthenticated: !!initialToken,
        login: async (email, password) => {
            set({ isLoading: true, error: null });
            try {
                const res = await loginUser(email, password);
                set({ 
                    user: res.user, 
                    token: res.token, 
                    role: res.user.role,
                    isAuthenticated: true 
                });
                localStorage.setItem('AdminToken', res.token);
                localStorage.setItem('AdminRole', res.user.role);
            } catch (err) {
                set({ 
                    error: (err as Error).message,
                    isAuthenticated: false 
                });
            } finally {
                set({ isLoading: false });
            }
        },
        logout: () => {
            set({ 
                user: null, 
                token: null, 
                role: null,
                isAuthenticated: false 
            });
            localStorage.removeItem('AdminToken');
            localStorage.removeItem('AdminRole');
        }
    };
});

export default useAuthStore;