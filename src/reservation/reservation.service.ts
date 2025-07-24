import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReservationDto, userId: string) {
    const { startTime, endTime, roomId } = dto;

    const start = new Date(startTime);
    const end = new Date(endTime);

    const startHour = start.getHours();
    const endHour = end.getHours();

    if (startHour < 8 || startHour >= 17 || endHour > 18 || end <= start) {
      throw new BadRequestException(
        'Reservations must start between 08:00 and 17:00 and end by 18:00. The end time must also be after the start time.'
      );
    }

    const conflictingReservation = await this.prisma.reservation.findFirst({
      where: {
        roomId,
        OR: [
          {
            startTime: {
              lt: end
            },
            endTime: {
              gt: start
            }
          },
          {
            startTime: {
              gte: start,
              lt: end
            }
          }
        ]
      }
    });

    if (conflictingReservation) {
      throw new ConflictException(
        'This room is already reserved for the selected time period.'
      );
    }

    return this.prisma.reservation.create({
      data: {
        ...dto,
        userId
      }
    });
  }

  async findAll() {
    return this.prisma.reservation.findMany({
      include: { user: true, room: true }
    });
  }

  async findMine(userId: string) {
    return this.prisma.reservation.findMany({
      where: { userId },
      include: { room: true }
    });
  }

  async findOne(id: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: { user: true, room: true }
    });
    if (!reservation) throw new NotFoundException('Reservation not found.');
    return reservation;
  }

  async remove(id: string, user: any) {
    const reservation = await this.findOne(id);
    if (user.role !== 'admin' && reservation.userId !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to delete this reservation.'
      );
    }
    await this.prisma.reservation.delete({ where: { id } });
    return { message: 'Reservation successfully deleted.' };
  }

  async update(id: string, dto: UpdateReservationDto, userId: string) {
    const reservationToUpdate = await this.prisma.reservation.findUnique({
      where: { id }
    });

    if (!reservationToUpdate) {
      throw new NotFoundException('Reservation not found.');
    }

    if (reservationToUpdate.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this reservation.'
      );
    }

    const start = dto.startTime
      ? new Date(dto.startTime)
      : new Date(reservationToUpdate.startTime);
    const end = dto.endTime
      ? new Date(dto.endTime)
      : new Date(reservationToUpdate.endTime);

    const startHour = start.getHours();
    const endHour = end.getHours();

    if (startHour < 8 || startHour >= 17 || endHour > 18 || end <= start) {
      throw new BadRequestException(
        'Reservations must start between 08:00 and 17:00 and end by 18:00. The end time must also be after the start time.'
      );
    }

    const conflict = await this.prisma.reservation.findFirst({
      where: {
        id: { not: id },
        roomId: dto.roomId ?? reservationToUpdate.roomId,
        startTime: {
          lt: end
        },
        endTime: {
          gt: start
        }
      }
    });

    if (conflict) {
      throw new ConflictException(
        'This room is already reserved for the selected time period.'
      );
    }

    return this.prisma.reservation.update({
      where: { id },
      data: {
        ...dto,
        startTime: dto.startTime ? new Date(dto.startTime) : undefined,
        endTime: dto.endTime ? new Date(dto.endTime) : undefined
      }
    });
  }
}
