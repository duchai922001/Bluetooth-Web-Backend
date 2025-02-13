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
  @IsNotEmpty({ message: "Thuộc tính bắt buộc" })
  attributes!: Record<string, string>;

  @IsNumber()
  @IsNotEmpty({ message: "Giá sản phẩm bắt buộc" })
  price!: number;

  @IsEnum(ProductStatus, { message: "Trạng thái không hợp lệ" })
  @IsOptional()
  status?: ProductStatus;

  @IsOptional()
  @IsArray()
  images?: string[];
}

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty({ message: "Tên sản phẩm bắt buộc" })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: "Category bắt buộc" })
  categoryId!: string;

  @IsString()
  @IsNotEmpty({ message: "Nhãn hàng bắt buộc" })
  brandId!: string;

  @ValidateIf((o) => !o.variants || o.variants.length === 0)
  @IsNumber()
  @IsNotEmpty({ message: "Giá sản phẩm bắt buộc" })
  price!: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty({ message: "Kho hàng bắt buộc" })
  stock!: number;

  @IsEnum(ProductStatus, { message: "Trạng thái không hợp lệ" })
  @IsOptional()
  status?: ProductStatus;

  @IsString()
  @IsNotEmpty({ message: "Hình ảnh thumbnail bắt buộc" })
  imageThumbnailUrl!: string;

  @IsOptional()
  @IsArray()
  imageUrls?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDTO)
  @IsOptional()
  variants?: VariantDTO[];
}
