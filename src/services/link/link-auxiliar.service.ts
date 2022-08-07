import { UserLinkDto, UserLinkDtoHelper } from "../../core/models/link.model";

export class LinkAuxiliarService {
  /**
   * @description Verify arguments for getLinkListByUserId function
   * @param  {number} userId
   * @param  {number} active - 1: active, 0: inactive
   * @param  {number} favorite - 1: favorite, 0: not favorite
   * @returns {boolean} - true: valid, false: invalid
   */
  protected static verifyArgumentForGetLinkListByUserId(
    userId: number,
    active: number,
    favorite: number
  ): boolean {
    if (!userId || typeof userId !== "number" || userId <= 0) {
      return false;
    }

    if (!active || typeof active !== "number" || active <= 0 || active > 1) {
      return false;
    }

    if (
      !favorite ||
      typeof favorite !== "number" ||
      favorite <= 0 ||
      favorite > 1
    ) {
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
  protected static verifyArgumentForGetLinkListByUserIdAndGroupId(
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
  protected static verifyArgumentForGetLinkByUserLinkIdAndUserId(
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
  protected static verifyArgumentForCreate(
    link: UserLinkDto,
    userId: number
  ): boolean {
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
  protected static verifyArgumentForAssociatedLinkToUserLink(
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
  protected static verifyArgumentForDelete(
    userLinkId: number,
    userId: number
  ): boolean {
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
  protected static verifyArgumentForToggleFavorite(
    userLinkId: number,
    userId: number
  ): boolean {
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
  protected static verifyArgumentForUpdate(
    link: UserLinkDto,
    userId: number
  ): boolean {
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
  protected static verifyArgumentForToggleActive(
    userLinkId: number,
    userId: number
  ): boolean {
    if (!userLinkId || typeof userLinkId !== "number" || userLinkId <= 0) {
      return false;
    }

    if (!userId || typeof userId !== "number" || userId <= 0) {
      return false;
    }

    return true;
  }

  /**
   * @description Filtered and return only active links
   * @param  {UserLinkDto[]} linkList
   * @param  {number} active - 1: active, 0: inactive
   * @param  {number} favorite - 1: favorite, 0: not favorite
   */
  protected static filteredLinkList(
    linkList: UserLinkDto[],
    active: number,
    favorite: number
  ): UserLinkDto[] {
    let mappingLinkList = UserLinkDtoHelper.mapToObjectList(linkList);

    if (!isNaN(active)) {
      const isActive: boolean = active > 0 ? true : false;
      mappingLinkList = mappingLinkList.filter(
        (link) => link.active === isActive
      );
    }

    if (!isNaN(favorite)) {
      const isFavorite: boolean = favorite > 0 ? true : false;
      mappingLinkList = mappingLinkList.filter(
        (link) => link.favorite === isFavorite
      );
    }

    return mappingLinkList;
  }
}
