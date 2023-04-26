
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, MinLength, Matches } from 'class-validator';

export class ChangePasswordInput {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @MinLength(6)
    oldPassword: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @MinLength(6)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too week' }
    )
    newPassword: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @MinLength(6)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too week' }
    )
    confirmPassword: string;
}
