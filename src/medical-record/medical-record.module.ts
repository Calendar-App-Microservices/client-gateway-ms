import { Module } from '@nestjs/common';
import { MedicalRecordController } from './medical-record.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MEDICAL_RECORD_SERVICE, envs } from '../config';

@Module({
  controllers: [MedicalRecordController],
  providers: [],
  imports: [
    ClientsModule.register([

      /* Conectamos el microservicio */

      { 
        name: MEDICAL_RECORD_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: envs.medicalRecordMicroserviceHost,
          port: envs.medicalRecordMicroservicePort
        }
      },  
    ])
  ]
})
export class MedicalRecordModule {}
