import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class CreatePlaygroundDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNumber()
  readonly width?: number;

  @IsOptional()
  @IsNumber()
  readonly height?: number;

  @IsOptional()
  @IsNumber()
  readonly maxNoOfUsers?: number;

  @IsOptional()
  @IsNumber()
  readonly temperature?: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly userIds?: string[];
}
