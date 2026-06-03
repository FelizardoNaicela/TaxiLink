import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsString()
  province!: string;

  @IsString()
  district?: string;

  @IsString()
  region?: string;

  @IsNumber()
  onlineDrivers!: number;

  @IsNumber()
  price!: number;

  @IsString()
  type!: string;
}