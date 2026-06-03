import {
  IsInt,
  IsString,
} from 'class-validator';

export class CreateRideRequestDto {

  @IsString()
  description!: string;

  @IsInt()
  groupId!: number;
}