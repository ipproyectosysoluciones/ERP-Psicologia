import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Cita } from './cita.model';
import { CreateCitaDto, UpdateCitaDto, CitaFiltersDto } from './dto/cita.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CitasService {
  constructor(
    @InjectModel(Cita)
    private citaModel: typeof Cita,
    private httpService: HttpService,
  ) {}

  async findAll(filters: CitaFiltersDto) {
    const { page = 1, limit = 10, pacienteId, profesionalId, fecha, fechaDesde, fechaHasta, estado } = filters;
    const offset = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    
    if (pacienteId) where.pacienteId = pacienteId;
    if (profesionalId) where.profesionalId = profesionalId;
    if (estado) where.estado = estado;
    if (fecha) where.fecha = fecha;
    
    if (fechaDesde || fechaHasta) {
      const fechaCondition: Record<string, string> = {};
      if (fechaDesde) fechaCondition[Op.gte as unknown as string] = fechaDesde;
      if (fechaHasta) fechaCondition[Op.lte as unknown as string] = fechaHasta;
      where.fecha = fechaCondition;
    }

    const { rows: citas, count } = await this.citaModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['fecha', 'ASC'], ['horaInicio', 'ASC']],
      include: ['paciente', 'profesional'],
    });

    return {
      data: citas,
      total: count,
      page,
      limit,
    };
  }

  async findOne(id: string) {
    const cita = await this.citaModel.findByPk(id, {
      include: ['paciente', 'profesional'],
    });
    if (!cita) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }
    return cita;
  }

  async create(dto: CreateCitaDto) {
    const horaFin = dto.horaFin || this.calculateEndTime(dto.horaInicio);
    
    await this.validateOverlap(dto.fecha, dto.horaInicio, horaFin, dto.profesionalId);
    await this.validateWorkingHours(dto.horaInicio, horaFin);

    const cita = await this.citaModel.create({
      ...dto,
      horaFin,
    });

    await this.triggerN8nWebhook('cita-created', cita);

    return cita;
  }

  async update(id: string, dto: UpdateCitaDto) {
    const cita = await this.findOne(id);
    
    const horaInicio = dto.horaInicio || cita.horaInicio;
    const horaFin = dto.horaFin || cita.horaFin;
    const fecha = dto.fecha || cita.fecha;

    if (dto.fecha || dto.horaInicio) {
      await this.validateOverlap(
        typeof fecha === 'object' ? fecha.toString() : String(fecha), 
        horaInicio || '', 
        horaFin || '', 
        cita.profesionalId,
        id
      );
    }

    const finalHoraInicio = horaInicio || '';
    const finalHoraFin = horaFin || '';
    if (finalHoraInicio && finalHoraFin) {
      await this.validateWorkingHours(finalHoraInicio, finalHoraFin);
    }

    await cita.update(dto);
    
    await this.triggerN8nWebhook('cita-updated', cita);

    return cita;
  }

  async remove(id: string) {
    const cita = await this.findOne(id);
    await cita.update({ estado: 'cancelada' });
    
    await this.triggerN8nWebhook('cita-cancelled', cita);
    
    return { message: 'Cita cancelada correctamente' };
  }

  async confirm(id: string) {
    const cita = await this.findOne(id);
    if (cita.estado !== 'programada') {
      throw new BadRequestException('Solo se pueden confirmar citas programadas');
    }
    await cita.update({ estado: 'confirmada' });
    
    await this.triggerN8nWebhook('cita-confirmed', cita);
    
    return cita;
  }

  async getDisponibilidad(profesionalId: string, fecha: string) {
    const appointments = await this.citaModel.findAll({
      where: {
        profesionalId,
        fecha,
        estado: { [Op.in]: ['programada', 'confirmada'] },
      },
      order: [['horaInicio', 'ASC']],
    });

    const slots = this.generateTimeSlots();
    const bookedHours = appointments.map(a => a.horaInicio);

    const availability = slots.map(slot => ({
      hora: slot,
      disponible: !bookedHours.includes(slot),
    }));

    return {
      fecha,
      profesionalId,
      slots: availability,
    };
  }

  private calculateEndTime(horaInicio: string): string {
    const parts = horaInicio.split(':').map(Number);
    const hours = parts[0] ?? 0;
    const minutes = parts[1] ?? 0;
    const endMinutes = hours * 60 + minutes + 50;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  }

  private async validateOverlap(fecha: string, horaInicio: string, horaFin: string, profesionalId: string, excludeId?: string) {
    const where: Record<string, unknown> = {
      profesionalId,
      fecha,
      estado: { [Op.in]: ['programada', 'confirmada'] },
    };

    if (excludeId) {
      (where as Record<string, unknown>).id = { [Op.ne]: excludeId };
    }

    const overlapping = await this.citaModel.findAll({ where });

    for (const cita of overlapping) {
      if (
        (horaInicio >= cita.horaInicio && horaInicio < (cita.horaFin || '00:00')) ||
        (horaFin > cita.horaInicio && horaFin <= (cita.horaFin || '00:00')) ||
        (horaInicio <= cita.horaInicio && horaFin >= (cita.horaFin || '00:00'))
      ) {
        throw new ConflictException('El horario seleccionado ya está ocupado');
      }
    }
  }

  private async validateWorkingHours(horaInicio: string, horaFin: string) {
    const start = parseInt(horaInicio.replace(':', ''));
    const end = parseInt(horaFin.replace(':', ''));

    if (start < 900 || end > 1800) {
      throw new BadRequestException('Los horarios de atención son de 09:00 a 18:00');
    }
  }

  private generateTimeSlots(): string[] {
    const slots: string[] = [];
    for (let hour = 9; hour < 18; hour++) {
      for (let min = 0; min < 60; min += 50) {
        const h = hour.toString().padStart(2, '0');
        const m = min.toString().padStart(2, '0');
        slots.push(`${h}:${m}`);
      }
    }
    return slots;
  }

  private async triggerN8nWebhook(event: string, data: Cita) {
    try {
      const webhookUrl = process.env.N8N_WEBHOOK_URL;
      if (webhookUrl) {
        await firstValueFrom(
          this.httpService.post(`${webhookUrl}/${event}`, {
            id: data.id,
            pacienteId: data.pacienteId,
            profesionalId: data.profesionalId,
            fecha: data.fecha,
            horaInicio: data.horaInicio,
            horaFin: data.horaFin,
            tipo: data.tipo,
            estado: data.estado,
            motivo: data.motivo,
          })
        );
      }
    } catch (error) {
      console.error('n8n webhook error:', error);
    }
  }
}