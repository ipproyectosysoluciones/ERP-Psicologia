import { api } from './api';
import type { AuthTokens, LoginDto } from '@erp/shared';

export const authService = {
  login: async (data: LoginDto): Promise<AuthTokens> => {
    const res = await api.post<AuthTokens>('/auth/login', data);
    return res.data;
  },
};
