import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';
import { Cita } from './cita.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Cita]),
    HttpModule,
  ],
  controllers: [CitasController],
  providers: [CitasService],
  exports: [CitasService],
})
export class CitasModule {}