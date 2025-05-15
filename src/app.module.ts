import { Module } from '@nestjs/common';
import { MedicalRecordModule } from './medical-record/medical-record.module';

@Module({
  imports: [MedicalRecordModule],

})
export class AppModule {}
