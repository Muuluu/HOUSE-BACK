import {
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript"; 

import { User } from "../../users/models/user.model";
import { Task } from "./task.model";


@Table
export class AwaitedTasks extends Model {
  @ForeignKey(() => User)
  @Column
  userId: string;
  @BelongsTo(() => User)
  User: User;

  @ForeignKey(() => Task)
  @Column
  taskId: string;
  @BelongsTo(() => Task)
  Task: Task;

  @ForeignKey(() => User)
  @Column
  approveUserId: string;

  @Column
  status: boolean;
}
