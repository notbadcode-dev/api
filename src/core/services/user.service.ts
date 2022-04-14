import { connection } from "../../database";
import { User, UserHelper } from "../models/user/user.model";

const USER_SQL_STATEMENT = {
  selectUserWhereId: "SELECT * FROM users WHERE id = ?",
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
        callback(null, UserHelper.mapToObject(result));
      })
      .catch((err) => {
        callback(err);
      });
  }
}
