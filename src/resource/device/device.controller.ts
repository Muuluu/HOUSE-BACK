
// import { Get, Post, Body, Req, Res, Controller, Param, Put, Logger } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { CreateDeviceDto } from './create-device.dto';
// import { DeviceService } from './device.service';
// import { IDevice } from './device.model';
// // import { NotificationService } from '../../resource/notification/notification.service';
// // import { MessageDto } from '../../resource/notification/notification.dto';

// @Controller('device')
// @ApiTags('notification')
// export class DeviceController {
//     constructor(private readonly _deviceService: DeviceService, private readonly _messagingService: NotificationService, private readonly _loggerService: Logger) { }

//     @Get('device')
//     async getDevices(@Res() response): Promise<any> {
//         try {
//             const result = await this._deviceService.getDevices();
//             return response.send(result);
//         }
//         catch (err) {
//             return response.status(500).send(err);
//         }
//     }

//     @Put('/:projectId/:customerId')
//     async createDevice(
//         @Res() response,
//         @Param('projectId') projectId: string,
//         @Param('customerId') customerId: string,
//         @Body() body: CreateDeviceDto
//     ): Promise<any> {
//         try {
//             const fcmToken = body.fcmToken;
//             if (fcmToken) {
//                 const deviceObj = {
//                     projectId,
//                     customerId,
//                     token: fcmToken,
//                 } as IDevice;

//                 const result = await this._deviceService.saveDevice(deviceObj);
//                 return response.send({ status: 'success', message: `Device for '${projectId}' added successfully!` });
//             }
//             throw new Error('Unprocessable Entity');
//         }
//         catch (err) {
//             return response.send(err);
//         }
//     }

//     @Post('/:projectId/:customerId/messages')
//     async sendNotification(
//         @Res() response,
//         @Param('projectId') projectId: string,
//         @Param('customerId') customerId: string,
//         @Body() message: MessageDto): Promise<any> {
//         try {
//             const device: IDevice = await this._deviceService.getDevice(projectId, customerId);
//             if (device) {
//                 const fcmToken: string = device.token;
//                 const data = await this._messagingService.sendNotification(projectId, fcmToken, message);
//                 return response.send(data);
//             }
//             throw new Error('Unprocessable Entity');

//         }
//         catch (err) {
//             this._loggerService.error(err);
//             return response.status(500).send('Internal Server Error');
//         }
//     }
// }