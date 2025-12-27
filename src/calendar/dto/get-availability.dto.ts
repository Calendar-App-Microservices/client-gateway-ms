import { IsDateString, IsUUID } from 'class-validator';

export class GetAvailabilityDto {
  @IsUUID()
  tenantId: string;

  @IsUUID()
  professionalId: string;

  @IsDateString()
  date: string; // "2025-12-13" (día específico)
}
