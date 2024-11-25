import mongoose, { Schema, Document } from "mongoose";

export interface IProductSpecification extends Document {
  productId: string;
  name: string;
  value: string;
}

const ProductSpecificationSchema: Schema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const ProductSpecification = mongoose.model<IProductSpecification>(
  "ProductSpecification",
  ProductSpecificationSchema
);
