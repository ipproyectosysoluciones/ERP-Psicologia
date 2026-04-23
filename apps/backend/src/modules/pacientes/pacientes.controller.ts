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
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../auth/roles-guard.decorator';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Controller('pacientes')
@UseGuards(JwtAuthGuard)
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Get()
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  async findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  async findOne(@Param('id') id: string) {
    return this.pacientesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  async create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
  }

  @Put(':id')
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  async update(
    @Param('id') id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacientesService.update(id, updatePacienteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'SECRETARIO', 'ADMIN')
  async remove(@Param('id') id: string) {
    return this.pacientesService.remove(id);
  }
}