import { IsNotEmpty, IsString } from "class-validator";

export class SpecificationDTO {
  @IsString()
  @IsNotEmpty({ message: "ProductId is required" })
  productId!: string;

  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: "Value is required" })
  value!: string;
}
