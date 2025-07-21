import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  capacity!: number;

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}
