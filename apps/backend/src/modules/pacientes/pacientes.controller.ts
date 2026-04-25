import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
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
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../auth/roles-guard.decorator';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@ApiTags('Pacientes')
@ApiBearerAuth('JWT-auth')
@Controller('pacientes')
@UseGuards(JwtAuthGuard)
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Get()
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  @ApiOperation({
    summary: 'List all patients / Listar todos los pacientes',
    description: `
## English
Returns a list of all active patients in the system.

## Español
Retorna una lista de todos los pacientes activos en el sistema.
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'List of patients / Lista de pacientes',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized / No autorizado',
  })
  async findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  @ApiOperation({
    summary: 'Get patient by ID / Obtener paciente por ID',
    description: `
## English
Returns a single patient by their unique identifier.

## Español
Retorna un solo paciente por su identificador único.
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'Patient UUID / UUID del paciente',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Patient found / Paciente encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found / Paciente no encontrado',
  })
  async findOne(@Param('id') id: string) {
    return this.pacientesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  @ApiOperation({
    summary: 'Create new patient / Crear nuevo paciente',
    description: `
## English
Creates a new patient record in the system. The DNI must be unique.

## Español
Crear un nuevo registro de paciente en el sistema. El DNI debe ser único.
    `,
  })
  @ApiBody({ type: CreatePacienteDto })
  @ApiResponse({
    status: 201,
    description: 'Patient created / Paciente creado',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data / Datos de entrada inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'DNI already exists / El DNI ya existe',
  })
  async create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
  }

  @Put(':id')
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  @ApiOperation({
    summary: 'Update patient / Actualizar paciente',
    description: `
## English
Updates an existing patient's information.

## Español
Actualizar la información de un paciente existente.
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'Patient UUID / UUID del paciente',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdatePacienteDto })
  @ApiResponse({
    status: 200,
    description: 'Patient updated / Paciente actualizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found / Paciente no encontrado',
  })
  async update(
    @Param('id') id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacientesService.update(id, updatePacienteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  @ApiOperation({
    summary: 'Soft delete patient / Eliminar paciente (soft delete)',
    description: `
## English
Marks a patient as inactive (soft delete). The patient data is preserved in the database.

## Español
Marcar un paciente como inactivo (soft delete). Los datos del paciente se preservan en la base de datos.
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'Patient UUID / UUID del paciente',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Patient deleted / Paciente eliminado',
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found / Paciente no encontrado',
  })
  async remove(@Param('id') id: string) {
    return this.pacientesService.remove(id);
  }
}