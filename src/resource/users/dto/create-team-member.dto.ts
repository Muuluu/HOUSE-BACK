import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { messaging } from "firebase-admin";

export class createTeamMemberDto {
  @ApiProperty({ example: "6305eeb7c51b6fe64bb3a5dc" })
  @IsString()
  @IsNotEmpty()
  id: string;
  
  @ApiProperty({ example: "6305eeb7c51b6fe64bb3a5dc" })
  @IsString()
  @IsNotEmpty()
  userId: string;
  
  @ApiProperty({ example: "a606ec23-6235-4dcc-88e4-41a7e817d322" })
  @IsString()
  @IsNotEmpty()
  teamId: string;

  @ApiProperty({ example: "member" })
  @IsString()
  @IsNotEmpty()
  teamRole: Date;
}