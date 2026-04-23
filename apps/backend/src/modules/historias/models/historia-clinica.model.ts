import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { TipoPlantilla } from '@erp/shared';
import { Paciente } from './paciente.model';
import { PlantillaHistoria } from './plantilla-historia.model';
import { Usuario } from '../../users/user.model';

@Table({ tableName: 'historias_clinicas', timestamps: true })
export class HistoriaClinica extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Paciente)
  @Column({ type: DataType.UUID, allowNull: false })
  declare pacienteId: string;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.UUID, allowNull: false })
  declare profesionalId: string;

  @ForeignKey(() => PlantillaHistoria)
  @Column(DataType.UUID)
  declare plantillaId: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare fecha: Date;

  @Column({ type: DataType.JSONB, allowNull: false })
  declare contenido: Record<string, unknown>;

  @Column({
    type: DataType.ENUM(...Object.values(TipoPlantilla)),
    allowNull: false,
  })
  declare tipoPlantilla: TipoPlantilla;

  @Column({ type: DataType.STRING(500) })
  declare diagnostico: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare activa: boolean;

  // Relaciones
  @BelongsTo(() => Paciente)
  declare paciente: Paciente;

  @BelongsTo(() => Usuario)
  declare profesional: Usuario;

  @BelongsTo(() => PlantillaHistoria)
  declare plantilla: PlantillaHistoria;
}