import * as mariadb from "mariadb";

import { ERROR_MESSAGE } from "../constants/error-message.constant";
import { QUERY } from "../constants/query.constant";
import { UpdateQueryResult } from "../core/models/query.model";
import { User, UserHelper } from "../core/models/user.model";
import { AuthDataSource, connectionAuth } from "../database";
import { UserEntity } from "../entity/user.entity";

export class UserQuery {
  /**
   * @description Execute query for get any user by id
   * @param  {string} userId
   * @param  {CallableFunction} callback
   * @returns {any} - User or error message on callback function
   */
  public static async getUserByIdQuery(
    userId: number,
    callback: CallableFunction
  ): Promise<User | void> {
    const connection = mariadb.createPool(connectionAuth);
    const conn = await connection.getConnection();

    const userRepository = AuthDataSource.getRepository(UserEntity);

    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (user === null) {
      callback(ERROR_MESSAGE.FAILED_GET_ANY("user"));
    }

    if (user !== null) {
      return UserHelper.mapToObject(user);
    }

    // try {
    //   const resultQuery: User = await conn
    //     .query(QUERY.USER.SELECT_USER_WHERE_ID(userId))
    //     .then((result: any) => {
    //       return result[0];
    //     });

    //   if (resultQuery) {
    //     return resultQuery;
    //   }
    // } catch (err) {
    //   callback(ERROR_MESSAGE.FAILED_GET_ANY("user"));
    // } finally {
    //   conn.end();
    // }
  }

  /**
   * @description Execute query for get any user by userName
   * @param  {string} userName
   * @param  {CallableFunction} callback
   * @returns {any} - User or error message on callback function
   */
  public static async getUserByUserNameQuery(
    userName: string,
    callback: CallableFunction
  ): Promise<User | void> {
    const connection = mariadb.createPool(connectionAuth);
    const conn = await connection.getConnection();

    try {
      const resultQuery: User = await conn
        .query(QUERY.USER.SELECT_USER_WHERE_USERNAME(userName))
        .then((result: any) => {
          return result[0];
        });

      if (resultQuery) {
        return resultQuery;
      }
    } catch (err) {
      callback(ERROR_MESSAGE.FAILED_GET_ANY("user"));
    } finally {
      conn.end();
    }
  }

  /**
   * @description Execute query for create user
   * @param  {User} newUser
   * @param  {CallableFunction} callback
   * @returns {any} - Created user or error message on callback function
   */
  public static async createUserQuery(
    newUser: User,
    callback: CallableFunction
  ): Promise<User | void> {
    const connection = mariadb.createPool(connectionAuth);
    const conn = await connection.getConnection();

    try {
      const resultQuery: User | void = await conn
        .query(QUERY.USER.CREATE_USER(newUser))
        .then((result: any) => {
          const createdUser: User = result[0];

          if (createdUser) {
            return createdUser;
          }
        });

      return resultQuery;
    } catch (err) {
      callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("user"));
    } finally {
      conn.end();
    }
  }

  /**
   * @description Execute query for update user
   * @param  {User} updateUser
   * @param  {CallableFunction} callback
   * @returns {any} - Modified number users or error message on callback function
   */
  public static async UpdateUserQuery(
    updateUser: User,
    callback: CallableFunction
  ): Promise<number | void> {
    const connection = mariadb.createPool(connectionAuth);
    const conn = await connection.getConnection();

    try {
      const resultQuery: number = await conn
        .query(QUERY.USER.UPDATE_USER(updateUser))
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
