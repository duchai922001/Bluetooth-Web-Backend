import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: "category name is required" })
  name!: string;
}
