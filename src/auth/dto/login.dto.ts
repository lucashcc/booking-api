import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user'
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password of the user (minimum 6 characters)',
    minLength: 6
  })
  @IsString()
  @MinLength(6)
  password!: string;
}
