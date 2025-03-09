import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  html: string;
  type: "brand" | "category" | "technology";
  brandId?: string;
  categoryId?: string;
}

const BlogSchema: Schema = new Schema<IBlog>(
  {
    html: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ["brand", "category", "technology"],
      required: true,
    },
    brandId: { type: String, default: null },
    categoryId: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Blog = mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
