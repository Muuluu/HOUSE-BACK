import { ApiProperty } from "@nestjs/swagger";


export class UpdatePicDto {

  @ApiProperty()
  profilePic: string;
}