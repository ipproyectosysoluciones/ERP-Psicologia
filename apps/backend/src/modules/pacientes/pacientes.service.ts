import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Paciente } from './paciente.model';

export interface CreatePacienteDto {
  dni: string;
  nombre: string;
  apellido?: string;
  fechaNac?: string;
  contacto?: string;
  direccion?: string;
  obraSocial?: string;
}

export interface UpdatePacienteDto {
  dni?: string;
  nombre?: string;
  apellido?: string;
  fechaNac?: string;
  contacto?: string;
  direccion?: string;
  obraSocial?: string;
}

@Injectable()
export class PacientesService {
  constructor(
    @InjectModel(Paciente)
    private readonly pacienteModel: typeof Paciente,
  ) {}

  async findAll(): Promise<Paciente[]> {
    return this.pacienteModel.findAll({
      where: { activo: true },
      order: [['apellido', 'ASC'], ['nombre', 'ASC']],
    });
  }

  async findOne(id: string): Promise<Paciente> {
    const paciente = await this.pacienteModel.findOne({
      where: { id, activo: true },
    });

    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return paciente;
  }

  async findByDni(dni: string): Promise<Paciente | null> {
    return this.pacienteModel.findOne({
      where: { dni, activo: true },
    });
  }

  async create(dto: CreatePacienteDto): Promise<Paciente> {
    const existing = await this.pacienteModel.findOne({
      where: { dni: dto.dni },
    });

    if (existing) {
      throw new BadRequestException('DNI ya registrado');
    }

    return this.pacienteModel.create(dto as any);
  }

  async update(id: string, dto: UpdatePacienteDto): Promise<Paciente> {
    const paciente = await this.pacienteModel.findByPk(id);

    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }

    if (dto.dni && dto.dni !== paciente.dni) {
      const existing = await this.pacienteModel.findOne({
        where: { dni: dto.dni },
      });

      if (existing) {
        throw new BadRequestException('DNI ya registrado');
      }
    }

    await paciente.update(dto as any);
    return paciente;
  }

  async remove(id: string): Promise<{ id: string; activo: boolean }> {
    const paciente = await this.pacienteModel.findByPk(id);

    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }

    await paciente.update({ activo: false });

    return { id: paciente.id, activo: false };
  }
}
