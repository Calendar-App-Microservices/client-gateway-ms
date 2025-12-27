import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateAppointmentByStaffDto {
  @IsUUID()
  tenantId: string;

  @IsUUID()
  professionalId: string;

  @IsUUID()
  patientId: string; // vendrá de patient-ms en el futuro

  @IsUUID()
  appointmentTypeId: string;

  @IsUUID()
  locationId: string;

  @IsDateString()
  startAt: string; // ISO

  @IsDateString()
  endAt: string;   // ISO

  @IsOptional()
  @IsString()
  patientName?: string;

  @IsOptional()
  @IsString()
  patientEmail?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  priceCents?: number;

  @IsOptional()
  @IsBoolean()
  depositPaid?: boolean;

  @IsUUID()
  createdByUserId: string; // secretaria/profesional (userId de auth-ms)
}
