import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateReservationDto {
  @IsOptional()
  @IsString()
  roomId?: string;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;
}
