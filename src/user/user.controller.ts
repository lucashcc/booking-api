import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guards';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'List of users returned successfully.',
    type: [UserResponseDto]
  })
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: UserResponseDto
  })
  async create(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(body);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID (admin or the user)' })
  @ApiParam({ name: 'id', description: 'UUID of the user' })
  @ApiResponse({
    status: 200,
    description: 'User found.',
    type: UserResponseDto
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<UserResponseDto> {
    return this.userService.findById(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID (admin or the user)' })
  @ApiParam({ name: 'id', description: 'UUID of the user' })
  @ApiResponse({
    status: 200,
    description: 'User updated.',
    type: UserResponseDto
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() data: UpdateUserDto
  ): Promise<UserResponseDto> {
    return this.userService.update(id, data);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user by ID (admin or the user)' })
  @ApiParam({ name: 'id', description: 'UUID of the user' })
  @ApiResponse({ status: 204, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<void> {
    await this.userService.delete(id);
  }
}
