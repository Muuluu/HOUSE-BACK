import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Model, Sequelize } from "sequelize-typescript";
import { User } from "../users/models/user.model";
import { Story } from "./models/story.model";
import { StorySeen } from "./models/story_seen.model";
import { S3 } from "aws-sdk";

@Injectable()
export class StoryService {
  constructor(
    @InjectModel(Story) private storyModel: typeof Story,
    @InjectModel(StorySeen) private storySeenModel: typeof StorySeen,
    @InjectModel(User) private userModel: typeof User,
    private sequelize: Sequelize
  ) {
   // this.sequelize.sync().then((e)=>{console.log(e) }).catch((e )=>{ console.log(e) })
  }

  async createStory(text, userId) {
    const story = new this.storyModel({
      text: text,
      userId: userId,
    });
    const result = await story.save();
    return result.id;
  }

  async myStory(userId) {
    let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

    const story = this.storyModel.findAll({
      where: {
        userId: userId,
        createdAt: {
          [Op.gte]: yesterday,
        }
      },
      order: ["createdAt"]
    })

    return story;
  }

  async getStories(userId) {
    let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const stories = this.storyModel.findAll({
      attributes: [
        "id",
        "text",
        [this.sequelize.literal("`StorySeen`.`id` is not null"), "isSeen"],
      ],
      include: [{
        model: StorySeen,
        attributes: [],
        where: {
          userid: userId,
        },
        required: false,
      },
      {
        model: User,
        as: 'User',
        attributes: ["id", "userName", "profilePic"],
      },
      ],
      where: {
        userId: { [Op.ne]: userId },
        createdAt: {
          [Op.gte]: yesterday,
        },
      },
      order: [this.sequelize.literal('`StorySeen`.`id`'), "createdAt"],

    });
    return stories;
  }
  async seenStory( storyId: string,userId) {

    const tt = await this.storySeenModel.findOne({
      where: {
        userId: userId,
        storyId: storyId
      }
    })

    if (tt) {
  tt.update({
    counts:tt.counts+1
      })
      return 'Update Ok'
    }
    else {
      this.storySeenModel.create({
        userId: userId,
        storyId: storyId,
        counts: 1
      }).catch(ex=>{
        console.log(ex.message)
        //.catch(ex=>{console.log(ex.message)- aldaag oldog function
      })
      return 'Insert Ok'
    }
  }

  async myStories(userId) {
    let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const stories = this.storyModel.findAll({
      include: [{
        model: User,
        attributes: ['id', 'username', 'profilePic'],
        as: 'User'
      },
      {
        model: User,
        as: 'SeenUsers',
        attributes: ['id', 'username', 'profilePic'],
        through: { attributes: [] }

      },],
      where: {
        userId: userId,
        createdAt: {
          [Op.gte]: yesterday,
        }
      },
      order: ["createdAt"]
    })
    return stories;
  }
}
