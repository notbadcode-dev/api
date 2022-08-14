import * as mariadb from "mariadb";

import { ERROR_MESSAGE } from "../constants/error-message.constant";
import { QUERY } from "../constants/query.constant";
import { UserLinkDto } from "../core/models/link.model";
import { UpdateQueryResult } from "../core/models/query.model";
import { connectionLinks } from "../database";

export class LinkQuery {
  /**
   * @description Execute query for get link list by userId
   * @param  {string} userId
   * @param  {CallableFunction} callback
   * @returns {any} - Link list or error message on callback function
   */
  public static async getLinkListByUserIdQuery(
    userId: number,
    callback: CallableFunction
  ): Promise<UserLinkDto[] | any> {
    const connection = mariadb.createPool(connectionLinks);
    const conn = await connection.getConnection();

    try {
      const resultQuery: UserLinkDto[] | any = await conn.query(
        QUERY.LINK.SELECT_LINKS_BY_USER_ID(Number(userId))
      );

      if (resultQuery) {
        return resultQuery;
      }
    } catch (err) {
      callback(ERROR_MESSAGE.FAILED_GET_ANY("Link list"));
    } finally {
      conn.end();
    }
  }

  /**
   * @description Execute query for get link list by userId and Groupid
   * @param  {string} userId
   * @param  {CallableFunction} callback
   * @returns {any} - Link list or error message on callback function
   */
  public static async getLinkListByGroupIdQuery(
    userId: number,
    groupId: number,
    callback: CallableFunction
  ): Promise<UserLinkDto[] | any> {
    const connection = mariadb.createPool(connectionLinks);
    const conn = await connection.getConnection();

    try {
      const resultQuery: UserLinkDto[] | any = await conn.query(
        QUERY.LINK.SELECT_LINKS_BY_USER_ID_GROUP_ID(userId, groupId)
      );

      if (resultQuery) {
        return resultQuery;
      }
    } catch (err) {
      callback(ERROR_MESSAGE.FAILED_GET_ANY("Link list"));
    } finally {
      conn.end();
    }
  }

  /**
   * @description Execute query for get link list by userId and Groupid
   * @param  {string} userId
   * @param  {CallableFunction} callback
   * @returns {any} - link or error message on callback function
   */
  public static async getLinkLByUserIdAndLinkId(
    userId: number,
    linkId: number,
    callback: CallableFunction
  ): Promise<UserLinkDto | any> {
    const connection = mariadb.createPool(connectionLinks);
    const conn = await connection.getConnection();

    try {
      const resultQuery: UserLinkDto | any = await conn
        .query(QUERY.LINK.SELECT_LINK_BY_LINK_ID_AND_USER_ID(userId, linkId))
        .then((result: any) => result[0]);

      if (resultQuery) {
        return resultQuery;
      }
    } catch (err) {
      callback(ERROR_MESSAGE.FAILED_GET_ANY("Link"));
    } finally {
      conn.end();
    }
  }

  /**
   * @description Execute query for get link by url
   * @param  {string} linkUrl
   * @param  {CallableFunction} callback
   * @returns {any} - Link or error message on callback function
   */
  public static async getLinkLByUrl(
    linkUrl: string,
    callback: CallableFunction
  ): Promise<UserLinkDto | any> {
    const connection = mariadb.createPool(connectionLinks);
    const conn = await connection.getConnection();

    try {
      const resultQuery: UserLinkDto | any = await conn
        .query(QUERY.LINK.SELECT_LINK_BY_URL(linkUrl))
        .then((result: any) => result[0]);

      if (resultQuery) {
        return resultQuery;
      }
    } catch (err) {
      callback(ERROR_MESSAGE.FAILED_GET_ANY("Link"));
    } finally {
      conn.end();
    }
  }

  /**
   * @description Execute query for create link
   * @param  {number} userId
   * @param  {UserLinkDto} link
   * @param  {CallableFunction} callback
   * @returns {any} - Created link or error message on callback function
   */
  public static async createLink(
    userId: number,
    link: UserLinkDto,
    callback: CallableFunction
  ): Promise<UserLinkDto | any> {
    const connection = mariadb.createPool(connectionLinks);
    const conn = await connection.getConnection();

    try {
      const resultQuery: UserLinkDto | any = await conn
        .query(QUERY.LINK.CREATE_LINK(link.link, userId))
        .then((result: any) => result[0]);

      if (resultQuery) {
        return resultQuery;
      }
    } catch (err) {
      callback(ERROR_MESSAGE.FAILED_CREATE_ANY("Link"));
    } finally {
      conn.end();
    }
  }

