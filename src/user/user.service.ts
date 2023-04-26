import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './input/create-user.input';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserRoleType } from './user.enum';
import { format } from 'date-fns';
import { LoginWithEmailInput } from './input/email-login.input';
import { TokenPayload } from 'src/auth/auth-token-payload.interface';
import { LoginWithPhoneNumberInput } from './input/phone-number-login.input';
import { ChangePasswordInput } from './input/change.password.input';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async findAllUser() {
        return await this.userRepo.find();
    }

    async getUser(userId: string) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new UnauthorizedException('Invalid User');
        return user;
    }

    async registerAsUser(input: CreateUserInput) {
        const existUser = await this.userRepo.findOne({
            where: [
                { userName: input.userName },
                { email: input.email }
            ]
        });
        console.log(existUser);
        if (existUser) throw new ConflictException('userName or email already exist');
        const hashPassword = await bcrypt.hash(input.password, 12);
        const birthDate = format(new Date(input.birthDate), 'yyyy/MM/dd');
        try {
            return await this.userRepo.insert({
                firstName: input.firstName,
                lastName: input.lastName,
                userName: input.userName,
                email: input.email,
                phoneNumber: input.phoneNumber,
                nation: input.nation,
                birthDate,
                password: hashPassword,
                role: UserRoleType.USER,
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    async loginWithEmail(input: LoginWithEmailInput): Promise<{ accessToken: string; }> {
        const user = await this.validationUserPassword(input);
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials');
        }
        const payload: TokenPayload = { userId: user.id };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
        return { accessToken };
    }

    async loginWithPhoneNumber(input: LoginWithPhoneNumberInput): Promise<{ accessToken: string; }> {
        const user = await this.validationUserPasswordLoginPhoneNumber(input);
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials');
        }
        const payload: TokenPayload = { userId: user.id };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
        return { accessToken };
    }

    async changePassword(currentUser: string, input: ChangePasswordInput) {
        const user = await this.userRepo.findOne({ where: { id: currentUser } });
        if (!user) throw new UnauthorizedException('Invalid User');
        await this.matchPassword(input.oldPassword, user.password);
        if (input.newPassword !== input.confirmPassword) throw new ConflictException('New Password Not Confirmed');
        if (input.newPassword === input.oldPassword) throw new ConflictException('Old Password and New One are Same');
        const hashPassword = await bcrypt.hash(input.newPassword, 12);;
        return await this.userRepo.update(user.id, {
            password: hashPassword
        });
    }

    private async validationUserPassword(input: LoginWithEmailInput) {
        const user = await this.userRepo.findOne({ where: { email: input.email } });
        if (user) {
            await this.matchPassword(input.password, user.password);
            const userValidate = {
                id: user.id,
                email: user.email,
                password: user.password
            };
            return userValidate;
        } else {
            return null;
        }
    }

    private async validationUserPasswordLoginPhoneNumber(input: LoginWithPhoneNumberInput) {
        const user = await this.userRepo.findOne({ where: { phoneNumber: input.phoneNumber } });
        if (user) {
            await this.matchPassword(input.password, user.password);
            const userValidate = {
                id: user.id,
                email: user.email,
                password: user.password
            };
            return userValidate;
        } else {
            return null;
        }
    }

    private async matchPassword(password: string, hash: string) {
        const isMatched = hash && (await bcrypt.compare(password, hash));
        if (!isMatched) throw new ConflictException('incorrect Password');
    }
}