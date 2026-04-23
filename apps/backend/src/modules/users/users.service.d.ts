import { Usuario } from './user.model';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: typeof Usuario);
    findByEmail(email: string): Promise<Usuario | null>;
    findById(id: string): Promise<Usuario | null>;
    create(data: {
        nombre: string;
        apellido: string;
        email: string;
        password: string;
        rolId: string;
    }): Promise<Usuario>;
}
//# sourceMappingURL=users.service.d.ts.map