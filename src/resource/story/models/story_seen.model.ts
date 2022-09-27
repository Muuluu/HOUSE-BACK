import { UUIDV4 } from "sequelize";
import { BelongsTo, ForeignKey, Model } from "sequelize-typescript";
import { Column, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Story } from "./story.model";

@Table
export class StorySeen extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  id: string;

  @ForeignKey(() => Story)
  storyId: string;
  @BelongsTo(() => Story)
  Story: Story;

  @ForeignKey(() => User)
  userId: string;
  @BelongsTo(() => User) //One to Many
  User: User;
  @Column
  counts: number;
}
