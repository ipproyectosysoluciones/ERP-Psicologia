import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlantillaHistoria } from './models/plantilla-historia.model';
import { CreatePlantillaDto, UpdatePlantillaDto } from './dto';
import { TipoPlantilla } from '@erp/shared';

@Injectable()
export class PlantillasService implements OnModuleInit {
  constructor(
    @InjectModel(PlantillaHistoria)
    private readonly plantillaModel: typeof PlantillaHistoria,
  ) {}

  async onModuleInit() {
    await this.seedDefaultPlantillas();
  }

  private async seedDefaultPlantillas() {
    const count = await this.plantillaModel.count({ where: { activa: true } });
    if (count > 0) return;

    const defaults = [
      {
        nombre: 'Anamnesis Adulto',
        tipo: TipoPlantilla.ANAMNESIS,
        estructura: {
          campos: [
            { key: 'motivoConsulta', label: 'Motivo de consulta', type: 'textarea', required: true },
            { key: 'historiaPersonal', label: 'Historia personal', type: 'textarea', required: false },
            { key: 'historiaFamiliar', label: 'Historia familiar', type: 'textarea', required: false },
            { key: 'evaluacionActual', label: 'Evaluación actual', type: 'textarea', required: false },
          ],
        },
      },
      {
        nombre: 'Evolución Sesión',
        tipo: TipoPlantilla.EVOLUCION,
        estructura: {
          campos: [
            { key: 'fechaSesion', label: 'Fecha de sesión', type: 'date', required: true },
            { key: 'temasAbordados', label: 'Temas abordados', type: 'textarea', required: true },
            { key: 'avances', label: 'Avances', type: 'textarea', required: false },
            { key: 'dificultades', label: 'Dificultades', type: 'textarea', required: false },
            { key: 'planSiguiente', label: 'Plan para siguiente sesión', type: 'textarea', required: false },
          ],
        },
      },
      {
        nombre: 'Cierre de Tratamiento',
        tipo: TipoPlantilla.CIERRE,
        estructura: {
          campos: [
            { key: 'resumenGlobal', label: 'Resumen global del tratamiento', type: 'textarea', required: true },
            { key: 'logrosAlcanzados', label: 'Logros alcanzados', type: 'textarea', required: true },
            { key: 'recomendaciones', label: 'Recomendaciones', type: 'textarea', required: false },
            { key: 'seguimientoRecomendado', label: 'Seguimiento recomendado', type: 'textarea', required: false },
          ],
        },
      },
    ];

    for (const data of defaults) {
      await this.plantillaModel.create({ ...data, activa: true });
    }
  }

  async create(dto: CreatePlantillaDto, createdById: string): Promise<PlantillaHistoria> {
    return this.plantillaModel.create({
      nombre: dto.nombre,
      tipo: dto.tipo,
      estructura: dto.estructura,
      activa: true,
      createdById,
    });
  }

  async findAll(): Promise<PlantillaHistoria[]> {
    return this.plantillaModel.findAll({
      where: { activa: true },
      order: [['nombre', 'ASC']],
    });
  }

  async findOne(id: string): Promise<PlantillaHistoria> {
    const plantilla = await this.plantillaModel.findOne({
      where: { id, activa: true },
    });

    if (!plantilla) {
      throw new NotFoundException('Plantilla no encontrada');
    }

    return plantilla;
  }

  async update(id: string, dto: UpdatePlantillaDto): Promise<PlantillaHistoria> {
    const plantilla = await this.findOne(id);

    if (dto.nombre !== undefined) {
      plantilla.nombre = dto.nombre;
    }
    if (dto.tipo !== undefined) {
      plantilla.tipo = dto.tipo;
    }
    if (dto.estructura !== undefined) {
      plantilla.estructura = dto.estructura;
    }

    return plantilla.save();
  }

  async remove(id: string): Promise<void> {
    const plantilla = await this.findOne(id);
    plantilla.activa = false;
    await plantilla.save();
  }
}