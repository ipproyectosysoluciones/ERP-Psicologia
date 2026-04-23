import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import type { AuthTokens } from '@erp/shared';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<AuthTokens>;
}
//# sourceMappingURL=auth.controller.d.ts.map