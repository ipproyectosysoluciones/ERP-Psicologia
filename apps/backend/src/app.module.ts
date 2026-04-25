import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { HealthModule } from './modules/health/health.module';
import { HistoriasModule } from './modules/historias/historias.module';
import { PacientesModule } from './modules/pacientes/pacientes.module';
import { CitasModule } from './modules/citas/citas.module';
import { LeadsModule } from './modules/leads/leads.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USER', 'postgres'),
        password: config.get('DB_PASSWORD', 'changeme'),
        database: config.get('DB_NAME', 'erp_psicologia'),
        autoLoadModels: true,
        synchronize: config.get('NODE_ENV') === 'development',
        logging: false,
      }),
    }),
    AuthModule,
    UsersModule,
    HealthModule,
    HistoriasModule,
    PacientesModule,
    CitasModule,
    LeadsModule,
  ],
})
export class AppModule {}