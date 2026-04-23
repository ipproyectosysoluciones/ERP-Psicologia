import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PlantillasService } from './plantillas.service';
import { CreatePlantillaDto, UpdatePlantillaDto } from './dto';

@Controller('historias/plantillas')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PlantillasController {
  constructor(private readonly plantillasService: PlantillasService) {}

  @Post()
  @Roles('ADMIN')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreatePlantillaDto,
    @Request() req: { user: { sub: string } },
  ) {
    return this.plantillasService.create(dto, req.user.sub);
  }

  @Get()
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'ADMIN')
  async findAll() {
    return this.plantillasService.findAll();
  }

  @Get(':id')
  @Roles('PSICOLOGO', 'PSIQUIATRA', 'ADMIN')
  async findOne(@Param('id') id: string) {
    return this.plantillasService.findOne(id);
  }

  @Put(':id')
  @Roles('ADMIN')
  async update(@Param('id') id: string, @Body() dto: UpdatePlantillaDto) {
    return this.plantillasService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.plantillasService.remove(id);
    return { message: 'Plantilla eliminada correctamente' };
  }
}