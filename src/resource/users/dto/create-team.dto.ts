import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { messaging } from "firebase-admin";

export class createTeamDto {
  @ApiProperty({ example: "IVY gjns" })
  @IsString()
  @IsNotEmpty()
  teamName: string;
  
  @ApiProperty({ example: "College Prep" })
  @IsString()
  @IsNotEmpty()
  teamType: string;

  @ApiProperty({ example: "20220821" })
  @IsString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ example: "20220821" })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: "20220921" })
  @IsString()
  @IsNotEmpty()
  endDate: Date;
}