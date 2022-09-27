
// import { Injectable } from '@nestjs/common';
// import { IDevice } from './device.model';
// import { BaseDataService } from 'src/resource/device/base-data.service';
// import { InjectModel } from '@nestjs/sequelize';

// @Injectable()
// export class DeviceService extends BaseDataService {
//     constructor(@InjectModel(IDevice) private _deviceModel: typeof IDevice,) {
//         super();
//     }

//     async getDevice(projectId: string, customerId: string): Promise<IDevice> {
//         try {
//             return await this._deviceModel.findOne({ where: { projectId, customerId } });
//         } catch (error) {
//             return this.throwInternalServerError(error);
//         }
//     }

//     async getDevices(): Promise<any> {
//         try {
//             return await this._deviceModel.findOne();
//         } catch (error) {
//             return this.throwInternalServerError(error);
//         }
//     }

//     async saveDevice(data: IDevice): Promise<IDevice> {
//         if (data.projectId && data.customerId && data.token) {
//             try {
//                 return await this._deviceModel.create({ data });
//             } catch (error) {
//                 return this.throwInternalServerError(error);
//             }
//         }
//         return this.throwUnProcessableEntity();
//     }

//     async deleteDevice(projectId: string, customerId: string): Promise<any> {
//         try {
//             return await this._deviceModel.destroy({ where: { projectId, customerId } });
//         } catch (error) {
//             return this.throwInternalServerError(error);
//         }
//     }
// }