import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guards';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'generated/prisma';

@Controller('reservations')
@UseGuards(JwtGuard, RolesGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() dto: CreateReservationDto, @CurrentUser() user: User) {
    return this.reservationService.create(dto, user.id);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.reservationService.findAll();
  }

  @Get('me')
  findMine(@CurrentUser() user: User) {
    return this.reservationService.findMine(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.reservationService.remove(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateReservationDto,
    @CurrentUser() user: User
  ) {
    return this.reservationService.update(id, dto, user.id);
  }
}