  /**
   * @description Execute query for associate link to user
   * @param  {UserLinkDto} link
   * @param  {CallableFunction} callback
   * @returns {any} - Associated link list or error message on callback function
   */
  public static async associateLinkToUserLink(
    link: UserLinkDto,
    callback: CallableFunction
  ): Promise<UserLinkDto | any> {
    const connection = mariadb.createPool(connectionLinks);
    const conn = await connection.getConnection();

    try {
      const resultQuery: UserLinkDto | any = await conn
        .query(QUERY.LINK.ASSOCIATE_LINK_TO_USER_LINK(link))
        .then((result: any) => result[0]);

      if (resultQuery) {
        return resultQuery;
      }
    } catch (err) {
      callback(ERROR_MESSAGE.FAILED_ASSOCIATE_LINK_TO_USER_LINK(link.name));
    } finally {
      conn.end();
    }
  }

  /**
   * @description Execute query for update link
   * @param  {number} userId
   * @param  {UserLinkDto} link
   * @param  {CallableFunction} callback
   * @returns {any} - Modified number links or error message on callback function
   */
  public static async updateLink(
    userId: number,
    link: UserLinkDto,
    callback: CallableFunction
  ): Promise<number | any> {
    const connection = mariadb.createPool(connectionLinks);
    const conn = await connection.getConnection();

    try {
      const resultQuery: number | any = await conn
        .query(QUERY.LINK.UPDATE_LINK(link, userId))
        .then((result: UpdateQueryResult) => {
          const affectedRows: number = result?.affectedRows ?? 0;

          if (affectedRows >= 1) {
            return affectedRows;
          }
          return 0;
        });

      if (!resultQuery) {
        return callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("user"));
      }

      return resultQuery;
    } catch (err) {
      callback(ERROR_MESSAGE.FAILED_CREATE_ANY("Link"));
    } finally {
      conn.end();
    }
  }

  /**
   * @description Execute query for delete link
   * @param  {number} userId
   * @param  {number} userLinkId
   * @param  {CallableFunction} callback
   * @returns {any} -  Deleted link or error message on callback function
   */
  public static async deleteLink(
    userId: number,
    userLinkId: number,
    callback: CallableFunction
  ): Promise<UserLinkDto | any> {
    const connection = mariadb.createPool(connectionLinks);
    const conn = await connection.getConnection();

    try {
      const resultQuery: UserLinkDto | any = await conn
        .query(QUERY.LINK.DELETE_LINK(userLinkId, userId))
        .then((result: any) => result[0]);

      if (!resultQuery) {
        return callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("user"));
      }

      return resultQuery;
    } catch (err) {
      callback(ERROR_MESSAGE.FAILED_CREATE_ANY("Link"));
    } finally {
      conn.end();
    }
  }

  /**
   * @description Execute query for toggle favorite link
   * @param  {number} userId
   * @param  {number} userLinkId
   * @param  {CallableFunction} callback
   * @returns {any} - Modified number links or error message on callback function
   */
  public static async toggleFavoriteLink(
    userId: number,
    userLinkId: number,
    callback: CallableFunction
  ): Promise<number | any> {
    const connection = mariadb.createPool(connectionLinks);
    const conn = await connection.getConnection();

    try {
      const resultQuery: number | any = await conn
        .query(QUERY.LINK.TOGGLE_FAVORITE(userLinkId, userId))
        .then((result: UpdateQueryResult) => {
          const affectedRows: number = result?.affectedRows ?? 0;

          if (affectedRows >= 1) {
            return affectedRows;
          }
          return 0;
        });

      if (!resultQuery) {
        return callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("user"));
      }

      return resultQuery;
    } catch (err) {
      callback(ERROR_MESSAGE.FAILED_CREATE_ANY("Link"));
    } finally {
      conn.end();
    }
  }

  /**
   * @description Execute query for toggle active link
   * @param  {number} userId
   * @param  {number} userLinkId
   * @param  {CallableFunction} callback
   * @returns {any} - Modified number links or error message on callback function
   */
  public static async toggleActiveLink(
    userId: number,
    userLinkId: number,
    callback: CallableFunction
  ): Promise<number | any> {
    const connection = mariadb.createPool(connectionLinks);
    const conn = await connection.getConnection();

    try {
      const resultQuery: number | any = await conn
        .query(QUERY.LINK.TOGGLE_ACTIVE(userLinkId, userId))
        .then((result: UpdateQueryResult) => {
          const affectedRows: number = result?.affectedRows ?? 0;

          if (affectedRows >= 1) {
            return affectedRows;
          }
          return 0;
        });

      if (!resultQuery) {
        return callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("user"));
      }

      return resultQuery;
    } catch (err) {
      callback(ERROR_MESSAGE.FAILED_CREATE_ANY("Link"));
    } finally {
      conn.end();
    }
  }
}
