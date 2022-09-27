import { UUIDV4 } from "sequelize";
import { BelongsTo, ForeignKey, Model } from "sequelize-typescript";
import { Column, Table } from "sequelize-typescript";
import { User } from "src/resource/users/models/user.model";
@Table
export class UserDevice extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  id: string;;
  @ForeignKey(() => User)
  userId: string;
  @BelongsTo(() => User) //One to Many
  User: User;
  @Column
  fcmtoken: string;
  @Column
  macAddress: string;
  @Column //browser apple android
  device: string;
  @Column //ios13  android
  deviceOs: string;
  @Column ({defaultValue:'Active'})
  status: string;
}