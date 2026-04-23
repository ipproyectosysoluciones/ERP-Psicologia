import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { PaginatedResponse } from '@erp/shared';
import { HistoriaClinica } from './models/historia-clinica.model';
import { CreateHistoriaDto, UpdateHistoriaDto } from './dto';
import { HistoriasFilters } from './interfaces/historias-filters.interface';

@Injectable()
export class HistoriasService {
  constructor(
    @InjectModel(HistoriaClinica)
    private readonly historiaModel: typeof HistoriaClinica,
  ) {}

  async create(dto: CreateHistoriaDto, profesionalId: string): Promise<HistoriaClinica> {
    return this.historiaModel.create({
      pacienteId: dto.pacienteId,
      profesionalId,
      plantillaId: dto.plantillaId,
      fecha: dto.fecha,
      contenido: dto.contenido,
      tipoPlantilla: dto.tipoPlantilla,
      diagnostico: dto.diagnostico,
      activa: true,
    });
  }

  async findAll(filters: HistoriasFilters): Promise<PaginatedResponse<HistoriaClinica>> {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const offset = (page - 1) * limit;

    const where: Record<string, unknown> = { activa: true };

    if (filters.pacienteId) {
      where.pacienteId = filters.pacienteId;
    }

    if (filters.profesionalId) {
      where.profesionalId = filters.profesionalId;
    }

    if (filters.tipoPlantilla) {
      where.tipoPlantilla = filters.tipoPlantilla;
    }

    if (filters.fechaDesde || filters.fechaHasta) {
      if (filters.fechaDesde && filters.fechaHasta) {
        where.fecha = {
          [Op.between]: [filters.fechaDesde, filters.fechaHasta],
        };
      } else if (filters.fechaDesde) {
        where.fecha = {
          [Op.gte]: filters.fechaDesde,
        };
      } else if (filters.fechaHasta) {
        where.fecha = {
          [Op.lte]: filters.fechaHasta,
        };
      }
    }

    const { count: total, rows } = await this.historiaModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['fecha', 'DESC']],
      include: ['paciente', 'profesional', 'plantilla'],
    });

    return {
      data: rows,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<HistoriaClinica> {
    const historia = await this.historiaModel.findOne({
      where: { id, activa: true },
      include: ['paciente', 'profesional', 'plantilla'],
    });

    if (!historia) {
      throw new NotFoundException('Historia no encontrada');
    }

    return historia;
  }

  async findByPaciente(pacienteId: string): Promise<HistoriaClinica[]> {
    return this.historiaModel.findAll({
      where: { pacienteId, activa: true },
      order: [['fecha', 'DESC']],
      include: ['paciente', 'profesional', 'plantilla'],
    });
  }

  async update(id: string, dto: UpdateHistoriaDto): Promise<HistoriaClinica> {
    const historia = await this.findOne(id);

    if (dto.contenido !== undefined) {
      historia.contenido = dto.contenido;
    }
    if (dto.tipoPlantilla !== undefined) {
      historia.tipoPlantilla = dto.tipoPlantilla;
    }
    if (dto.plantillaId !== undefined) {
      historia.plantillaId = dto.plantillaId;
    }
    if (dto.diagnostico !== undefined) {
      historia.diagnostico = dto.diagnostico;
    }

    return historia.save();
  }

  async remove(id: string, profesionalId: string): Promise<void> {
    const historia = await this.findOne(id);

    const isOwner = historia.profesionalId === profesionalId;
    if (!isOwner) {
      throw new ForbiddenException('No tienes permiso para eliminar esta historia');
    }

    historia.activa = false;
    await historia.save();
  }

  async validateOwnership(historiaId: string, profesionalId: string): Promise<boolean> {
    const historia = await this.historiaModel.findOne({
      where: { id: historiaId, activa: true },
    });

    if (!historia) return false;
    return historia.profesionalId === profesionalId;
  }
}