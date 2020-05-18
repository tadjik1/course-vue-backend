import {
  ExecutionContext,
  Injectable,
  CanActivate,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const correctAdminKey = this.configService.get('adminKey');
    if (correctAdminKey && request.query.admin_key !== correctAdminKey) {
      throw new ForbiddenException('admin_key query parameter is not valid');
    }
    return true;
  }
}
