import "dotenv/config";

import jwt from "jsonwebtoken";

import { User } from "../models/user/user.model";

export class TokenService {
  /**
   * @description Generate token for user
   * @param  {string} userId
   * @returns string
   */
  public static generateToken(user: User): any {
    const token = jwt.sign({ user }, process.env.JWT_SECRET ?? "", {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  }

  /**
   * @description Veirify token for any user
   * @param  {string} token
   * @param  {number} userId
   * @returns boolean - true if token is valid
   */
  public static verifyToken(token: string, userId: number): boolean {
    const user: any = jwt.verify(token, process.env.JWT_SECRET ?? "");
    return Number(userId) === Number(user["user"][0].id);
  }
}
