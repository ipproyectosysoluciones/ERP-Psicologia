import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Paciente } from '../historias/models/paciente.model';

@Module({
  imports: [SequelizeModule.forFeature([Paciente])],
  exports: [SequelizeModule],
})
export class PacientesModule {}
