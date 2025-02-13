import mongoose, { Document, Schema } from "mongoose";
import { ProductStatus } from "../../domain/enums/product-status.enum";

export interface Variant {
  attributes: Record<string, string>;
  price: number;
  status?: ProductStatus;
  images: string[];
}
export interface IProduct extends Document {
  name: string;
  categoryId: Schema.Types.ObjectId;
  brandId: Schema.Types.ObjectId;
  description: string;
  price?: number;
  variants?: Variant[];
  stock: number;
  status: ProductStatus;
  isDeleted: boolean;
  imageThumbnailUrl: string;
  imageUrls: string[];
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
    description: { type: String, default: "" },
    price: {
      type: Number,
      required: function () {
        return !this.variants || this.variants.length === 0;
      },
    },
    variants: [
      {
        attributes: { type: Map, of: String, required: true },
        price: { type: Number, required: true },
        status: {
          type: String,
          enum: Object.values(ProductStatus),
          default: ProductStatus.AVAILABLE,
        },
        images: { type: [String] },
      },
    ],
    stock: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(ProductStatus),
      default: ProductStatus.AVAILABLE,
    },
    imageThumbnailUrl: { type: String, required: true },
    imageUrls: { type: [String] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
