import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { BlogController } from "../controllers/blog.controller";

const blogRoutes = Router();

blogRoutes.post("/create", catchAsync(BlogController.createBlog));
blogRoutes.post("/get-by-tags", catchAsync(BlogController.getBlogByTags));
blogRoutes.get(
  "/get-by-categoryNew/:categoryNewId",
  catchAsync(BlogController.getBlogByCategoryNewId)
);

export default blogRoutes;
