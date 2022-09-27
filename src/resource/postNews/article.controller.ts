import { Controller, UseGuards,  Body, Request, HttpException, Post,Get} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


 
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create_post.dto';

@ApiTags("Article")
@Controller("article")

// @ApiBearerAuth("access-token")
export class ArticleController {
  constructor(private readonly ArticleService: ArticleService){}


@Post('createArticle')
createArticle(@Body()  body :CreateArticleDto){
  return this.ArticleService.createArticle(body);
}

}



