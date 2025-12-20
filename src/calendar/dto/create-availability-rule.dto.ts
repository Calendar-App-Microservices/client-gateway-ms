import { IsEnum, IsInt, IsString, IsUUID, Min } from 'class-validator';
import { DayOfWeek } from '@prisma/client';

export class CreateAvailabilityRuleDto {
  @IsUUID()
  tenantId: string;

  @IsUUID()
  professionalId: string;

  @IsUUID()
  locationId: string;

  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;

  @IsString()
  startTime: string; // "09:00"

  @IsString()
  endTime: string;   // "13:00"

  @IsInt()
  @Min(5)
  slotDurationMin: number;
}
