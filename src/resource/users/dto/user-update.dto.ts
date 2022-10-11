import { ApiProperty } from "@nestjs/swagger";
import { IsString,  MaxLength, } from "class-validator";

export class UserUpdateDto {
  @ApiProperty({
    example: 'Batjin'
  })
  @IsString()
  @MaxLength(32)
  firstName: string;

  @ApiProperty({
    example: 'Boldbat'
  })
  lastName: string;

  @ApiProperty({
    example: 'Boldbat'
  })
  gender: string;

  @ApiProperty({
    example: 'Boldbat'
  })
  birthDate: string;

}