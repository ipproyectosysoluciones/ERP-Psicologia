import { Model } from 'sequelize-typescript';
export declare class Rol extends Model {
    id: string;
    nombre: string;
    descripcion: string;
}
export declare class Usuario extends Model {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    activo: boolean;
    rolId: string;
    rol: Rol;
}
//# sourceMappingURL=user.model.d.ts.map