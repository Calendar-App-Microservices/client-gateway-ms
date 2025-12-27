import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class RequestAppointmentByPatientDto {
  @IsUUID()
  tenantId: string;

  @IsUUID()
  professionalId: string;

  @IsUUID()
  appointmentTypeId: string;

  @IsUUID()
  locationId: string;

  @IsDateString()
  startAt: string;

  @IsDateString()
  endAt: string;

  @IsOptional()
  @IsUUID()
  patientId?: string; // si ya existe en tu sistema de pacientes

  @IsString()
  patientName: string;

  @IsOptional()
  @IsEmail()
  patientEmail?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
