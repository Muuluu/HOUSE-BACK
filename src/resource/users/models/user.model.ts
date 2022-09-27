import { url } from "inspector";
import { UUIDV4 } from "sequelize";
import { BelongsToMany, Model } from "sequelize-typescript";
import { Column, Table } from "sequelize-typescript";
import { Task } from "../../task/models/task.model";
import { TaskUser } from "../../task/models/task_user.model";

@Table
export class User extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  userName: string;

  @Column
  profilePic: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  companyId: string;

  @Column
  role: string;

  @BelongsToMany(() => Task, {
    through: { model: () => TaskUser },
  })
  UserTask!: Task[];
}
