import { DeviceDto, NotificationDto } from './dto/notif2.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import {
  ConditionMessage,
  getMessaging,
  TokenMessage,
  TopicMessage,
} from 'firebase-admin/messaging';
import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../../../notification-service.json';
import { InjectModel } from '@nestjs/sequelize';
import { UserDevice } from './models/notification.model';

export type Message = TokenMessage | TopicMessage | ConditionMessage;

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(UserDevice) private userDeviceModel: typeof UserDevice,

  ) {
    initializeApp({
      credential: credential.cert(serviceAccount as ServiceAccount),
    });

  }
  async allowNotif(deviceDto: DeviceDto, userId) {
    this.userDeviceModel.create({deviceDto, userId: userId 
      }).then(() => {
      return "success"
    }).catch((ex) => {
      console.log(ex)
      throw new HttpException("Error connecting to microservice\n" + ex, 500);
    })
  }
  async sendToDevice(notificationDto: NotificationDto) {
    const { title, body, token } = notificationDto;

    const payload = {
      notification: {
        title,
        body,
      },
    };

    var art = await getMessaging().sendToDevice(token, payload);
    console.log(art)
  }

  async sendAll(notificationDto: NotificationDto) {
    const { title, body, token } = notificationDto;
    const message = {
      data: {
        title,
        body,
      },
      token: token,
    };

    // const message: Message;
    return await getMessaging()
      .send(message, true)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  }
}