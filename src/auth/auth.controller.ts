import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guards/jwt.guards';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'generated/prisma';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: 201,
    description: 'Returns the access token on successful login',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user information' })
  @ApiResponse({
    status: 200,
    description: 'Returns basic user information',
    schema: {
      example: {
        id: 'user-123',
        name: 'John Doe',
        email: 'john.doe@example.com'
      }
    }
  })
  getMe(@CurrentUser() user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
}
