import { QUERY } from "../../constants/query.constant";
import { connection } from "../../database";
import { User, VerifyUserToken } from "../models/user.model";
import { TokenService } from "./token.service";
import { UserService } from "./user.service";

export class AuthService {
  /**
   * @description SignIn with userName and paraphrase
   * @param  {string} userName
   * @param  {string} paraphrase
   * @param  {CallableFunction} callback
   * @returns void
   */
  public static signIn(
    userName: string,
    paraphrase: string,
    callback: CallableFunction
  ): void {
    connection
      .query(
        QUERY.AUTH.SELECT_USER_WHERE_USERNAME_AND_PHARAPHRASE(
          userName,
          paraphrase
        )
      )
      .then((result: User) => {
        if (result) {
          callback(null, TokenService.generateToken(result));
        } else {
          callback(null, null);
        }
      })
      .catch((err) => {
        callback(err);
      });
  }

  /**
   * @description Verify token for any user for keep session
   * @param  {string} userId
   * @param  {string} token
   * @param  {CallableFunction} callback
   */
  public static keepSession(
    userId: string,
    token: string,
    callback: CallableFunction
  ) {
    UserService.getUserById(userId, (error: Error, user: User) => {
      if (error || Number(user.id) !== Number(userId)) {
        callback(null, null);
      }
      const verifyUserToken: VerifyUserToken = TokenService.verifyToken(token);
      const userFromVerifyToken: User | null = verifyUserToken.user ?? null;
      if (user && userFromVerifyToken) {
        callback(null, Number(userId) === Number(userFromVerifyToken.id));
      }
    });
  }
}
