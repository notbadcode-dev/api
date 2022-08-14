import * as mariadb from "mariadb";

import { ERROR_MESSAGE } from "../constants/error-message.constant";
import { QUERY } from "../constants/query.constant";
import { UpdateQueryResult } from "../core/models/query.model";
import { connectionLinks } from "../database";

export class LinkGroupQuery {
  /**
   * @description Execute query for reorder link on group
   * @param  {number} order
   * @param  {number} groupId
   * @param  {number} lastPosition
   * @param  {CallableFunction} callback
   * @returns {any} - Modified number links or error message on callback function
   */
  public static async reorderLinkOnGroup(
    order: number,
    groupId: number,
    lastPosition: number,
    callback: CallableFunction
  ): Promise<number | any> {
    const connection = mariadb.createPool(connectionLinks);
    const conn = await connection.getConnection();

    try {
      const resultQuery: number | any = await conn
        .query(QUERY.GROUP.REORDER_LINK_ON_GROUP(order, groupId, lastPosition))
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
