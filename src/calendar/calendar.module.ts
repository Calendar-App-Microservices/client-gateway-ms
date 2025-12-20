import { Module } from '@nestjs/common';
import { NatsModule } from '../nats/nats.module';

@Module({
  controllers: [CalendarController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class CalendarModule {}
