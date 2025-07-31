import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @ApiPropertyOptional({ example: 'Updated Room Name' })
  name?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  description?: string;

  @ApiPropertyOptional({ example: 15 })
  capacity?: number;

  @ApiPropertyOptional({ example: false })
  available?: boolean;
}
