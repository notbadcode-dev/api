import { QUERY } from "../../constants/query.constant";
import { connection } from "../../database";
import { TinyInt, TinyIntTypes } from "../enums/global.enum";
import { QueryHelper } from "../models/query.model";
import { User } from "../models/user.model";

export class GroupService {
  // public static selectGroupWhereUserId(
  //   userId: number,
  //   callback: CallableFunction
  // ): void {
  //   connection
  //     .query(
  //       QUERY.GROUP.SELECT_GROUP_WHERE_USER_ID_ORDER_BY_GROUP_ORDER_AND_GROUP_NAME(
  //         Number(userId)
  //       )
  //     )
  //     .then((result: User) => {
  //       callback(null, QueryHelper.mapToObject(result));
  //     })
  //     .catch((err) => {
  //       callback(err);
  //     });
  // }
  // public static async associateLinkToGroup(
  //   userId: number,
  //   linkId: number,
  //   groupId: number,
  //   active: TinyIntTypes,
  //   callback: CallableFunction
  // ): Promise<void> {
  //   const existLinkOnGroup = await this.existLinkOnGroup(userId, linkId, groupId).then((status: TinyInt) => {
  //     return status;
  //   });
  //   if (existLinkOnGroup === TinyInt.notExists) {
  //         connection
  //     .query(
  //       QUERY.GROUP.ASSOCIATE_LINK_TO_GROUP(
  //         Number(groupId),
  //         Number(userId)
  //       )
  //     )
  //     .then((result: User) => {
  //       callback(null, QueryHelper.mapToObject(result));
  //     })
  //     .catch((err) => {
  //       callback(err);
  //     });
  //   }
  //   if (existLinkOnGroup === TinyInt.downLogic) {
  //     connection
  //     .query(
  //       QUERY.LINK.ACTIVATE_AND_DEACTIVATE_LINK_FOR_USER_ID(
  //         TinyInt.highLogic
  //         Number(userId)
  //       )
  //     )
  //     .then((result: User) => {
  //       callback(null, QueryHelper.mapToObject(result));
  //     })
  //     .catch((err) => {
  //       callback(err);
  //     });
  //   }
  //   // connection
  //   //   .query(
  //   //     QUERY.GROUP.SELECT_GROUP_WHERE_USER_ID_ORDER_BY_GROUP_ORDER_AND_GROUP_NAME(
  //   //       Number(userId)
  //   //     )
  //   //   )
  //   //   .then((result: User) => {
  //   //     callback(null, QueryHelper.mapToObject(result));
  //   //   })
  //   //   .catch((err) => {
  //   //     callback(err);
  //   //   });
  // }
  // public static async existLinkOnGroup(userId: number, linkId:number, groupId: number): Promise<TinyIntTypes> {
  //   const existLinkOnGroupAndActive: boolean = await connection
  //     .query(
  //       QUERY.GROUP.EXIST_LINK_ON_GROUP_WHERE_USER_ID_AND_GROUP_ID_AND_PARAMETRIZE_ACTIVE(
  //         userId,
  //         linkId,
  //         groupId,
  //         TinyInt.downLogic
  //       )
  //     )
  //     .then((count: number) => {
  //       return count > 0;
  //     });
  //     if (existLinkOnGroupAndActive) {
  //       return TinyInt.notExists;
  //     }
  //     const existLinkOnGroupAndDeactive: boolean = await connection
  //     .query(
  //       QUERY.GROUP.EXIST_LINK_ON_GROUP_WHERE_USER_ID_AND_GROUP_ID_AND_PARAMETRIZE_ACTIVE(
  //         userId,
  //         linkId,
  //         groupId,
  //         TinyInt.downLogic
  //       )
  //     )
  //     .then((count: number) => {
  //       return count > 0;
  //     });
  //     if (existLinkOnGroupAndDeactive) {
  //       return TinyInt.downLogic;
  //     }
  //     return TinyInt.notExists
  // }
}
