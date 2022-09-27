import { Module,  } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from './models/article.model';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';




@Module({

    imports: [
        SequelizeModule.forFeature([ Article ]),

    ],
  controllers: [ArticleController],
     providers: [ArticleService]
})
export class ArticleModule { }
