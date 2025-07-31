import {
  IsEmail,
  IsOptional,
  IsString,
  IsEnum,
  MinLength
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Jane Doe',
    description: 'Updated name of the user',
    minLength: 6
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  name?: string;

  @ApiPropertyOptional({
    example: 'jane.doe@example.com',
    description: 'Updated email address'
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    enum: ['USER', 'ADMIN'],
    example: 'ADMIN',
    description: 'Updated user role'
  })
  @IsOptional()
  @IsEnum(['USER', 'ADMIN'])
  role?: 'USER' | 'ADMIN';
}
