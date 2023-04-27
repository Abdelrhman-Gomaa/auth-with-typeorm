import * as jwt from 'jsonwebtoken';
import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { TokenPayload } from './auth-token-payload.interface';
import { ErrorCodeEnum } from 'src/exceptions/error-code.enum';
import { BaseHttpException } from 'src/exceptions/base-http-exception';

export const CurrentUser = createParamDecorator((fieldName, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = request.header('Authorization').split(' ')[1];
    if (!token) throw new BaseHttpException(ErrorCodeEnum.UNAUTHORIZED);
    const { userId } = <TokenPayload>jwt.verify(token, process.env.JWT_SECRET);
    if (!userId) return false;
    return userId;
});
