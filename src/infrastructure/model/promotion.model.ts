import mongoose, { Schema, Document } from "mongoose";
import { DiscountType } from "../../domain/enums/discount-type.enum";

export interface IPromotion extends Document {
  nameEvent: string;
  imageHeader: string;
  banner: string;
  listProducts: [];
  listImageEvent: string[];
  background: string;
  colorNavigation: string;
  startDate: string;
  endDate: string;
  discountType: DiscountType;
  discountPercent?: number;
  discountMoney?: number;
}

// const ProductEventSchema: Schema = new Schema(
//   {
//     listProducts: [
//       { type: Schema.Types.ObjectId, ref: "Product", required: true },
//     ],
//     imageCard: { type: String, required: true },
//   },
//   { _id: false }
// );

const PromotionSchema: Schema = new Schema(
  {
    nameEvent: { type: String, required: true },
    imageHeader: { type: String, required: true },
    banner: { type: String, required: true },
    listProducts: [{ type: String, ref: "Product", required: true }],
    listImageEvent: { type: [String], required: true },
    background: { type: String, required: true },
    colorNavigation: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    discountType: {
      type: String,
      enum: Object.values(DiscountType),
      required: true,
    },
    discountPercent: {
      type: Number,
      required: function (this: any) {
        return this.discountType === DiscountType.PERCENTAGE;
      },
    },
    discountMoney: {
      type: Number,
      required: function (this: any) {
        return this.discountType === DiscountType.MONEY;
      },
    },
  },
  { timestamps: true, versionKey: false }
);

export const Promotion = mongoose.model<IPromotion>(
  "Promotion",
  PromotionSchema
);
