import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Paciente } from '../pacientes/paciente.model';
import { Usuario } from '../users/user.model';

@Table({ tableName: 'citas', timestamps: true })
export class Cita extends Model {
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

  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare fecha: Date;

  @Column({ type: DataType.STRING(5), allowNull: false })
  declare horaInicio: string;

  @Column({ type: DataType.STRING(5) })
  declare horaFin: string;

  @Default('presencial')
  @Column({ type: DataType.ENUM('presencial', 'telemedicina') })
  declare tipo: 'presencial' | 'telemedicina';

  @Default('programada')
  @Column({
    type: DataType.ENUM('programada', 'confirmada', 'completada', 'cancelada', 'no-asistio'),
  })
  declare estado: 'programada' | 'confirmada' | 'completada' | 'cancelada' | 'no-asistio';

  @Column({ type: DataType.TEXT, allowNull: false })
  declare motivo: string;

  @Column(DataType.TEXT)
  declare notas?: string;

  @BelongsTo(() => Paciente)
  declare paciente: Paciente;

  @BelongsTo(() => Usuario, 'profesionalId')
  declare profesional: Usuario;
}