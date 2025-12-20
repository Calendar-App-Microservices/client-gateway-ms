import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Modality } from '@prisma/client';

export class CreateAppointmentTypeDto {
  @IsUUID()
  tenantId: string;

  @IsUUID()
  professionalId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(5)
  durationMinutes: number;

  @IsEnum(Modality)
  modality: Modality;

  @IsInt()
  @Min(0)
  basePriceCents: number;

  @IsOptional()
  @IsBoolean()
  requireDeposit?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  depositCents?: number;
}
