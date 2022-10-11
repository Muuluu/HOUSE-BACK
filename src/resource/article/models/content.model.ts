import { UUIDV4 } from 'sequelize';
import { Column, Table, Model, BelongsTo, ForeignKey, } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Article } from './article.model';


@Table
export class Content extends Model {
  @Column({ primaryKey: true , defaultValue: UUIDV4()})
  id: string;
  @ForeignKey(() => Article)
  @Column
  articleId : string;
  @BelongsTo(() => Article)
  Article: Article;
  @Column
  type:ContentType
  @Column
  contentUrl:string
  

}

export enum ContentType {
    Video,
    Photo,
    Audio
}
