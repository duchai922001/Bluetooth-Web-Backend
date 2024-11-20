import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  isDeleted: boolean;
}

const CategorySchema: Schema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
