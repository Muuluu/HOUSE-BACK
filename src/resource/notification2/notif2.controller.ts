import { NotificationService } from './notif2.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DeviceDto, NotificationDto } from './dto/notif2.dto';
import { UserAccessGuard } from "../../guard/user.guard";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@Controller('notification')
@UseGuards(UserAccessGuard)
@ApiTags("user")
@ApiBearerAuth("access-token")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async sendToDevice(@Body() notificationDto: NotificationDto, ) {
    return await this.notificationService.sendToDevice(notificationDto);
  }

  @Post('all')
  async sentAll(@Body() notificationDto: NotificationDto) {
    return await this.notificationService.sendAll(notificationDto);
  }
  @Post('allowNotif')
  async allowNotif(@Body() deviceDto: DeviceDto, user ) {
    return await this.notificationService.allowNotif(deviceDto, user);
  }
}