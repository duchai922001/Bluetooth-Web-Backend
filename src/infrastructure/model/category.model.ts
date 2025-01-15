import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  url: string;
  isDeleted: boolean;
  subCategories: string[];
  parentId: string | null;
}

const CategorySchema: Schema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    subCategories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    parentId: { type: Schema.Types.ObjectId, ref: "Category", default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
