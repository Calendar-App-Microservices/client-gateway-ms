import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { NATS_SERVICE } from '../config/services';
import { ClientProxy } from '@nestjs/microservices';

@Controller('calendar')
export class CalendarController {
  
    /* Nos conectamos al microservicio Calendar, tenemos acceso a todo lo que esté expuesto en él */
    
  constructor(
    @Inject(NATS_SERVICE) private client: ClientProxy,
  ) {}

  @Post()
  createCalendar(@Body() createCalendarDto: CreateCalendarDto) {
    return this.client.send(
      'createcalendar',
      createCalendarDto
    );
  }


}
