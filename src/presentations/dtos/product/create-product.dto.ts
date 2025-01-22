import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsObject,
  IsEnum,
  ValidateIf,
} from "class-validator";
import { Type } from "class-transformer";
import { ProductStatus } from "../../../domain/enums/product-status.enum";

export class VariantDTO {
  @IsObject()
  @IsNotEmpty({ message: "Attributes are required" })
  attributes!: Record<string, string>;

  @IsNumber()
  @IsNotEmpty({ message: "Price is required" })
  price!: number;

  @IsEnum(ProductStatus, { message: "Invalid status" })
  @IsOptional()
  status?: ProductStatus;
}

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: "CategoryId is required" })
  categoryId!: string;

  @IsString()
  @IsNotEmpty({ message: "BrandId is required" })
  brandId!: string;

  @ValidateIf((o) => !o.variants || o.variants.length === 0)
  @IsNumber()
  @IsNotEmpty({ message: "Base price is required" })
  price!: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty({ message: "Stock is required" })
  stock!: number;

  @IsEnum(ProductStatus, { message: "Invalid status" })
  @IsOptional()
  status?: ProductStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDTO)
  @IsOptional()
  variants?: VariantDTO[];
}
