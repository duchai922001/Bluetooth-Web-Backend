import mongoose, { Schema, Document } from "mongoose";

export interface IProductSpecification extends Document {
  categoryId: string;
  key: string;
  value: string;
}

const ProductSpecificationSchema: Schema = new Schema(
  {
    categoryId: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const ProductSpecification = mongoose.model<IProductSpecification>(
  "ProductSpecification",
  ProductSpecificationSchema
);
