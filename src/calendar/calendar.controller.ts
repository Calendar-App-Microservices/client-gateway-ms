import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from '../config';

// DTOs del gateway (pueden ser iguales a los del calendar-ms)
import {
  CreateLocationDto,
  CreateAppointmentTypeDto,
  CreateAvailabilityRuleDto,
  GetAvailabilityDto,
  CreateAppointmentByStaffDto,
  RequestAppointmentByPatientDto,
  CancelAppointmentDto,
} from './dto';

@Controller('calendar')
export class CalendarController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  // Crear lugar de atención
  @Post('locations')
  createLocation(@Body() dto: CreateLocationDto) {
    return this.client.send('calendar.location.create', dto).pipe(
      catchError(error => {
        throw new RpcException(error);
      }),
    );
  }

  // Crear tipo de turno (consulta inicial, control, etc.)
  @Post('appointment-types')
  createAppointmentType(@Body() dto: CreateAppointmentTypeDto) {
    return this.client.send('calendar.appointmentType.create', dto).pipe(
      catchError(error => {
        throw new RpcException(error);
      }),
    );
  }

  // Crear regla de disponibilidad (día de semana, horario, sede)
  @Post('availability-rules')
  createAvailabilityRule(@Body() dto: CreateAvailabilityRuleDto) {
    return this.client.send('calendar.availabilityRule.create', dto).pipe(
      catchError(error => {
        throw new RpcException(error);
      }),
    );
  }

  // Obtener disponibilidad para un día
  @Get('availability')
  getAvailability(@Query() query: GetAvailabilityDto) {
    return this.client.send('calendar.availability.get', query).pipe(
      catchError(error => {
        throw new RpcException(error);
      }),
    );
  }

  // Crear turno desde panel (profesional / secretaria)
  @Post('appointments/by-staff')
  createAppointmentByStaff(@Body() dto: CreateAppointmentByStaffDto) {
    return this.client
      .send('calendar.appointment.create.byStaff', dto)
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        }),
      );
  }

  // Solicitar turno desde la web pública (paciente)
  @Post('appointments/request')
  requestAppointmentByPatient(@Body() dto: RequestAppointmentByPatientDto) {
    return this.client
      .send('calendar.appointment.request.byPatient', dto)
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        }),
      );
  }

  // Cancelar turno
  @Post('appointments/:id/cancel')
  cancelAppointment(
    @Param('id') id: string,
    @Body() body: { reason: string; cancelledByUserId: string },
  ) {
    const dto: CancelAppointmentDto = {
      appointmentId: id,
      reason: body.reason,
      cancelledByUserId: body.cancelledByUserId,
    };

    return this.client.send('calendar.appointment.cancel', dto).pipe(
      catchError(error => {
        throw new RpcException(error);
      }),
    );
  }
}
