import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator"


export class createStoryDto {
    @ApiProperty({ example: "Grateful for weather" })
    @IsString()
    @IsNotEmpty()
    text: string
}
export class CreateStorySeenDto {
    @ApiProperty({ example: "asdfasd0fdsadf90sdfas" })
    @IsString()
    @IsNotEmpty()
    storyId: string
}
export class FileSaveDto {
    @ApiProperty({ example: "file" })
    @IsString()
    @IsNotEmpty()
    file: string
    @ApiProperty({ example: "download.jpg" })
    @IsString()
    @IsNotEmpty()
    value: string
}
export class StorySeenList{
    @ApiProperty({ example: "hhhhhhh" })
    @IsString()
    @IsNotEmpty()
    storyId: string
}