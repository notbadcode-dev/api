/* eslint-disable @typescript-eslint/no-explicit-any */
import { from } from "rxjs";
import { ERROR_MESSAGE } from "../../constants/error-message.constant";

import { QUERY } from "../../constants/query.constant";
import { connection } from "../../database";
import { QueryHelper } from "../models/query.model";
import { User, UserHelper } from "../models/user.model";

export class UserService {
  /**
   * @description Execute query for get any user by id
   * @param  {string} userId
   * @param  {CallableFunction} callback
   * @returns void - User callback function for get response
   */
  public static getUserById(userId: string, callback: CallableFunction): void {
    connection
      .query(QUERY.USER.SELECT_USER_WHERE_ID(Number(userId)))
      .then((result: User) => {
        callback(null, QueryHelper.mapToObject(result));
      })
      .catch((err) => {
        callback(err);
      });
  }

  /**
   * @description Execute query for get any user by userName
   * @param  {string} userName
   * @param  {CallableFunction} callback
   * @returns void - User callback function for get response
   */
  private static getUserByUserName(userName: string): Promise<User> {
    return connection.query(QUERY.USER.SELECT_USER_WHERE_USERNAME(userName));
  }

  /**
   * @description Execute query for create user
   * @param  {User} newUser
   * @param  {CallableFunction} callback
   * @returns void - User callback function for get response
   */
  public static async createUser(
    newUser: User,
    callback: CallableFunction
  ): Promise<void> {
    const foundUser: User = await this.getUserByUserName(newUser.userName);

    if (foundUser && !foundUser.id) {
      connection
        .execute(QUERY.USER.CREATE_USER(newUser))
        .then((insertedUser: User) => {
          if (!insertedUser) {
            callback(ERROR_MESSAGE.FAILED_CREATE_ANY("user"));
          }

          return callback(null, insertedUser);
        })
        .catch((err) => {
          return callback(err.text);
        });
    } else {
      return callback(ERROR_MESSAGE.FAILED_CREATE_ANY("user"));
    }
  }
}
