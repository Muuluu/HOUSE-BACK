import { NotificationController } from './notif2.controller';
import { Module } from '@nestjs/common';
import { NotificationService } from './notif2.service';
import { Model } from 'sequelize-typescript';
import { UserDevice } from './models/notification.model';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [
    SequelizeModule.forFeature([UserDevice]),
 ],
})

export class NotificationModule {
}


