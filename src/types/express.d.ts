import * as express from "express";
import { IUser } from "../infrastructure/model/user.model";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
