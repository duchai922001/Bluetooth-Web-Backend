import { IBlogRepository } from "../../domain/repositories/blog.repository";
import Blog, { IBlog } from "../model/blog.model";

export class BlogRepositoryImpl implements IBlogRepository {
  async getAllBlogs(): Promise<IBlog[]> {
    return await Blog.find();
  }
  [x: string]: any;
  async createBlog(data: IBlog): Promise<IBlog> {
    return await Blog.create(data);
  }
  async getBlogByTags(tags: string[]): Promise<IBlog[]> {
    return await Blog.find({ tags: { $in: tags } }).sort({ createdAt: -1 });
  }
  async getBlogByCategoryNewId(categoryNewId: string): Promise<IBlog[]> {
    return await Blog.find({ categoryNewId }).sort({ createdAt: -1 });
  }
}
