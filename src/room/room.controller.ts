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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam
} from '@nestjs/swagger';

@ApiTags('Rooms')
@ApiBearerAuth()
@Controller('rooms')
@UseGuards(JwtGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({ status: 200, description: 'List of all rooms returned.' })
  findAll() {
    return this.roomService.findAll();
  }

  @Get('available')
  @ApiOperation({ summary: 'Get all available rooms' })
  @ApiResponse({
    status: 200,
    description: 'List of available rooms returned.'
  })
  findAvailable() {
    return this.roomService.findAvailable();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get room by ID' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @ApiResponse({ status: 200, description: 'Room details returned.' })
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Get(':id/with-reservations')
  @ApiOperation({ summary: 'Get room by ID with reservations' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @ApiResponse({
    status: 200,
    description: 'Room with reservation details returned.'
  })
  findWithReservations(@Param('id') id: string) {
    return this.roomService.findWithReservations(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new room (Admin only)' })
  @ApiResponse({ status: 201, description: 'Room created successfully.' })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a room (Admin only)' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @ApiResponse({ status: 200, description: 'Room updated successfully.' })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a room (Admin only)' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @ApiResponse({ status: 204, description: 'Room deleted successfully.' })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }

  @Patch(':id/toggle')
  @ApiOperation({ summary: 'Toggle room availability (Admin only)' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @ApiResponse({ status: 200, description: 'Room availability toggled.' })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  toggleAvailability(@Param('id') id: string) {
    return this.roomService.toggleAvailability(id);
  }
}
