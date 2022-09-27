import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDeviceDto {
    @ApiProperty({ example: "asdfasd0fdsadf90sdfas" }) readonly fcmToken: string;
    @ApiPropertyOptional({ example: "ddd" }) readonly bundleId?: string;
    @ApiProperty({ example: "true" }) readonly body: boolean;
}