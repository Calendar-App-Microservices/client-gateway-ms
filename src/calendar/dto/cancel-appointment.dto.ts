import { IsString, IsUUID } from 'class-validator';

export class CancelAppointmentDto {
  @IsUUID()
  appointmentId: string;

  @IsString()
  reason: string;

  @IsUUID()
  cancelledByUserId: string; // quién cancela (prof/secretaria/sistema)
}
