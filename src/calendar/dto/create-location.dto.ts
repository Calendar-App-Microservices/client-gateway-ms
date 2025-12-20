import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLocationDto {
  @IsUUID()
  tenantId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsBoolean()
  isOnline?: boolean;
}
