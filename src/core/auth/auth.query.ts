import * as mariadb from "mariadb";

import {
  ERROR_MESSAGE,
  ERROR_MESSAGE_AUTH,
} from "../../constants/error-message.constant";
import { QUERY } from "../../constants/query.constant";
import { connectionAuth } from "../../database";
import { UpdateQueryResult } from "../models/query.model";
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
    const connection = mariadb.createPool(connectionAuth);
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

  /**
   * @description Execute query for update last access user date
   * @param  {number} updateUserId
   * @param  {CallableFunction} callback
   * @returns {any} - Modified number users or error message on callback function
   */
  public static async updateLastAccessUserQuery(
    updateUserId: number,
    callback: CallableFunction
  ): Promise<number | void> {
    const connection = mariadb.createPool(connectionAuth);
    const conn = await connection.getConnection();

    try {
      const resultQuery: number = await conn
        .query(QUERY.AUTH.UPDATE_USER_WITH_LAST_ACCESS(updateUserId))
        .then((result: UpdateQueryResult) => {
          const affectedRows: number = result?.affectedRows ?? 0;

          if (affectedRows >= 1) {
            return affectedRows;
          }
          return 0;
        });

      return resultQuery;
    } catch (err) {
      callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("user"));
    } finally {
      conn.end();
    }
  }
}
