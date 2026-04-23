import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { HistoriasService } from './historias.service';
import {
  CreateHistoriaDto,
  UpdateHistoriaDto,
  HistoriaFiltersDto,
} from './dto';
import { HistoriasFilters } from './interfaces/historias-filters.interface';

@Controller('historias')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class HistoriasController {
  constructor(private readonly historiasService: HistoriasService) {}

  @Post()
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'ADMIN')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateHistoriaDto, @Request() req: { user: { sub: string; role: string } }) {
    return this.historiasService.create(dto, req.user.sub);
  }

  @Get()
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'ADMIN')
  async findAll(@Query() query: HistoriaFiltersDto) {
    const filters: HistoriasFilters = {
      page: query.page,
      limit: query.limit,
      pacienteId: query.pacienteId,
      profesionalId: query.profesionalId,
      tipoPlantilla: query.tipoPlantilla,
      fechaDesde: query.fechaDesde,
      fechaHasta: query.fechaHasta,
    };
    return this.historiasService.findAll(filters);
  }

  @Get('paciente/:pacienteId')
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'ADMIN')
  async findByPaciente(@Param('pacienteId') pacienteId: string) {
    return this.historiasService.findByPaciente(pacienteId);
  }

  @Get(':id')
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'ADMIN')
  async findOne(@Param('id') id: string, @Request() req: { user: { sub: string; role: string } }) {
    const historia = await this.historiasService.findOne(id);
    if (req.user.role !== 'ADMIN') {
      const isOwner = await this.historiasService.validateOwnership(id, req.user.sub);
      if (!isOwner) {
        throw new ForbiddenException('No tienes permiso para ver esta historia');
      }
    }
    return historia;
  }

  @Put(':id')
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'ADMIN')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateHistoriaDto,
    @Request() req: { user: { sub: string; role: string } },
  ) {
    if (req.user.role !== 'ADMIN') {
      const isOwner = await this.historiasService.validateOwnership(id, req.user.sub);
      if (!isOwner) {
        throw new ForbiddenException('No tienes permiso para editar esta historia');
      }
    }
    return this.historiasService.update(id, dto);
  }

  @Delete(':id')
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'ADMIN')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @Request() req: { user: { sub: string; role: string } }) {
    await this.historiasService.remove(id, req.user.sub);
    return { message: 'Historia eliminada correctamente' };
  }
}