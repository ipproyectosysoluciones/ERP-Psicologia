import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'leads',
  timestamps: true,
})
export class Lead extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  nombre!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  telefono!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  origen!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  campaign!: string;

  @Column({ type: DataType.ENUM('nuevo', 'contactado', 'calificado', 'convertido', 'descartado'), defaultValue: 'nuevo' })
  estado!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  notas!: string;

  @Column({ type: DataType.DATE, allowNull: true })
  ultimoContacto!: Date;

  @CreatedAt
  fechaCreacion!: Date;

  @UpdatedAt
  fechaActualizacion!: Date;
}