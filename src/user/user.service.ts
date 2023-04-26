import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './models/user.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async findAllUser() {
        return await this.userRepo.find();
    }

    // async register(input: CreateUserInput) {
    //     const existUser = await this.userRepo.findOne({
    //         where: {
    //             [Op.or]: [{ username: input.username }, { email: input.email }]
    //         }
    //     });
    //     if (existUser) throw new ConflictException('username or email already exist');

    //     const salt = await bcrypt.genSalt();
    //     const password = input.password;
    //     const hashPassword = await bcrypt.hash(password, salt);

    //     try {
    //         return await this.userRepo.create({
    //             username: input.username,
    //             email: input.email,
    //             salt: salt,
    //             password: hashPassword,
    //             isAdmin: input.isAdmin,
    //             nation: input.nation,
    //             phoneNumber: input.phoneNumber
    //         });
    //     } catch (error) {
    //         console.log(error.message);
    //     }

    // }

    // async signIn(input: LoginUserInput): Promise<{ accessToken: string; }> {
    //     const user = await this.validationUserPassword(input);
    //     console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', user);
    //     if (!user) {
    //         throw new UnauthorizedException('Invalid Credentials');
    //     }
    //     const payload: TokenPayload = { userId: user.id };
    //     const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
    //     return { accessToken };
    // }

    // async validationUserPassword(input: LoginUserInput) {
    //     const user = await this.userRepo.findOne({ where: { email: input.email } });
    //     if (user) {
    //         if (await user.validatePassword(input.password)) {
    //             const userValidate = {
    //                 id: user.id,
    //                 email: user.email,
    //                 isAdmin: user.isAdmin,
    //                 password: user.password
    //             };
    //             return userValidate;
    //         } else {
    //             throw new UnauthorizedException('Invalid Password');
    //         }
    //     } else {
    //         return null;
    //     }
    // }

    // async getUser(userId: string) {
    //     const user = await this.userRepo.findOne({ where: { id: userId } });
    //     if (!user) throw new UnauthorizedException('Invalid User');
    //     return user;
    // }
}