import { UUIDV4 } from "sequelize";
import { Model } from "sequelize-typescript";
import { Column, Table } from "sequelize-typescript";

@Table
export class TeamMember extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  id: string;

  @Column
  userId: string;

  @Column
  teamId: string;

  @Column
  teamRole: string;
}