import { IsNotEmpty, IsString } from "class-validator";

export class SpecificationDTO {
  @IsString()
  @IsNotEmpty({ message: "categoryId is required" })
  categoryId!: string;

  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  key!: string;

  @IsString()
  @IsNotEmpty({ message: "Value is required" })
  value!: string;
}
