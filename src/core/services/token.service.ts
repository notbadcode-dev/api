/* eslint-disable @typescript-eslint/no-explicit-any */
import "dotenv/config";

import jwt from "jsonwebtoken";

import { User, UserHelper } from "../models/user.model";

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
  public static verifyToken(token: string): any {
    return jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, decode: any) => {
        return {
          valid: !err,
          user: decode
            ? UserHelper.mapToObject(decode?.user[0])
            : UserHelper.defaultObject(),
          token: token,
          verifyError: err ?? null,
        };
      }
    );
  }

  /**
   * @description Generate secret from JWT_SECRET and user data.
   * @param  {User} user
   * @returns string
   */
  public generateSecretToken(user: User): string {
    return process.env.JWT_SECRET + user.userName + user.paraphrase;
  }
}
