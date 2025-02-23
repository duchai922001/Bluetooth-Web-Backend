import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: "Tên danh mục không được để trống" })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: "url không được để trống" })
  url!: string;

  @IsString()
  @IsOptional()
  imageLogo!: string;

  @IsNumber()
  @IsNotEmpty({message: "Order không được để trống"})
  order?: number
}
