import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: "category name is required" })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: "url is required" })
  url!: string;
}
