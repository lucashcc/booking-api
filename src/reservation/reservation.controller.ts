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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam
} from '@nestjs/swagger';

@ApiTags('Reservations')
@ApiBearerAuth()
@Controller('reservations')
@UseGuards(JwtGuard, RolesGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new reservation' })
  @ApiResponse({ status: 201, description: 'Reservation created successfully' })
  create(@Body() dto: CreateReservationDto, @CurrentUser() user: User) {
    return this.reservationService.create(dto, user.id);
  }

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all reservations (admin only)' })
  @ApiResponse({ status: 200, description: 'List of all reservations' })
  findAll() {
    return this.reservationService.findAll();
  }

  @Get('me')
  @ApiOperation({ summary: 'Get logged-in user reservations' })
  @ApiResponse({ status: 200, description: 'User reservations' })
  findMine(@CurrentUser() user: User) {
    return this.reservationService.findMine(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a reservation by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Reservation ID' })
  @ApiResponse({ status: 200, description: 'Reservation found' })
  @ApiResponse({ status: 404, description: 'Reservation not found' })
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reservation by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Reservation ID' })
  @ApiResponse({ status: 200, description: 'Reservation deleted' })
  @ApiResponse({ status: 403, description: 'Unauthorized to delete' })
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.reservationService.remove(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a reservation' })
  @ApiParam({ name: 'id', type: 'string', description: 'Reservation ID' })
  @ApiResponse({ status: 200, description: 'Reservation updated' })
  @ApiResponse({ status: 403, description: 'Unauthorized to update' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateReservationDto,
    @CurrentUser() user: User
  ) {
    return this.reservationService.update(id, dto, user.id);
  }
}
