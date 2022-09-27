import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { CreateArticleDto } from "./dto/create_post.dto";
import { Article } from "./models/article.model";

@Injectable()
export class ArticleService {

    constructor(
        @InjectModel(Article) private model: typeof Article,
    ) {  }


    async createArticle({title,description,content}: CreateArticleDto) {
        const post = new this.model({
         
            title: title,
            description: description,
           content: content,
        })
        post.save();
        return post;
    }

}

   
