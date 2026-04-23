import { Table, Column, Model, DataType, Default, PrimaryKey } from 'sequelize-typescript';

@Table({ tableName: 'pacientes', timestamps: true })
export class Paciente extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare nombre: string;

  @Column({ type: DataType.STRING(20), allowNull: false, unique: true })
  declare dni: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare activo: boolean;
}