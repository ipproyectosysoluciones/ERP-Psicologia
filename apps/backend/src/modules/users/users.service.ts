import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Usuario) private readonly userModel: typeof Usuario) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.userModel.findOne({ where: { email }, include: ['rol'] });
  }

  async findById(id: string): Promise<Usuario | null> {
    return this.userModel.findByPk(id, { include: ['rol'] });
  }

  async create(data: {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    rolId: string;
  }): Promise<Usuario> {
    return this.userModel.create(data as any);
  }
}
