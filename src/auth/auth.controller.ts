import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guards/jwt.guards';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'generated/prisma';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @Get('me')
  getMe(@CurrentUser() user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
}
