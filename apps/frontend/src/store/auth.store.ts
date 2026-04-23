import { create } from 'zustand';
import type { UserProfile } from '@erp/shared';
import { authService } from '../services/auth.service';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (token: string, refreshToken: string, user: UserProfile) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; nombre: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,

  setAuth: (token, refreshToken, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    set({ token, refreshToken, user, isAuthenticated: true });
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const tokens = await authService.login({ email, password });
      set({
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: { id: '', email, nombre: '', apellido: '', role: '' },
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem('token', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data) => {
    set({ isLoading: true });
    try {
      const tokens = await authService.register(data);
      set({
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: { id: '', email: data.email, nombre: data.nombre, apellido: '', role: 'USER' },
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem('token', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore logout errors
    }
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    set({ token: null, refreshToken: null, user: null, isAuthenticated: false });
  },

  refreshTokens: async () => {
    const { refreshToken } = get();
    if (!refreshToken) return;

    try {
      const { accessToken } = await authService.refresh(refreshToken);
      localStorage.setItem('token', accessToken);
      set({ token: accessToken });
    } catch {
      get().logout();
    }
  },
}));