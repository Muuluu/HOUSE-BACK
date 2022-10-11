import { UUIDV4 } from 'sequelize';
import { Column, Table, Model, BelongsTo, ForeignKey, HasMany, } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Content } from './content.model';


@Table
export class Article extends Model {
  @Column({ primaryKey: true , defaultValue: UUIDV4()})
  id: string;
  @ForeignKey(() => User)
  @Column
  userid : string;
  @BelongsTo(() => User)
  User: User;
  @Column
  title : string;

  @Column
  date: string; 

  @Column
  description: string;


  @Column
  status:Satatustype

  @HasMany(() => Content)
  Content:Content
}

export enum Satatustype {
  Published,
  Unpublished
}
