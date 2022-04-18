import { resolve } from "path";
import { nextTick } from "process";
import { from } from "rxjs";

import { connection } from "../../database";
import { QueryHelper } from "../models/query.model";
import { SQLExecuteResult } from "../models/sql.model";
import { User, UserHelper } from "../models/user/user.model";
import { UtilDateService } from "../utils/util-date.service";

const USER_SQL_STATEMENT = {
  selectUserWhereId: "SELECT id, userName FROM users WHERE id = ?",
  selectUserWhereUserName: "SELECT id, userName FROM users WHERE userName = ?",
  createUser:
    "INSERT INTO users (id, userName, paraphrase, createdAt, lastAccessedAt)",
};

export class UserService {
  /**
   * @description Execute query for get any user by id
   * @param  {string} userId
   * @param  {CallableFunction} callback
   * @returns void - User callback function for get response
   */
  public static getUserById(userId: string, callback: CallableFunction): void {
    connection
      .query(USER_SQL_STATEMENT.selectUserWhereId, userId)
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
    return connection.query(
      USER_SQL_STATEMENT.selectUserWhereUserName,
      userName
    );
  }

  /**
   * @description Execute query for create user
   * @param  {User} newUser
   * @param  {CallableFunction} callback
   * @returns void - User callback function for get response
   */
  public static createUser(newUser: User, callback: CallableFunction): void {
    const getUserByUserName$ = from(this.getUserByUserName(newUser.userName));
    getUserByUserName$.subscribe({
      next: () => {
        const foundUser: any = UserHelper.mapToObject.bind(this) ?? null;
        if (foundUser && !foundUser.id) {
          const insertValues = ` value(null, '${newUser.userName}', '${
            newUser.paraphrase
          }', '${UtilDateService.formatDate(
            "YYYY-MM-DD HH:mm:ss"
          )}', null) RETURNING id, userName`;
          connection
            .execute(USER_SQL_STATEMENT.createUser + insertValues)
            .then((insertedUser: User) => {
              if (!insertedUser) {
                callback("Failed to create user");
              }

              return callback(null, insertedUser);
            })
            .catch((err) => {
              return callback(err.text);
            });
        } else {
          return callback("Already exist user with Username.");
        }
      },
      error: () => {
        callback(this);
      },
    });
  }
}
