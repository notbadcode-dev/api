import { QUERY } from "../../../constants/query.constant";
import { connection } from "../../../database";
import { User, VerifyUserToken } from "../../models/user.model";
import { TokenService } from "../../token/token.service";
import { UserQuery } from "../../../queries/user.query";

export class AuthService {
  /**
   * @description SignIn with userName and paraphrase
   * @param  {string} userName
   * @param  {string} paraphrase
   * @param  {CallableFunction} callback - success: token, error: error message
   * @returns {any} - Callback function for get response with token or error message
   */
  public static signIn(
    userName: string,
    paraphrase: string,
    callback: CallableFunction
  ): any {
    connection
      .query(
        QUERY.AUTH.SELECT_USER_WHERE_USERNAME_AND_PHARAPHRASE(
          userName,
          paraphrase
        )
      )
      .then((result: User) => {
        if (result) {
          return callback(null, TokenService.generateToken(result));
        } else {
          return callback(null, null);
        }
      })
      .catch((err) => {
        return callback(err);
      });
  }

  /**
   * @description Verify token for any user for keep session
   * @param  {string} userId
   * @param  {string} token
   * @param  {CallableFunction} callback - success: boolean with available keep sesion with true or false, error: error message
   * @returns {any} - Callback function for get response with available keep sesion with true or false or error message
   */
  public static keepSession(
    userId: number,
    token: string,
    callback: CallableFunction
  ): any {
    UserQuery.getUserByIdQuery(userId, (error: Error, user: User) => {
      if (error || Number(user.id) !== Number(userId)) {
        return callback(null, null);
      }
      const verifyUserToken: VerifyUserToken = TokenService.verifyToken(token);
      const userFromVerifyToken: User | null = verifyUserToken.user ?? null;
      if (user && userFromVerifyToken) {
        return callback(
          null,
          Number(userId) === Number(userFromVerifyToken.id)
        );
      }
    });
  }
}
