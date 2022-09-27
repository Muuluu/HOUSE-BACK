import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NotificationDto {
  @ApiProperty({ example: "token" })
  @IsString()
  token: string;
  @ApiProperty({ example: "sss" })
  @IsString()
  body: string;
  @ApiProperty({ example: "title" })
  @IsString()
  title: string;
}

export class DeviceDto {
  @ApiProperty({ example: "token" })
  @IsString()
  fcmtoken: string;
  @ApiProperty({ example: "sss" })
  @IsString()
  macAddress: string;
  @ApiProperty({ example: "title" })
  @IsString()
  deviceOs: string;
}
