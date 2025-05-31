import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { NATS_SERVICE } from '../config/services';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';

@Controller('medical_record')
export class MedicalRecordController {
  
    /* Nos conectamos al microservicio MedicalRecord, tenemos acceso a todo lo que esté expuesto en él */
    
  constructor(
    @Inject(NATS_SERVICE) private client: ClientProxy,
  ) {}

  @Post()
  createMedicalRecord(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.client.send(
      'createMedicalRecord',
      createMedicalRecordDto
    );
  }

  @Get()
  findAllMedicalRecord(@Query() paginationDto: PaginationDto) {
    return this.client.send({cmd:'findAllMedicalRecord'}, paginationDto);
  }

  @Get(':id')
  findOneMedicalRecord(@Param('id') id:string) {
    return this.client.send({cmd: 'find_one_medical_record'},{ id });
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
