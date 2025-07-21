import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    return this.prisma.room.create({
      data: createRoomDto
    });
  }

  async findAll() {
    return this.prisma.room.findMany();
  }

  async findAvailable() {
    return this.prisma.room.findMany({
      where: { available: true }
    });
  }

  async findOne(id: string) {
    const room = await this.prisma.room.findUnique({
      where: { id }
    });
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found.`);
    }
    return room;
  }

  async findWithReservations(id: string) {
    const room = await this.prisma.room.findUnique({
      where: { id },
      include: { reservations: true }
    });
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found.`);
    }
    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    await this.findOne(id);
    return this.prisma.room.update({
      where: { id },
      data: updateRoomDto
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.room.delete({
      where: { id }
    });
  }

  async toggleAvailability(id: string) {
    const room = await this.findOne(id);
    return this.prisma.room.update({
      where: { id },
      data: { available: !room.available }
    });
  }
}
