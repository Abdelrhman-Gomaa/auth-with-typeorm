import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/models/user.model';
import { TokenPayload } from './auth-token-payload.interface';
import { Repository } from 'typeorm';
import { UserRoleType } from 'src/user/user.enum';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.header('Authorization').split(' ')[1];
        if (!token) throw new UnauthorizedException('Need Token');
        const { userId } = <TokenPayload>jwt.verify(token, process.env.JWT_SECRET);
        if (!userId) throw new UnauthorizedException(`Invalid token`);
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new UnauthorizedException(`Can't Find User`);
        if (user.role != UserRoleType.ADMIN) throw new UnauthorizedException(`You Not Allowed To Fetch this Part`);
        return true;
    }
}