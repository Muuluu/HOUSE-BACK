import { HttpException, HttpStatus, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./resource/users/models/user.model";
import { UserModule } from "./resource/users/user.module";
import { SystemController } from "./resource/system/system.controller";
import { extname } from "path";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { Article } from "./resource/article/models/article.model";
import { ArticleModule } from "./resource/article/article.module";
import { Content } from "./resource/article/models/content.model";

export const multerOptions = {
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST
        ),
        false
      );
    }
  },

  storage: diskStorage({
    destination: "files/",

    filename: (req: any, file: any, cb: any) => {
      cb(null, `${uuidv4()}${extname(file.originalname)}`);
    },
  }),
};

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "13.215.139.119",
      port: 3306,
      username: "rtd",
      password: "Tiny722$",
      database: "muuluu",
      models: [
        User,
        Article,
        Content
      ],
    }),
    UserModule,
    ArticleModule,
    // TaskModule,
    // StoryModule,
  
   
  ],
  controllers: [SystemController],
  providers: [],
})
export class AppModule {}
