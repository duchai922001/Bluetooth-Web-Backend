import mongoose, { Document, Schema } from "mongoose";

export interface IBrand extends Document {
  name: string;
  logo: string;
  isDeleted: boolean;
}

const BrandSchema: Schema = new Schema<IBrand>(
  {
    name: { type: String, required: true, unique: true },
    logo: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Brand = mongoose.model<IBrand>("Brand", BrandSchema);

export default Brand;
