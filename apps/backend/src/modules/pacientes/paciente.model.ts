import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({ tableName: 'pacientes', timestamps: true })
export class Paciente extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING(20), allowNull: false, unique: true })
  declare dni: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare nombre: string;

  @Column({ type: DataType.STRING(100) })
  declare apellido: string;

  @Column({ type: DataType.DATEONLY })
  declare fechaNac: Date;

  @Column({ type: DataType.STRING(100) })
  declare contacto: string;

  @Column({ type: DataType.STRING(255) })
  declare direccion: string;

  @Column({ type: DataType.STRING(100) })
  declare obraSocial: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare activo: boolean;
}