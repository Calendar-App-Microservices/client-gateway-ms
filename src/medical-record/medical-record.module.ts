import { Module } from '@nestjs/common';
import { MedicalRecordController } from './medical-record.controller';
import { NatsModule } from '../nats/nats.module';

@Module({
  controllers: [MedicalRecordController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class MedicalRecordModule {}
