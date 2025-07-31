import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReservationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'fd334c7a-9c17-4fd6-b1d4-1796f09d3a92',
    description: 'UUID of the room (if changing reservation)'
  })
  roomId?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: '2025-08-01T11:00:00.000Z',
    description: 'New start time of the reservation (ISO 8601)'
  })
  startTime?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: '2025-08-01T13:00:00.000Z',
    description: 'New end time of the reservation (ISO 8601)'
  })
  endTime?: string;
}
