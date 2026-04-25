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
import { Usuario } from '../../users/user.model';

@Table({ tableName: 'plantillas_historia', timestamps: true })
export class PlantillaHistoria extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare nombre: string;

  @Column({
    type: DataType.ENUM(...Object.values(TipoPlantilla)),
    allowNull: false,
  })
  declare tipo: TipoPlantilla;

  @Column({ type: DataType.JSONB, allowNull: false })
  declare estructura: { campos: Array<{ key: string; label: string; type: string; required?: boolean; options?: string[]; placeholder?: string }> };

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare activa: boolean;

  @ForeignKey(() => Usuario)
  @Column(DataType.UUID)
  declare createdById: string;

  @BelongsTo(() => Usuario)
  declare createdBy: Usuario;
}