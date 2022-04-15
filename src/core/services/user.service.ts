import { connection } from "../../database";
import { QueryHelper } from "../models/query.model";
import { User } from "../models/user/user.model";

const USER_SQL_STATEMENT = {
  selectUserWhereId: "SELECT id, userName FROM users WHERE id = ?",
};

export class UserService {
  /**
   * @description Execute query for get any user by id
   * @param  {string} userId
   * @param  {CallableFunction} callback
   * @returns void
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
}
