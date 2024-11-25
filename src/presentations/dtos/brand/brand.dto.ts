import { IsOptional, IsString } from "class-validator";

export class BrandDTO {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  logo?: string;
}
