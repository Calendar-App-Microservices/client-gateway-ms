import { IsNotEmpty, IsUUID, IsArray, IsString } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsNotEmpty()
  @IsUUID()
  patientId: string;

  @IsNotEmpty()
  @IsUUID()
  professionalId: string;

  @IsArray()
  @IsString({ each: true })
  notes: string[];
}