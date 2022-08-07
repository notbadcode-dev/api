import {
  ReorderLinkRequestDto,
  UserLinkDto,
} from "../../core/models/link.model";

export class LinkGroupAuxiliarService {
  /**
   * @description Verify arguments for reorderLink function
   * @param  {ReorderLinkRequestDto} reorderlinkRequest
   * @param  {number} userId
   * @returns {boolean} - true: valid, false: invalid
   */
  protected static verifyArgumentForReorderLink(
    reorderlinkRequest: ReorderLinkRequestDto,
    userId: number
  ): boolean {
    if (!reorderlinkRequest) {
      return false;
    }

    if (
      reorderlinkRequest.newLinkIdOnPosition ===
      reorderlinkRequest.lastLinkIdOnPosition
    ) {
      return false;
    }

    if (!userId || typeof userId !== "number" || userId <= 0) {
      return false;
    }

    return true;
  }

  /**
   * @description Verify new order link on position and last order link on position for reorderLink function
   * @param  {UserLinkDto} foundNewLinkonPosition
   * @param  {UserLinkDto} foundLastLinkonPosition
   * @returns {boolean} - true: valid, false: invalid
   */
  protected static verifyNewAndLastLinkForReorderLink(
    foundNewLinkonPosition: UserLinkDto,
    foundLastLinkonPosition: UserLinkDto
  ): boolean {
    if (!foundNewLinkonPosition || !foundLastLinkonPosition) {
      return false;
    }

    if (foundNewLinkonPosition.linkId === foundLastLinkonPosition.linkId) {
      return false;
    }

    if (foundNewLinkonPosition.groupId !== foundLastLinkonPosition.groupId) {
      return false;
    }

    return true;
  }
}
