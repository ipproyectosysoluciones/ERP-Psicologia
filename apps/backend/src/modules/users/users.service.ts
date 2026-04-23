import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario, Rol } from './user.model';

interface CreateUserData {
  nombre: string;
  apellido?: string;
  email: string;
  password: string;
  rol?: string;
  rolId?: string;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(Usuario) private readonly userModel: typeof Usuario) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.userModel.findOne({ where: { email }, include: ['rol'] });
  }

  async findById(id: string): Promise<Usuario | null> {
    return this.userModel.findByPk(id, { include: ['rol'] });
  }

  async create(data: CreateUserData): Promise<Usuario> {
    let rolId: string | undefined = data.rolId;
    
    if (!rolId && data.rol) {
      const rol = await Rol.findOne({ where: { nombre: data.rol } });
      rolId = rol?.id;
    }
    
    if (!rolId) {
      const defaultRol = await Rol.findOne({ where: { nombre: 'USER' } });
      rolId = defaultRol?.id;
    }

    return this.userModel.create({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      password: data.password,
      rolId,
      activo: true,
    } as any);
  }

  async findAll(): Promise<Usuario[]> {
    return this.userModel.findAll({ include: ['rol'] });
  }

  async update(id: string, data: Partial<Usuario>): Promise<Usuario | null> {
    const user = await this.userModel.findByPk(id);
    if (!user) return null;
    
    await user.update(data);
    return user;
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.userModel.findByPk(id);
    if (!user) return false;
    
    await user.update({ activo: false });
    return true;
  }
}