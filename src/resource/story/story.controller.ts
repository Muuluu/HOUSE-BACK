import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";
import { UserAccessGuard } from "../../guard/user.guard";
import { createStoryDto, CreateStorySeenDto, StorySeenList } from "./dto";
import { Story } from "./models/story.model";
import { StoryService } from "./story.service";

@ApiTags("Story")
@Controller("story")
@UseGuards(UserAccessGuard)
@ApiBearerAuth("access-token")
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Get("stories")
  async getStories(@Request() { user }) {
    return await this.storyService.getStories(user._id);
  }

  @Get("me")
  async myStory(@Request() { user }) {
    const myStory = await this.storyService.myStory(user._id);
    return myStory;
  }
  @Post("create")
  async createStory(@Body() data: createStoryDto, @Request() { user }) {
    return await this.storyService.createStory(data.text, user._id);
  }
  @Post("seenstory")
  async seenStory(@Body() data: CreateStorySeenDto, @Request() { user }) {
    return await this.storyService.seenStory(data.storyId, user._id);
  }

  @Post("mystories")
  async myStories(@Request() { user }) {
    return await this.storyService.myStories(user._id);
  }
}
