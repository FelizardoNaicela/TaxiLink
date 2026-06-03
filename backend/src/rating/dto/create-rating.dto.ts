import {
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class createRatingDto {
  @IsInt()
  groupId!: number;

  @IsInt()
  @Min(1)
  @Max(5)
  value!: number;
}