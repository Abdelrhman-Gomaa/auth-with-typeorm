import { Body, Controller, Get, Post, Patch, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';
import { CreateUserInput } from './input/create-user.input';
import { LoginWithEmailInput } from './input/email-login.input';
import { LoginWithPhoneNumberInput } from './input/phone-number-login.input';
import { ChangePasswordInput } from './input/change.password.input';
import { CurrentUser } from 'src/auth/auth-user.decorator';
import { AdminGuard } from 'src/auth/admin.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @UseGuards(AdminGuard)
    @ApiOperation({ summary: "Find All User" })
    @Get()
    async findAllUser(): Promise<User[]> {
        return await this.userService.findAllUser();
    }

    @UseGuards(AdminGuard)
    @ApiOperation({ summary: "Find Current User Data" })
    @Get('/me')
    async me(@CurrentUser() currentUser: string): Promise<User> {
        return await this.userService.me(currentUser);
    }

    @ApiOperation({ summary: "Create A new User / Registration" })
    @Post('/registerAsUser')
    async register(@Body(ValidationPipe) input: CreateUserInput) {
        return await this.userService.registerAsUser(input);
    }

    @ApiOperation({ summary: "Login with Email to App" })
    @Post('/loginWithEmail')
    async loginWithEmail(@Body(ValidationPipe) input: LoginWithEmailInput): Promise<{ accessToken: string; }> {
        return await this.userService.loginWithEmail(input);
    }

    @ApiOperation({ summary: "Login with Phone Number to App" })
    @Post('/loginWithPhoneNumber')
    async loginWithPhoneNumber(@Body(ValidationPipe) input: LoginWithPhoneNumberInput): Promise<{ accessToken: string; }> {
        return await this.userService.loginWithPhoneNumber(input);
    }

    @ApiOperation({ summary: "Login with Phone Number to App" })
    @Patch('/changePassword')
    async changePassword(@CurrentUser() userId: string, @Body(ValidationPipe) input: ChangePasswordInput) {
        return await this.userService.changePassword(userId, input);
    }
}