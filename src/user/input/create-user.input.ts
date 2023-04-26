import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength, minLength } from "class-validator";
import { UserRoleType } from '../user.enum';


export class CreateUserInput {
    @IsString()
    @ApiProperty()
    firstName: string;

    @IsString()
    @ApiProperty()
    lastName: string;

    @IsString()
    @ApiProperty()
    userName: string;

    @IsString()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    phoneNumber: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too week' }
    ) //uppercase , lowercase , number or special character
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    nation: string;

    @IsNotEmpty()
    @ApiProperty()
    birthDate: number;
}