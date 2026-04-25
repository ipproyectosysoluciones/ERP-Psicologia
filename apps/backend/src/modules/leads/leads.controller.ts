import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { LeadsService } from './leads.service.js';
import { CreateLeadDto, UpdateLeadDto, LeadQueryDto } from './dto/lead.dto.js';

/**
 * Lead controller - Endpoints para gestión de Leads/Marketing
 * Lead controller - Endpoints for Lead/Marketing management
 */
@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  /**
   * Crear nuevo lead / Create new lead
   */
  @Post()
  @ApiOperation({ summary: 'Crear nuevo lead / Create new lead' })
  @ApiResponse({ status: 201, description: 'Lead creado exitosamente / Lead created successfully' })
  @ApiResponse({ status: 400, description: 'Datos inválidos / Invalid data' })
  create(@Body() dto: CreateLeadDto) {
    return this.leadsService.create(dto);
  }

  /**
   * Listar leads con filtros / List leads with filters
   */
  @Get()
  @ApiOperation({ summary: 'Listar leads con filtros / List leads with filters' })
  @ApiQuery({ name: 'estado', required: false, description: 'Filter by state / Filtrar por estado' })
  @ApiQuery({ name: 'origen', required: false, description: 'Filter by origin / Filtrar por origen' })
  findAll(@Query() query: LeadQueryDto) {
    return this.leadsService.findAll(query);
  }

  /**
   * Obtener lead por ID / Get lead by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener lead por ID / Get lead by ID' })
  @ApiParam({ name: 'id', description: 'Lead ID / ID del lead' })
  @ApiResponse({ status: 404, description: 'Lead no encontrado / Lead not found' })
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  /**
   * Actualizar lead / Update lead
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar lead / Update lead' })
  @ApiParam({ name: 'id', description: 'Lead ID / ID del lead' })
  @ApiResponse({ status: 404, description: 'Lead no encontrado / Lead not found' })
  update(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return this.leadsService.update(id, dto);
  }

  /**
   * Cambiar estado del lead / Change lead state
   */
  @Patch(':id/estado/:estado')
  @ApiOperation({ summary: 'Cambiar estado del lead / Change lead state' })
  @ApiParam({ name: 'id', description: 'Lead ID / ID del lead' })
  @ApiParam({ name: 'estado', description: 'New state / Nuevo estado' })
  updateEstado(@Param('id') id: string, @Param('estado') estado: string) {
    return this.leadsService.updateEstado(id, estado);
  }

  /**
   * Eliminar lead / Delete lead
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lead / Delete lead' })
  @ApiParam({ name: 'id', description: 'Lead ID / ID del lead' })
  @ApiResponse({ status: 204, description: 'Lead eliminado / Lead deleted' })
  remove(@Param('id') id: string) {
    return this.leadsService.remove(id);
  }
}
    return this.leadsService.update(id, dto);
  }

  @Patch(':id/estado/:estado')
  @ApiOperation({ summary: 'Cambiar estado del lead' })
  updateEstado(@Param('id') id: string, @Param('estado') estado: string) {
    return this.leadsService.updateEstado(id, estado);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lead' })
  remove(@Param('id') id: string) {
    return this.leadsService.remove(id);
  }
}