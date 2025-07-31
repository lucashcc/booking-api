import { ApiProperty } from '@nestjs/swagger';

type UserRaw = {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
};

export class UserResponseDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-9101-1121-314151617181',
    description: 'Unique identifier (UUID)'
  })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address'
  })
  email: string;

  @ApiProperty({
    enum: ['USER', 'ADMIN'],
    example: 'USER',
    description: 'User role'
  })
  role: 'USER' | 'ADMIN';

  @ApiProperty({
    example: '2024-05-12T14:23:45.123Z',
    description: 'Date when the user was created'
  })
  createdAt: Date;

  constructor(user: UserRaw) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.createdAt = user.createdAt;
  }
}
