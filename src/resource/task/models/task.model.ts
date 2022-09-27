import { Column, Table, Model, HasMany, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { User } from 'src/resource/users/models/user.model';
import { TaskUser } from './task_user.model';
import { PassThrough } from 'stream';
import { TaskType } from './task_type.model';

@Table
export class Task extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  id: string;

  @ForeignKey(() => User)
  @Column
  createdUserId: string;
  @BelongsTo(() => User)
  User: User;

  @ForeignKey(()=> TaskType)
  @Column
  taskTypeId: string;
  @BelongsTo(()=>TaskType)
  TaskType: TaskType;

  @Column
  task: string;

  @Column
  approveUserId: string;

  @Column
  approveType: string; 

  @HasMany(()=> TaskUser)
  TUser: TaskUser;

  @BelongsToMany(() => User, {
    through: { model: () => TaskUser },
  })
  TaskUserInfo!: User[];

  @Column
  rrule: string;

  @Column
  endDate: Date;

  @Column
  startDate: Date;

  @Column
  frequency:string
}

//push notification