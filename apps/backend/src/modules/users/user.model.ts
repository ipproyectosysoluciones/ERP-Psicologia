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

@Table({ tableName: 'roles', timestamps: true })
export class Rol extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare nombre: string;

  @Column(DataType.STRING)
  declare descripcion: string;
}

@Table({ tableName: 'usuarios', timestamps: true })
export class Usuario extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare nombre: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare apellido: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare activo: boolean;

  @ForeignKey(() => Rol)
  @Column(DataType.UUID)
  declare rolId: string;

  @BelongsTo(() => Rol)
  declare rol: Rol;
}
