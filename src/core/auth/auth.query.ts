import { ERROR_MESSAGE_AUTH } from "../../constants/error-message.constant";
import { QUERY } from "../../constants/query.constant";
import { connection } from "../../database";
import { User } from "../models/user.model";

export class AuthQuery {
  /**
   * @description Execute query for get token match username and paraphrase
   * @param  {string} userName
   * @param  {string} paraphrase
   * @param  {CallableFunction} callback
   * @returns {any} - Token or error message on callback function
   */
  public static async getToken(
    userName: string,
    paraphrase: string,
    callback: CallableFunction
  ): Promise<User | void> {
    const conn = await connection.getConnection();

    try {
      const resultQuery: User = await conn
        .query(
          QUERY.AUTH.SELECT_USER_WHERE_USERNAME_AND_PHARAPHRASE(
            userName,
            paraphrase
          )
        )
        .then((result: any) => result[0])
        .then((result: User) => result);

      if (!resultQuery) {
        return callback(null, null);
      }

      if (resultQuery) {
        return resultQuery;
      }
    } catch (err) {
      callback(ERROR_MESSAGE_AUTH.ERROR_ON_SEARCH_USERNAME_OR_PASSWORD);
    } finally {
      conn.end();
    }
  }
}
