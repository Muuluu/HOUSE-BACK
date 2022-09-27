import { HttpException, HttpStatus, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./resource/users/models/user.model";
import { UserModule } from "./resource/users/user.module";
import { TaskModule } from "./resource/task/task.module";
import { Task } from "./resource/task/models/task.model";
import { StoryModule } from "./resource/story/story.module";
import { StorySeen } from "./resource/story/models/story_seen.model";
import { Story } from "./resource/story/models/story.model";
import { TaskUser } from "./resource/task/models/task_user.model";
import { SystemController } from "./resource/system/system.controller";
import { extname } from "path";
import { diskStorage } from "multer";
import { NotificationModule } from "./resource/notification2/notif2.module";
import { CompleteTask } from "./resource/task/models/task_complete.model";
import { AwaitedTasks } from "./resource/task/models/awaited_tasks.model";
import { TaskType } from "./resource/task/models/task_type.model";
import { ScoreHierarchy } from "./resource/task/models/score_hierarchy.model";
import { v4 as uuidv4 } from "uuid";
import { UserDevice } from "./resource/notification2/models/notification.model";
import { Article } from "./resource/postNews/models/article.model";
import { ArticleModule } from "./resource/postNews/article.module";

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
        Task,
        StorySeen,
        Story,
        TaskUser,
        CompleteTask,
        AwaitedTasks,
        TaskType,
        ScoreHierarchy,
        UserDevice,
        Article
      ],
    }),
    UserModule,
    ArticleModule,
    // TaskModule,
    // StoryModule,
    NotificationModule,
   
  ],
  controllers: [SystemController],
  providers: [],
})
export class AppModule {}
