import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './models/task.model';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UserService } from '../users/user.service';
import { User } from '../users/models/user.model';
import { TaskUser } from './models/task_user.model';
import { CompleteTask } from './models/task_complete.model';
import { AwaitedTasks } from './models/awaited_tasks.model';
import { TaskType } from './models/task_type.model';
import { ScoreHierarchy } from './models/score_hierarchy.model';


@Module({

    imports: [
        SequelizeModule.forFeature([Task, User, TaskUser, CompleteTask, AwaitedTasks, TaskType,
        ScoreHierarchy]),

    ],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule { }
