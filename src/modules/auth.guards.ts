import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IS_SECURED_KEY } from './auth.is-secured.decorator';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isSecured = this.reflector.getAllAndOverride(IS_SECURED_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!isSecured) return true;

    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['auth-token'] as string;
    if (!token) {
      throw new UnauthorizedException('No authorization token');
    }
    try {
      const secret = this.configService.get<string>('TOKEN_SECRET');
      request['token'] = await this.jwtService.verifyAsync(token, { secret });
    } catch (err) {
      console.log(err)
      throw new UnauthorizedException('Invalid authorization token');
    }
    return true
  }
}