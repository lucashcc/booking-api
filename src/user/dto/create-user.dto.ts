import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
    minLength: 6
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  name!: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address'
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'User password',
    minLength: 6
  })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiPropertyOptional({
    enum: ['USER', 'ADMIN'],
    example: 'USER',
    description: 'User role (optional)'
  })
  @IsOptional()
  @IsString()
  role?: 'USER' | 'ADMIN';
}
