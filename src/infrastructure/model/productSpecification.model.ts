import mongoose, { Schema, Document } from "mongoose";

export interface IProductSpecification extends Document {
  productId: string;
  key: string;
  value: string;
}

const ProductSpecificationSchema: Schema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

export const ProductSpecification = mongoose.model<IProductSpecification>(
  "ProductSpecification",
  ProductSpecificationSchema
);
