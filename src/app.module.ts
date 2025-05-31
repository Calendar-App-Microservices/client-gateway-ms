import { Module } from '@nestjs/common';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { NatsModule } from './nats/nats.module';

@Module({
  imports: [MedicalRecordModule, NatsModule],

})
export class AppModule {}
