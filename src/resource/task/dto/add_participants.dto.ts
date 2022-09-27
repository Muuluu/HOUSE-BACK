import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class addParticipantsDto{

@ApiProperty({example: '87huygyt675675ffgxdxx'})
@IsString()
@IsNotEmpty()
userId: string;

@ApiProperty({example: 'juyuy98767dscxcbhb6'})
@IsString()
@IsNotEmpty()
taskId: string;
}

export class DateDto{
@ApiProperty({example: '2022-08-30'})
@IsString()
@IsNotEmpty()
date: Date;
}

export class CompleteRequestDto{
@ApiProperty({example:'2ae6a59f-882c-41a5-934f-ee4ce2dee97a'})
@IsString()
@IsNotEmpty()
taskId: string;

@ApiProperty({example:'https://images.pexels.com/photos/13025002/pexels-photo-13025002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'})
@IsString()
@IsNotEmpty()
fileUrl: string;
}



export class approveTaskDto{
    @ApiProperty({example:'2ae6a59f-882c-41a5-934f-ee4ce2dee97a'})
    @IsString()
    @IsNotEmpty()
    taskId: string;
}

export class addTaskTypeDto{
    @ApiProperty({example:'Well being'})
    @IsString()
    @IsNotEmpty()
    taskType: string;
}


export class addScoreHierarchyDto{
    @ApiProperty({example:'1'})
    @IsString()
    @IsNotEmpty()
    organizationId: string;

    @ApiProperty({example:'86dkjakdhuy7734j3u2h4ne'})
    @IsString()
    @IsNotEmpty()
    taskTypeId: string;

    @ApiProperty({example:'100'})
    @IsString()
    @IsNotEmpty()
    score: string;


}