import "dotenv/config";

import jwt, { JsonWebTokenError, VerifyErrors } from "jsonwebtoken";

import {
  User,
  UserHelper,
  VerifyUserToken,
  VerifyUserTokenHelper,
} from "../models/user/user.model";

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
}
