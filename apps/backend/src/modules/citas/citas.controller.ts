import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
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
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../auth/roles-guard.decorator';
import { CitasService } from './citas.service';
import { CreateCitaDto, UpdateCitaDto, CitaFiltersDto } from './dto/cita.dto';

@ApiTags('Citas')
@ApiBearerAuth('JWT-auth')
@Controller('citas')
@UseGuards(JwtAuthGuard)
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Get()
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  @ApiOperation({
    summary: 'List appointments / Listar citas',
    description: `
## English
Returns a paginated list of appointments with optional filters.

## Español
Retorna una lista paginada de citas con filtros opcionales.
    `,
  })
  @ApiQuery({ type: CitaFiltersDto })
  @ApiResponse({
    status: 200,
    description: 'List of appointments / Lista de citas',
  })
  async findAll(@Query() filters: CitaFiltersDto) {
    return this.citasService.findAll(filters);
  }

  @Get('disponibilidad/:profesionalId')
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN', 'USER')
  @ApiOperation({
    summary: 'Get available time slots / Obtener horarios disponibles',
    description: `
## English
Returns available time slots for a professional on a specific date.

## Español
Retorna los horarios disponibles para un profesional en una fecha específica.
    `,
  })
  @ApiParam({
    name: 'profesionalId',
    description: 'Professional UUID / UUID del profesional',
    type: String,
  })
  @ApiQuery({
    name: 'fecha',
    description: 'Date (YYYY-MM-DD) / Fecha (AAAA-MM-DD)',
    type: String,
    example: '2025-04-25',
  })
  @ApiResponse({
    status: 200,
    description: 'Available slots / Horarios disponibles',
  })
  async getDisponibilidad(
    @Param('profesionalId') profesionalId: string,
    @Query('fecha') fecha: string,
  ) {
    return this.citasService.getDisponibilidad(profesionalId, fecha);
  }

  @Get(':id')
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN', 'USER')
  @ApiOperation({
    summary: 'Get appointment by ID / Obtener cita por ID',
    description: `
## English
Returns a single appointment by its unique identifier.

## Español
Retorna una sola cita por su identificador único.
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'Appointment UUID / UUID de la cita',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Appointment found / Cita encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Appointment not found / Cita no encontrada',
  })
  async findOne(@Param('id') id: string) {
    return this.citasService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  @ApiOperation({
    summary: 'Create appointment / Crear cita',
    description: `
## English
Creates a new appointment. Validates working hours and prevents overlapping.

## Español
Crear una nueva cita. Valida horario de trabajo y previene superposición.
    `,
  })
  @ApiBody({ type: CreateCitaDto })
  @ApiResponse({
    status: 201,
    description: 'Appointment created / Cita creada',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or working hours / Entrada inválida u horario',
  })
  @ApiResponse({
    status: 409,
    description: 'Time slot already booked / Horario ya ocupado',
  })
  async create(@Body() dto: CreateCitaDto) {
    return this.citasService.create(dto);
  }

  @Put(':id')
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  @ApiOperation({
    summary: 'Update appointment / Actualizar cita',
    description: `
## English
Updates an existing appointment.

## Español
Actualizar una cita existente.
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'Appointment UUID / UUID de la cita',
    type: String,
  })
  @ApiBody({ type: UpdateCitaDto })
  @ApiResponse({
    status: 200,
    description: 'Appointment updated / Cita actualizada',
  })
  @ApiResponse({
    status: 404,
    description: 'Appointment not found / Cita no encontrada',
  })
  async update(@Param('id') id: string, @Body() dto: UpdateCitaDto) {
    return this.citasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  @ApiOperation({
    summary: 'Cancel appointment / Cancelar cita',
    description: `
## English
Cancels an appointment (soft delete).

## Español
Cancelar una cita (soft delete).
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'Appointment UUID / UUID de la cita',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Appointment cancelled / Cita cancelada',
  })
  async remove(@Param('id') id: string) {
    return this.citasService.remove(id);
  }

  @Post(':id/confirm')
  @HttpCode(HttpStatus.OK)
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  @ApiOperation({
    summary: 'Confirm appointment / Confirmar cita',
    description: `
## English
Confirms a scheduled appointment.

## Español
Confirmar una cita programada.
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'Appointment UUID / UUID de la cita',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Appointment confirmed / Cita confirmada',
  })
  async confirm(@Param('id') id: string) {
    return this.citasService.confirm(id);
  }
}