import { Controller, UseGuards, Body, Request, HttpException, Post, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';



import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create_article.dto';

@ApiTags("Article")
@Controller("article")

// @ApiBearerAuth("access-token")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }


  @Post('createArticle')
  createArticle(@Body() body: CreateArticleDto) {
    let sdfsd =this.articleService.createArticle(body)
    console.log("dsfds"+sdfsd)
     return "Амжилттай"
  }

  @Get('article')
  showArticle() {
    return this.articleService.showArticle()
  }


}



