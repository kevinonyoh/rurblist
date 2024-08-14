import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService, 
    private reflector: Reflector,
    private configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization'];

    if (!token) throw new UnauthorizedException('Valid token is required');

    const _token = token.replace(/(Bearer\s|bearer\s)/, '');
    

     const secret = this.configService.get<string>('secretKey');
     
    try {
      const decoded = await this.jwtService.verifyAsync(_token, { secret });
   
      request['user'] = decoded;
    } catch (err) {
      throw err;
    }

    return true;
  }
}
