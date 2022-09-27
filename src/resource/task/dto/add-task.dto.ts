import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { messaging } from "firebase-admin";

export class addTaskDto {
  @ApiProperty({ example: "Bonding" })
  @IsString()
  @IsNotEmpty()
  taskType: string;

  @ApiProperty({ example: "Camping" })
  @IsString()
  @IsNotEmpty()
  task: string;

  @ApiProperty({ example: "2022-08-21" })
  @IsString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ example: "2022-09-21" })
  @IsString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ example: "1" })
  repeatEvery: string;

  @ApiProperty({ example: "year/month/week/day" })
  frequency: string;

  @ApiProperty({ example: "02" })
  month: string;

  @ApiProperty({ example: "12" })
  day: string;

  @ApiProperty({ example: "MO/TU/WE/TH/FR/SA/SU" })
  weekFrequency: string;

  @ApiProperty({ example: "17" })
  hour: string;

  @ApiProperty({ example: "30" })
  min: string;

  // @ApiProperty({ example: "781jhyt3evzny24",})
  // @IsString()
  // approveUserId: string;

  // @ApiProperty({ example: "fileUrl/userId",})
  // approveType: string;
}
