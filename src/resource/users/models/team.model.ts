import { UUIDV4 } from "sequelize";
import { Model } from "sequelize-typescript";
import { Column, Table } from "sequelize-typescript";

@Table
export class Team extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  id: string;

  @Column
  teamName: string;

  @Column
  createdUserId: string;

  @Column
  description: string;
}