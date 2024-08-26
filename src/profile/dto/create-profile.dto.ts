import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsOptional()
  @IsMongoId()
  colorId?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  cardIds?: string[];

  @IsOptional()
  @IsNumber()
  saltsAmount?: number;

  @IsOptional()
  @IsNumber()
  waterAmount?: number;
}
