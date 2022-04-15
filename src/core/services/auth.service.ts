import { connection } from "../../database";
import { QueryHelper } from "../models/query.model";
import { User } from "../models/user/user.model";
import { HttpResponseService } from "./http-response.service";
import { TokenService } from "./token.service";
import { UserService } from "./user.service";

const AUTH_SQL_STATEMENT = {
  selectUserWhereUserNameAndParaphrase:
    "SELECT * FROM users WHERE userName = ? and paraphrase = ?",
};

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
      .query(AUTH_SQL_STATEMENT.selectUserWhereUserNameAndParaphrase, [
        userName,
        paraphrase,
      ])
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

      if (user) {
        callback(null, TokenService.verifyToken(token, Number(userId)));
      }
    });
  }
}
