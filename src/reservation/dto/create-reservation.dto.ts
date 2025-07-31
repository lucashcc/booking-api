import { IsDateString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @IsUUID()
  @ApiProperty({
    example: 'fd334c7a-9c17-4fd6-b1d4-1796f09d3a92',
    description: 'UUID of the room being reserved'
  })
  roomId!: string;

  @IsDateString()
  @ApiProperty({
    example: '2025-08-01T10:00:00.000Z',
    description: 'Start time of the reservation (ISO 8601)'
  })
  startTime!: Date;

  @IsDateString()
  @ApiProperty({
    example: '2025-08-01T12:00:00.000Z',
    description: 'End time of the reservation (ISO 8601)'
  })
  endTime!: Date;
}
