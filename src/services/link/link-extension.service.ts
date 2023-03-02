import { TinyInt } from "../../core/enums/global.enum";
import { UserLinkDto, UserLinkDtoHelper } from "../../core/models/link.model";
import { GroupLinkEntity } from "../../entity/group-link.entity";
import { UserLinkEntity } from "../../entity/user-link.entity";

export class LinkExtensionService {
  /**
   * @description Verify arguments for getLinkListByUserId function
   * @param  {number} userId
   * @param  {number} active - 1: active, 0: inactive
   * @param  {number} favorite - 1: favorite, 0: not favorite
   * @returns {boolean} - true: valid, false: invalid
   */
  verifyArgumentForGetLinkListByUserId(
    userId: number,
    active: number,
    favorite: number
  ): boolean {
    if (!userId || typeof userId !== "number" || userId <= 0) {
      return false;
    }

    const tinyIntValidList: number[] = [0, 1];

    if (!tinyIntValidList.includes(active)) {
      return false;
    }

    if (!tinyIntValidList.includes(favorite)) {
      return false;
    }

    return true;
  }

  /**
   * @description Verify arguments for getLinkListByUserIdAndGroupId function
   * @param  {number} userId
   * @param  {number} groupId
   * @returns {boolean} - true: valid, false: invalid
   */
  verifyArgumentForGetLinkListByUserIdAndGroupId(
    userId: number,
    groupId: number
  ): boolean {
    if (!userId || typeof userId !== "number" || userId <= 0) {
      return false;
    }

    if (!groupId || typeof groupId !== "number" || groupId <= 0) {
      return false;
    }

    return true;
  }

  /**
   * @description Verify arguments for getLinkByUserLinkIdAndUserId function
   * @param  {number} userLinkId
   * @param  {number} userId
   * @returns {boolean} - true: valid, false: invalid
   */
  verifyArgumentForGetLinkByUserLinkIdAndUserId(
    userLinkId: number,
    userId: number
  ): boolean {
    if (!userId || typeof userId !== "number" || userId <= 0) {
      return false;
    }

    if (!userLinkId || typeof userLinkId !== "number" || userLinkId <= 0) {
      return false;
    }

    return true;
  }

  /**
   * @description Verify arguments for create function
   * @param  {UserLinkDto} link
   * @param  {number} userId
   * @returns {boolean} - true: valid, false: invalid
   */
  verifyArgumentForCreate(link: UserLinkDto, userId: number): boolean {
    if (!link || !link.link) {
      return false;
    }

    if (!userId || typeof userId !== "number" || userId <= 0) {
      return false;
    }

    return true;
  }

  /**
   * @description Verify arguments for associatedLinkToUserLink function
   * @param  {number} userId
   * @param  {number} linkId
   * @param  {UserLinkDto} link
   * @returns {boolean} - true: valid, false: invalid
   */
  verifyArgumentForAssociatedLinkToUserLink(
    userId: number,
    linkId: number,
    link: UserLinkDto
  ): boolean {
    if (!userId || typeof userId !== "number" || userId <= 0) {
      return false;
    }

    if (!linkId || typeof linkId !== "number" || linkId <= 0) {
      return false;
    }

    if (!link || !link.link || !link.name || !link.groupId) {
      return false;
    }

    return true;
  }

  /**
   * @description Verify arguments for update function
   * @param  {number} userLinkId
   * @param  {number} userId
   * @returns {boolean} - true: valid, false: invalid
   */
  verifyArgumentForDelete(userLinkId: number, userId: number): boolean {
    if (!userLinkId || typeof userLinkId !== "number" || userLinkId <= 0) {
      return false;
    }

    if (!userId || typeof userId !== "number" || userId <= 0) {
      return false;
    }

    return true;
  }

  /**
   * @description Verify arguments for update function
   * @param  {number} userLinkId
   * @param  {number} userId
   * @returns {boolean} - true: valid, false: invalid
   */
  verifyArgumentForToggleFavorite(userLinkId: number, userId: number): boolean {
    if (!userLinkId || typeof userLinkId !== "number" || userLinkId <= 0) {
      return false;
    }

    if (!userId || typeof userId !== "number" || userId <= 0) {
      return false;
    }

    return true;
  }

  /**
   * @description Verify arguments for update function
   * @param  {UserLinkDto} link
   * @param  {number} userId
   * @returns {boolean} - true: valid, false: invalid
   */
  verifyArgumentForUpdate(link: UserLinkDto, userId: number): boolean {
    if (!userId || typeof userId !== "number" || userId <= 0) {
      return false;
    }

    if (!link || !link.link || !link.id || !link.link) {
      return false;
    }

    return true;
  }

  /**
   * @description Verify arguments for update function
   * @param  {number} userLinkId
   * @param  {number} userId
   * @returns {boolean} - true: valid, false: invalid
   */
  verifyArgumentForToggleActive(userLinkId: number, userId: number): boolean {
    if (!userLinkId || typeof userLinkId !== "number" || userLinkId <= 0) {
      return false;
    }

    if (!userId || typeof userId !== "number" || userId <= 0) {
      return false;
    }

    return true;
  }
}
