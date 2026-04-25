import { api } from './api';
import type { AuthTokens, LoginDto, RegisterDto } from '@erp/shared';

export const authService = {
  login: async (data: LoginDto): Promise<AuthTokens> => {
    const res = await api.post<AuthTokens>('/auth/login', data);
    return res.data;
  },

  register: async (data: RegisterDto): Promise<AuthTokens> => {
    const res = await api.post<AuthTokens>('/auth/register', data);
    return res.data;
  },

  refresh: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const res = await api.post<{ accessToken: string }>('/auth/refresh', {
      refreshToken,
    });
    return res.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};