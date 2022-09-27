import { Controller, UseGuards,  Body, Request, HttpException, Get} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAccessGuard } from 'src/guard/user.guard';
import { addTaskDto } from './dto/add-task.dto';
import { addParticipantsDto, addScoreHierarchyDto, addTaskTypeDto, approveTaskDto, CompleteRequestDto, DateDto } from './dto/add_participants.dto';
import { TaskService } from './task.service';

@ApiTags('Task')
@Controller('task')
@UseGuards(UserAccessGuard)
@ApiBearerAuth("access-token")
export class TaskController {
  constructor(private readonly taskService: TaskService){}


@Get('getmytasks')
getMyTask(@Request() { user }){
  return this.taskService.getMyTasks(user._id);
}

@Get('approve/list')
getList(@Request() { user }){
  return this.taskService.approveTaskList(user._id);
}

}