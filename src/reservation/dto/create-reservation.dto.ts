import { IsDateString, IsUUID } from 'class-validator';

export class CreateReservationDto {
  @IsUUID()
  roomId!: string;

  @IsDateString()
  startTime!: Date;

  @IsDateString()
  endTime!: Date;
}
