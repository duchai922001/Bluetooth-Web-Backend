import { IsOptional, IsString } from "class-validator";

export class FilterProductDto {
  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  brandId?: string;

  @IsString()
  @IsOptional()
  url?: string;
}
