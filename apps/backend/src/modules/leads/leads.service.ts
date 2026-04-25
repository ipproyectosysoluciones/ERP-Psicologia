import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lead } from './lead.model.js';
import { CreateLeadDto, UpdateLeadDto, LeadQueryDto } from './dto/lead.dto.js';
import { EmailService } from './email.service.js';

@Injectable()
export class LeadsService {
  constructor(
    @InjectModel(Lead)
    private leadModel: typeof Lead,
    private emailService: EmailService,
  ) {}

  async create(dto: CreateLeadDto): Promise<Lead> {
    const lead = await this.leadModel.create(dto as unknown as Partial<Lead>);
    this.emailService.sendLeadConfirmation({
      id: lead.id,
      nombre: lead.nombre,
      email: lead.email,
      origen: lead.origen,
      campaign: lead.campaign,
    }).catch((err) => console.error('[LeadsService] Email error:', err));
    return lead;
  }

  async findAll(query: LeadQueryDto): Promise<Lead[]> {
    const where: Record<string, unknown> = {};
    if (query.estado) where.estado = query.estado;
    if (query.origen) where.origen = query.origen;
    if (query.campaign) where.campaign = query.campaign;
    return this.leadModel.findAll({ where, order: [['fechaCreacion', 'DESC']] });
  }

  async findOne(id: string): Promise<Lead> {
    const lead = await this.leadModel.findByPk(id);
    if (!lead) throw new NotFoundException(`Lead ${id} no encontrado`);
    return lead;
  }

  async update(id: string, dto: UpdateLeadDto): Promise<Lead> {
    const lead = await this.findOne(id);
    return lead.update(dto);
  }

  async remove(id: string): Promise<void> {
    const lead = await this.findOne(id);
    await lead.destroy();
  }

  async updateEstado(id: string, estado: string): Promise<Lead> {
    const lead = await this.findOne(id);
    return lead.update({ estado, ultimoContacto: new Date() });
  }
}