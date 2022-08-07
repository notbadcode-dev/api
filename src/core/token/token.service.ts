/* eslint-disable @typescript-eslint/no-explicit-any */
import "dotenv/config";

import jwt from "jsonwebtoken";

import { User, UserHelper } from "../models/user.model";

export class TokenService {
  /**
   * @description Generate token for user
   * @param  {string} userId
   * @returns {string} - token for user
   */
  public static generateToken(user: User): any {
    if (user && user.id) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET ?? "", {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      return token;
    }

    return ";";
  }

  /**
   * @description Veirify token for any user
   * @param  {string} token
   * @returns {boolean} - valid: true, invalid: false
   */
  public static verifyToken(token: string): any {
    if (token && typeof token === "string" && token.length > 0) {
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

    return "";
  }

  /**
   * @description Generate secret from JWT_SECRET and user data.
   * @param  {User} user
   * @returns string
   */
  public generateSecretToken(user: User): string {
    if (user && user.id && user.userName && user.paraphrase) {
      return process.env.JWT_SECRET + user.userName + user.paraphrase;
    }

    return "";
  }
}
