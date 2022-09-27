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
import { Task } from "./task.model";
import { TaskUser } from "./task_user.model";

@Table
export class CompleteTask extends Model {
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

  @Column
  completeDate: Date;

  @Column
  completeStatus: string;

  @Column
  fileUrl: string;

  @Column
  userApproval: boolean;
}
