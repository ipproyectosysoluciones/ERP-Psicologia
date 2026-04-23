import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario, Rol } from './user.model';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([Usuario, Rol])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
