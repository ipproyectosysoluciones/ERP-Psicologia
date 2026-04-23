import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { HistoriasController } from './historias.controller';
import { HistoriasService } from './historias.service';
import { PlantillasController } from './plantillas.controller';
import { PlantillasService } from './plantillas.service';

import { HistoriaClinica } from './models/historia-clinica.model';
import { PlantillaHistoria } from './models/plantilla-historia.model';
import { Paciente } from './models/paciente.model';
import { Usuario } from '../users/user.model';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([HistoriaClinica, PlantillaHistoria, Paciente, Usuario]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET', 'dev-secret'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES_IN', '15m') },
      }),
    }),
  ],
  controllers: [HistoriasController, PlantillasController],
  providers: [
    HistoriasService,
    PlantillasService,
    RolesGuard,
  ],
  exports: [HistoriasService, PlantillasService],
})
export class HistoriasModule {}
