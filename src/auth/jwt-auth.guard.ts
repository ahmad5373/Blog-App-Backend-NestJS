import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("Please log in first to access this resource.");
    }
    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      request['user'] = payload; 
    } catch (error) {
        if (error.message === 'jwt expired') {
          throw new UnauthorizedException('Your session has expired. Please log in again.');
        } else if (error.message === 'invalid token') {
          throw new UnauthorizedException('Invalid token. Please log in again.');
        } else {
          throw new UnauthorizedException('Unauthorized access. Please log in.');
        }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
