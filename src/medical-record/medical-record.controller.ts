import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { MEDICAL_RECORD_SERVICE } from '../config/services';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../common';

@Controller('medical_record')
export class MedicalRecordController {
  
    /* Nos conectamos al microservicio MedicalRecord, tenemos acceso a todo lo que esté expuesto en él */
    
  constructor(
    @Inject(MEDICAL_RECORD_SERVICE) private medicalRecordClient: ClientProxy,
  ) {}

  @Post()
  createMedicalRecord() {
    return 'Crea una historia clínica';
  }

  @Get()
  findAllMedicalRecord(@Query() paginationDto: PaginationDto) {
    return this.medicalRecordClient.send({cmd:'findAllMedicalRecord'}, paginationDto); /* El segundo argumento es el payload, mandamos un objeto vacío */
  }

  @Get(':id')
  findOneMedicalRecord(@Param('id') id:string) {
    return this.medicalRecordClient.send({cmd: 'find_one_medical_record'},{ id });
  }

  @Delete(':id')
  deleteMedicalRecord(@Param('id') id:string) {
    return 'Elimina la historia clínica con el id' + id;
  }

  @Patch(':id')
  patchMedicalRecord(@Body() body: any) {
    return 'Actualiza la historia clínica';
  }




}
