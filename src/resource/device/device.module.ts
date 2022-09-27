// import { Module, Logger } from '@nestjs/common';
// import { DeviceController } from './device.controller';
// import { DeviceService } from './device.service';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { IDevice } from './device.model';
// import { NotificationModule } from '../notification/notification.module';

// @Module({
//     imports: [
//         SequelizeModule.forFeature([IDevice]),
//         NotificationModule,
//     ],

//     controllers: [DeviceController],
//     providers: [Logger, DeviceService,],
// })
// export class DeviceModule { }