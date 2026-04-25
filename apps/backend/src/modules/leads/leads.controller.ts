import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LeadsService } from './leads.service.js';
import { CreateLeadDto, UpdateLeadDto, LeadQueryDto } from './dto/lead.dto.js';

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo lead' })
  create(@Body() dto: CreateLeadDto) {
    return this.leadsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar leads con filtros' })
  findAll(@Query() query: LeadQueryDto) {
    return this.leadsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener lead por ID' })
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar lead' })
  update(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
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