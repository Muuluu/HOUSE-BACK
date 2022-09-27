import { UUIDV4 } from "sequelize";
import {
  BelongsTo,
  BelongsToMany,
  DataType,
  ForeignKey,
  HasMany,
  Model,
} from "sequelize-typescript";
import { Column, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";

import { StorySeenList } from "../dto";
import { StorySeen } from "./story_seen.model";

@Table
export class Story extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  id: string;
  @Column
  type: string;
  @Column(DataType.TEXT)
  text: string;
  @Column(DataType.TEXT)
  contentUrl: string;

  @ForeignKey(() => User)
  userId: string;
  @BelongsTo(() => User)
  User: User;

  @BelongsToMany(() => User, {
    through: { model: () => StorySeen },
  })
  SeenUsers!: User[];
  @HasMany(() => StorySeen)
  StorySeen: StorySeen;
}
