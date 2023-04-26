import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserInput {
    @IsString()
    @ApiProperty()
    phoneNumber: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @ApiProperty()
    password: string;
}