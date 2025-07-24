import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guards';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('rooms')
@UseGuards(JwtGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get('available')
  findAvailable() {
    return this.roomService.findAvailable();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Get(':id/with-reservations')
  findWithReservations(@Param('id') id: string) {
    return this.roomService.findWithReservations(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }

  @Patch(':id/toggle')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  toggleAvailability(@Param('id') id: string) {
    return this.roomService.toggleAvailability(id);
  }
}
