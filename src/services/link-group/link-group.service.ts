import { ERROR_MESSAGE } from "../../constants/error-message.constant";
import {
  ReorderLinkRequestDto,
  ReorderLinkResponseDto,
  UserLinkDto,
} from "../../core/models/link.model";
import { LinkQuery } from "../../queries/link.query";
import { LinkGroupQuery } from "../../queries/link-group.query";
import { LinkGroupAuxiliarService } from "./link-group-auxiliar.service";

export class LinkGroupService extends LinkGroupAuxiliarService {
  /**
   * @description Reorder link on group
   * @param  {ReorderLinkRequestDto} reorderlinkRequest
   * @param  {number} userId
   * @param  {CallableFunction} callback - success: Link on new position and link on last position, error: error message
   * @returns {any} - Callback function for get response with link on new position and link on last position or error message
   */
  public static async reorderLink(
    reorderlinkRequest: ReorderLinkRequestDto,
    userId: number,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentForReorderLink(reorderlinkRequest, userId)) {
      return callback(ERROR_MESSAGE.FAILED_REORDER_LINK("link"));
    }

    const foundNewLinkonPosition: UserLinkDto | any =
      await LinkQuery.getLinkLByUserIdAndLinkId(
        userId,
        reorderlinkRequest.newLinkIdOnPosition,
        callback
      );
    const foundLastLinkonPosition: UserLinkDto | any =
      await LinkQuery.getLinkLByUserIdAndLinkId(
        userId,
        reorderlinkRequest.lastLinkIdOnPosition,
        callback
      );

    if (
      !this.verifyNewAndLastLinkForReorderLink(
        foundNewLinkonPosition,
        foundLastLinkonPosition
      )
    ) {
      return callback(
        ERROR_MESSAGE.FAILED_REORDER_LINK("link", foundNewLinkonPosition)
      );
    }

    const { groupId, newLinkIdOnPosition, lastLinkIdOnPosition } =
      reorderlinkRequest;
    const newOrder =
      foundNewLinkonPosition?.linkOrder ??
      foundNewLinkonPosition?.linkOrder ??
      0;
    const lastOrder =
      foundLastLinkonPosition?.linkOrder ??
      foundLastLinkonPosition?.linkOrder ??
      0;

    const resultReorderNewLink = await LinkGroupQuery.reorderLinkOnGroup(
      newOrder,
      groupId,
      newLinkIdOnPosition,
      callback
    );

    if (!resultReorderNewLink) {
      return callback(
        ERROR_MESSAGE.FAILED_REORDER_LINK("link", foundNewLinkonPosition)
      );
    }

    const resultReorderLastLink = await LinkGroupQuery.reorderLinkOnGroup(
      lastOrder,
      groupId,
      lastLinkIdOnPosition,
      callback
    );

    if (!resultReorderLastLink) {
      return callback(
        ERROR_MESSAGE.FAILED_REORDER_LINK("link", foundNewLinkonPosition)
      );
    }

    callback(
      null,
      new ReorderLinkResponseDto(
        foundNewLinkonPosition,
        foundLastLinkonPosition
      )
    );
  }
}
