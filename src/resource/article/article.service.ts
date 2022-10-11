import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/models/user.model";
import { CreateArticleDto } from "./dto/create_article.dto";
import { Article } from "./models/article.model";
import { Content } from "./models/content.model";

@Injectable()
export class ArticleService {

    constructor(
        @InjectModel(Article) private articleModel: typeof Article,
        @InjectModel(Content) private contentModel: typeof Content,
    ) { }


    createArticle({ title, description, content }: CreateArticleDto) {
        return this.articleModel.create({

            title: title,
            description: description,
            // content: content
        }).then(art => {
            this.contentModel.create({
                articleId: art.id,
                contentUrl: content,
                type: "Video"
            }).then(cont => {
                console.log("hi")
                return art;
            }).catch(ex => {
                console.log(ex.message)
                // return ex;
            })

        }).catch(ex => {
            console.log(ex.message)
            return ex;
        })




    }

    async showArticle() {
        const s = this.articleModel.findAll({
            include: {
                model: User
            }
            // attributes: ['id','title', 'description'],

        },
        )

        return s;
    }
}
