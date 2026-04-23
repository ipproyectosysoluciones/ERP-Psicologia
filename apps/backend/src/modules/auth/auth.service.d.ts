import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import type { AuthTokens } from '@erp/shared';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<import("../users/user.model").Usuario>;
    login(email: string, password: string): Promise<AuthTokens>;
    hashPassword(password: string): Promise<string>;
}
//# sourceMappingURL=auth.service.d.ts.map