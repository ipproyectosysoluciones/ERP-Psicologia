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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
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

@ApiTags('Historias')
@ApiBearerAuth('JWT-auth')
@Controller('historias')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class HistoriasController {
  constructor(private readonly historiasService: HistoriasService) {}

  @Post()
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'ADMIN')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create clinical record / Crear historia clínica',
    description: `
## English
Creates a new clinical record for a patient. Requires professional authentication.

## Español
Crear una nueva historia clínica para un paciente. Requiere autenticación profesional.
    `,
  })
  @ApiBody({ type: CreateHistoriaDto })
  @ApiResponse({
    status: 201,
    description: 'Clinical record created / Historia clínica creada',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data / Datos de entrada inválidos',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden / Prohibido',
  })
  async create(@Body() dto: CreateHistoriaDto, @Request() req: { user: { sub: string; role: string } }) {
    return this.historiasService.create(dto, req.user.sub);
  }

  @Get()
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'ADMIN')
  @ApiOperation({
    summary: 'List clinical records / Listar historias clínicas',
    description: `
## English
Returns a paginated list of clinical records with optional filters.

## Español
Retorna una lista paginada de historias clínicas con filtros opcionales.
    `,
  })
  @ApiQuery({ type: HistoriaFiltersDto })
  @ApiResponse({
    status: 200,
    description: 'List of clinical records / Lista de historias clínicas',
  })
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
  @ApiOperation({
    summary: 'Get clinical records by patient / Obtener historias por paciente',
    description: `
## English
Returns all clinical records for a specific patient.

## Español
Retorna todas las historias clínicas de un paciente específico.
    `,
  })
  @ApiParam({
    name: 'pacienteId',
    description: 'Patient UUID / UUID del paciente',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Clinical records for patient / Historias del paciente',
  })
  async findByPaciente(@Param('pacienteId') pacienteId: string) {
    return this.historiasService.findByPaciente(pacienteId);
  }

  @Get(':id')
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'ADMIN')
  @ApiOperation({
    summary: 'Get clinical record by ID / Obtener historia por ID',
    description: `
## English
Returns a single clinical record. Non-admin users can only view their own records.

## Español
Retorna una sola historia clínica. Usuarios no-admin solo pueden ver sus propias historias.
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'Clinical record UUID / UUID de la historia',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Clinical record found / Historia encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Clinical record not found / Historia no encontrada',
  })
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
  @ApiOperation({
    summary: 'Update clinical record / Actualizar historia clínica',
    description: `
## English
Updates an existing clinical record. Non-admin users can only update their own records.

## Español
Actualizar una historia clínica existente. Usuarios no-admin solo pueden actualizar sus propias historias.
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'Clinical record UUID / UUID de la historia',
    type: String,
  })
  @ApiBody({ type: UpdateHistoriaDto })
  @ApiResponse({
    status: 200,
    description: 'Clinical record updated / Historia actualizada',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden / Prohibido',
  })
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
  @ApiOperation({
    summary: 'Delete clinical record (soft delete) / Eliminar historia clínica (soft delete)',
    description: `
## English
Marks a clinical record as deleted. Non-admin users can only delete their own records.

## Español
Marcar una historia clínica como eliminada. Usuarios no-admin solo pueden eliminar sus propias historias.
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'Clinical record UUID / UUID de la historia',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Clinical record deleted / Historia eliminada',
  })
  async remove(@Param('id') id: string, @Request() req: { user: { sub: string; role: string } }) {
    await this.historiasService.remove(id, req.user.sub);
    return { message: 'Historia eliminada correctamente' };
  }
}