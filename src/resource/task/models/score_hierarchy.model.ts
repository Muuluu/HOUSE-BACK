import {
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { User } from "../../users/models/user.model";
import { TaskType } from "./task_type.model";

@Table
export class ScoreHierarchy extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  id: string;

  @Column
  organizationId: string;

  @ForeignKey(() => User)
  @Column
  adminId: string;
  @BelongsTo(() => User)
  User: User;

  @ForeignKey(() => TaskType)
  @Column
  taskTypeId: string;

  @Column
  score: string;
}
