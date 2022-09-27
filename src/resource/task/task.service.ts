import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { arrayMaxSize } from "class-validator";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { User } from "../users/models/user.model";
import { addTaskDto } from "./dto/add-task.dto";
import {
  addParticipantsDto,
  addScoreHierarchyDto,
  addTaskTypeDto,
  approveTaskDto,
  CompleteRequestDto,
  DateDto,
} from "./dto/add_participants.dto";
import { AwaitedTasks } from "./models/awaited_tasks.model";
import { ScoreHierarchy } from "./models/score_hierarchy.model";
import { Task } from "./models/task.model";
import { CompleteTask } from "./models/task_complete.model";
import { TaskType } from "./models/task_type.model";
import { TaskUser } from "./models/task_user.model";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private taskModel: typeof Task,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(TaskUser) private taskUserModel: typeof TaskUser,
    @InjectModel(CompleteTask) private completeTaskModel: typeof CompleteTask,
    @InjectModel(AwaitedTasks) private awaitedTasksModel: typeof AwaitedTasks,
    @InjectModel(TaskType) private taskTypeModel: typeof TaskType,
    @InjectModel(ScoreHierarchy)
    private scoreHierarchyModel: typeof ScoreHierarchy,
    private sequelize: Sequelize
  ) {
    this.sequelize.sync();
  }

  async addTask(data: addTaskDto, userId: string) {
    const task = new this.taskModel({
      createdUserId: userId,
      taskType: data.taskType,
      task: data.task,
      // approveType: data.approveType,
      // approveUserId: data.approveUserId,
      rrule:
        "FREQ=" +
        data.frequency +
        ";INTERVAL=" +
        data.repeatEvery +
        ";BYMONTH=" +
        data.month +
        ";BYMONTHDATE=" +
        data.day +
        "WKFR=" +
        data.weekFrequency +
        ";BYHOUR=" +
        data.hour +
        ";BYMIN=" +
        data.min,
      //FREQ=YEARLY;INTERVAL=1;BYMONTH=2;BYMONTHDAY=12
      endDate: data.endDate,
      startDate: data.startDate,
      frequency: data.frequency,
    });

    await task.save();

    const taskUser = new this.taskUserModel({
      taskId: task.id,
      userId: userId,
    });
    await taskUser.save();

    return task;
  }

  async addParticipants(data: addParticipantsDto) {
    const newTask = new this.taskUserModel({
      userId: data.userId,
      taskId: data.taskId,
    });
    newTask.save();
    return newTask;
  }

  async getMyTasks(userId) {
    const tasks = this.taskModel.findAll({
      include: [
        {
          model: TaskUser,
          attributes: [],
          where: {
            userId: userId,
          },
          required: true,
        },
      ],
      order: ["createdAt"],
    });
    return tasks;
  }

  //udruur shuuh
  async searchByDate(userId, { date }: DateDto) {
    const task = await this.taskModel.findAll({
      include: [
        {
          model: TaskUser,
          attributes: [],
          where: {
            userId: userId,
          },
          required: true,
        },
      ],
      where: {
        startDate: {
        [Op.gte]: date,
        },
        endDate: {
          [Op.lte]: date,
        },
      },
    });

    return task;
  }

  async taskCompleteRequest(data: CompleteRequestDto, userId) {
    const task = await this.taskModel.findOne({ where: { id: data.taskId } });
    if (task.approveType == "userId") {
      const completeTask = await new this.completeTaskModel({
        userId: userId,
        taskId: data.taskId,
        completeStatus: "On Time",
        fileUrl: data.fileUrl,
        completeDate: new Date(),
      });
      await completeTask.save();

      const awaitingTask = await new this.awaitedTasksModel({
        userId: userId,
        taskId: data.taskId,
        approveUserId: task.approveUserId,
        status: false,
      });
      await awaitingTask.save();
      return completeTask;
    }

    if (task.approveType == "fileUrl") {
      const completedTask = await this.completeTaskModel.update(
        {
          completeStatus: true,
        },
        { where: { userId: userId } }
      );
      //onoog ni nemeh function
      return completedTask;
    }
  }

  async approveTaskList(userId) {
    const tasks = await this.awaitedTasksModel.findAll({
      include: [
        {
          model: Task,
          attributes: ["task"],
          where: {
            approveUserId: userId,
          },
          required: true,
        },
        {
          model: User,
          attributes: ["profilePic", "userName"],
          required: true,
        },
      ],
      where: {
        approveUserId: userId,
      },
      order: ["createdAt"],
    });
    return tasks;
  }

  async approveTask(data: approveTaskDto) {
    await this.awaitedTasksModel.update(
      {
        status: true,
      },
      { where: { taskId: data.taskId } }
    );
    await this.completeTaskModel.update(
      {
        completeStatus: true,
      },
      { where: { taskId: data.taskId } }
    );
    //onoo tootsoh
  }

  async addTaskType(data: addTaskTypeDto, userId) {
    const taskType = await new this.taskTypeModel({
      userId: userId,
      taskType: data.taskType,
    });
    await taskType.save();
    return taskType;
  }

  async addScoreHierarchy(data: addScoreHierarchyDto, userId) {
    const scoreHierarchy = await new this.scoreHierarchyModel({
      adminId: userId,
      organizationId: data.organizationId,
      taskTypeId: data.taskTypeId,
      score: data.score,
    });
    scoreHierarchy.save();
    return scoreHierarchy;
  }
}
