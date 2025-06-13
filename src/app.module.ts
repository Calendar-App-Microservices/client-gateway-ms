import { Module } from '@nestjs/common';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { NatsModule } from './nats/nats.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MedicalRecordModule, NatsModule, AuthModule],

})
export class AppModule {}
