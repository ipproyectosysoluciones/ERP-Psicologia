import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Paciente } from './paciente.model';
import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';

@Module({
  imports: [SequelizeModule.forFeature([Paciente])],
  controllers: [PacientesController],
  providers: [PacientesService],
  exports: [PacientesService, SequelizeModule],
})
export class PacientesModule {}