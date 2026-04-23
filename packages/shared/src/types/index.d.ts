export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface LoginDto {
    email: string;
    password: string;
}
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
export interface UserProfile {
    id: string;
    email: string;
    nombre: string;
    apellido: string;
    role: string;
}
export interface ApiResponse<T> {
    data: T;
    message?: string;
}
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}
export interface HealthCheck {
    status: 'ok';
    timestamp: string;
}
//# sourceMappingURL=index.d.ts.map