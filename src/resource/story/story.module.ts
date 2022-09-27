import { HttpException, HttpStatus, Module } from "@nestjs/common";
import { StoryService } from "./story.service";
import { StoryController } from "./story.controller";
import { Story } from "./models/story.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { StorySeen } from "./models/story_seen.model";
import { User } from "../users/models/user.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Story, User, StorySeen]),
  ],
  controllers: [StoryController],
  providers: [StoryService],
  exports: [StoryService],
})
export class StoryModule {}
