import {
  ERROR_MESSAGE,
  ERROR_MESSAGE_AUTH,
} from "../../constants/error-message.constant";
import { UserQuery } from "../../queries/user.query";
import { User, VerifyUserToken } from "../models/user.model";
import { TokenService } from "../token/token.service";
import { AuthQuery } from "./auth.query";
import { AuthAuxiliarService } from "./auth-auxiliar.service";

export class AuthService extends AuthAuxiliarService {
  private tokenService!: TokenService;

  constructor() {
    super();
    this.tokenService = new TokenService();
  }

  /**
   * @description SignIn with userName and paraphrase
   * @param  {string} userName
   * @param  {string} paraphrase
   * @param  {CallableFunction} callback - success: token, error: error message
   * @returns {any} - Callback function for get response with token or error message
   */
  async signIn(
    userName: string,
    paraphrase: string,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentsForSignIn(userName, paraphrase)) {
      return callback(ERROR_MESSAGE_AUTH.ERROR_ON_SEARCH_USERNAME_OR_PASSWORD);
    }

    const resultTokenQuery = await AuthQuery.getToken(
      userName,
      paraphrase,
      callback
    );

    if (!resultTokenQuery) {
      return callback(ERROR_MESSAGE_AUTH.ERROR_ON_SEARCH_USERNAME_OR_PASSWORD);
    }

    const resultUserQuery = await UserQuery.getUserByUserNameQuery(
      userName,
      callback
    );

    if (resultUserQuery) {
      const resultUpdateUser = await AuthQuery.updateLastAccessUserQuery(
        resultUserQuery.id,
        callback
      );

      if (!resultUpdateUser) {
        return callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("User"));
      }
    }

    return callback(null, this.tokenService.generateToken(resultTokenQuery));
  }

  /**
   * @description Verify token for any user for keep session
   * @param  {string} userId
   * @param  {string} token
   * @param  {CallableFunction} callback - success: boolean with available keep sesion with true or false, error: error message
   * @returns {any} - Callback function for get response with available keep sesion with true or false or error message
   */
  async keepSession(
    userId: number,
    token: string,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentsForKeepSession(userId, token)) {
      return callback(ERROR_MESSAGE_AUTH.ERROR_ON_KEEP_SESSION);
    }

    const resultUserQuery = await UserQuery.getUserByIdQuery(userId, callback);

    if (!resultUserQuery) {
      return callback(ERROR_MESSAGE_AUTH.ERROR_ON_KEEP_SESSION);
    }

    const verifyUserToken: VerifyUserToken =
      this.tokenService.verifyToken(token);
    const userFromVerifyToken: User | null = verifyUserToken.user ?? null;
    if (resultUserQuery && userFromVerifyToken) {
      return callback(null, Number(userId) === Number(userFromVerifyToken.id));
    }
  }
}
