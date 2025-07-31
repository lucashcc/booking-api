import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from 'src/room/room.module';
import { ReservationModule } from 'src/reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    RoomModule,
    ReservationModule
  ]
})
export class AppModule {}
