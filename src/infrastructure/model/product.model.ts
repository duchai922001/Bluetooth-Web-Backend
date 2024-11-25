import mongoose, { Document, Schema } from "mongoose";
import { ProductStatus } from "../../domain/enums/product-status.enum";

export interface IProduct extends Document {
  name: string;
  categoryId: Schema.Types.ObjectId;
  brandId: Schema.Types.ObjectId;
  description: string;
  basePrice: number;
  variants: mongoose.Types.ObjectId[];
  specifications: mongoose.Types.ObjectId[];
  status: ProductStatus;
  isDeleted: boolean;
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    variants: [{ type: Schema.Types.ObjectId, ref: "ProductVariant" }],
    specifications: [
      { type: Schema.Types.ObjectId, ref: "ProductSpecification" },
    ],
    description: { type: String, default: "" },
    basePrice: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(ProductStatus),
      default: ProductStatus.AVAILABLE,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
