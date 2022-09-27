import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { User } from "../../users/models/user.model";
import { Task } from "./task.model";

@Table
export class TaskType extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  id: string;

  @ForeignKey(() => User)
  @Column
  userId: string;
  @BelongsTo(() => User)
  User: User;

  @Column
  taskType: string;
  @HasMany(() => Task)
  Task: Task;
}
