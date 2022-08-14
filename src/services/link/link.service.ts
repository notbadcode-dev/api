import { ERROR_MESSAGE } from "../../constants/error-message.constant";
import { LINK } from "../../constants/link.constant";
import {
  LinkHelper,
  UserLinkDto,
  UserLinkDtoHelper,
} from "../../core/models/link.model";
import { QueryHelper } from "../../core/models/query.model";
import { LinkQuery } from "../../queries/link.query";
import { LinkAuxiliarService } from "./link-auxiliar.service";

export class LinkService extends LinkAuxiliarService {
  /**
   * @description Get link list by userId
   * @param  {number} userId
   * @param  {number} active - 1: active, 0: inactive
   * @param  {number} favorite - 1: favorite, 0: not favorite
   * @param  {CallableFunction} callback - success: Link list, error: error message
   * @returns {any} - Callback function for get response with Link list or error message
   */
  public static async getLinkListByUserId(
    userId: number,
    active: number,
    favorite: number,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentForGetLinkListByUserId(userId, active, favorite)) {
      return callback(ERROR_MESSAGE.FAILED_GET_ANY("Link list"));
    }

    const foundUserLinkList: UserLinkDto[] | any =
      await LinkQuery.getLinkListByUserIdQuery(userId, callback);

    if (!foundUserLinkList) {
      return callback(ERROR_MESSAGE.FAILED_GET_ANY("Link list"));
    }

    return callback(
      null,
      QueryHelper.mapToObjectLst(
        this.filteredLinkList(foundUserLinkList, active, favorite)
      )
    );
  }

  /**
   * @description Get link list by userId
   * @param  {number} userId
   * @param  {number} groupId
   * @param  {number} active - 1: active, 0: inactive
   * @param  {number} favorite - 1: favorite, 0: not favorite
   * @param  {CallableFunction} callback - success: Link list, error: error message
   * @returns {any} - Callback function for get response with Link list or error message
   */
  public static async getLinkListByUserIdAndGroupId(
    userId: number,
    groupId: number,
    active: number,
    favorite: number,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentForGetLinkListByUserIdAndGroupId(userId, groupId)) {
      return callback(ERROR_MESSAGE.FAILED_GET_ANY("Link list"));
    }

    const foundUserLinkList: UserLinkDto[] | any =
      await LinkQuery.getLinkListByGroupIdQuery(userId, groupId, callback);

    if (!foundUserLinkList) {
      return callback(ERROR_MESSAGE.FAILED_GET_ANY("Link list"));
    }

    return callback(
      null,
      QueryHelper.mapToObjectLst(
        this.filteredLinkList(foundUserLinkList, active, favorite)
      )
    );
  }

  /**
   * @description Get Link by userId and linkId
   * @param  {number} userLinkId
   * @param  {number} userId
   * @param  {CallableFunction} callback - success: Link, error: error message
   * @returns {any} - Callback function for get response with link or error message
   */
  public static async getLinkByUserLinkIdAndUserId(
    userLinkId: number,
    userId: number,
    callback: CallableFunction
  ): Promise<any> {
    if (
      !this.verifyArgumentForGetLinkByUserLinkIdAndUserId(userLinkId, userId)
    ) {
      return callback(ERROR_MESSAGE.FAILED_GET_ANY("Link"));
    }

    const foundUserLink: UserLinkDto | any =
      await LinkQuery.getLinkLByUserIdAndLinkId(userId, userLinkId, callback);

    if (!foundUserLink) {
      return callback(ERROR_MESSAGE.NOT_FOUND_ANY("Link"));
    }

    return callback(
      null,
      QueryHelper.mapToObject(
        UserLinkDtoHelper.mapToObjectList([foundUserLink])
      )
    );
  }

  /**
   * @description Create link and optional associate to user with third party function
   * @param  {UserLinkDto} link
   * @param  {number} userId
   * @param  {CallableFunction} callback - success: Created LinkId, error: error message
   * @returns {any} - Callback function for get response with created linkId or error message
   */
  public static async create(
    link: UserLinkDto,
    userId: number,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentForCreate(link, userId)) {
      return callback(ERROR_MESSAGE.FAILED_CREATE_ANY("link"));
    }

    const foundLink = await LinkQuery.getLinkLByUrl(link.link, callback);
    let linkId: number = foundLink ? LinkHelper.mapToObject(foundLink).id : 0;

    if (!foundLink) {
      const resultCreateLink = await LinkQuery.createLink(
        userId,
        link,
        callback
      );

      if (!resultCreateLink) {
        return callback(ERROR_MESSAGE.FAILED_CREATE_ANY("link"));
      }

      linkId = LinkHelper.mapToObject(resultCreateLink).id;
    }

    this.associatedLinkToUserLink(userId, linkId, link, callback);
  }

  /**
   * @description Associate link to user
   * @param  {number} userId
   * @param  {number} linkId
   * @param  {UserLinkDto} link
   * @param  {CallableFunction} callback - success: no available, error: error message
   * @returns {any} - Callback function when exist error with error message
   */
  public static async associatedLinkToUserLink(
    userId: number,
    linkId: number,
    link: UserLinkDto,
    callback: CallableFunction
  ): Promise<any> {
    if (this.verifyArgumentForAssociatedLinkToUserLink(userId, linkId, link)) {
      const userLink: UserLinkDto = new UserLinkDto(
        0,
        Number(userId),
        linkId,
        link.name,
        link.link,
        link.color ? link.color : LINK.DEFAULT_COLOR,
        false,
        false,
        link.groupId,
        "",
        0
      );

      const resultAssociateLink = await LinkQuery.associateLinkToUserLink(
        userLink,
        callback
      );

      if (!resultAssociateLink) {
        return callback(
          ERROR_MESSAGE.FAILED_ASSOCIATE_LINK_TO_USER_LINK(link.name)
        );
      }

      return callback(null, resultAssociateLink.id);
    }
  }

  /**
   * @description Update link and associate it with user
   * @param  {UserLinkDto} link
   * @param  {number} userId
   * @param  {CallableFunction} callback - success: Updated LinkId, error: error message
   * @returns {any} - Callback function for get response with updated linkId or error message
   */
  public static async update(
    link: UserLinkDto,
    userId: number,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentForUpdate(link, userId)) {
      return callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("link"));
    }

    const foundLink: UserLinkDto | any = await LinkQuery.getLinkLByUrl(
      link.link,
      callback
    );

    link.linkId = foundLink ? foundLink.id : link.linkId;

    if (!foundLink) {
      const resultCreateLink = await LinkQuery.createLink(
        userId,
        link,
        callback
      );

      if (resultCreateLink) {
        link.linkId = resultCreateLink ? resultCreateLink.id : link.linkId;
      }
    }

    const resultUpdateLink = await LinkQuery.updateLink(userId, link, callback);

    if (resultUpdateLink) {
      return callback(null, link.id);
    }
  }

  /**
   * @description Delete Link
   * @param  {number} userLinkId
   * @param  {number} userId
   * @param  {CallableFunction} callback - success: Deleted Link, error: error message
   * @returns {any} - Callback function for get response with deleted link or error message
   */
  public static async delete(
    userLinkId: number,
    userId: number,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentForDelete(userLinkId, userId)) {
      return callback(ERROR_MESSAGE.FAILED_DELETE_ANY("link"));
    }

    const foundUserLink: UserLinkDto | any =
      await LinkQuery.getLinkLByUserIdAndLinkId(userId, userLinkId, callback);

    if (!foundUserLink) {
      return callback(ERROR_MESSAGE.FAILED_DELETE_ANY("Link"));
    }

    const resultDeleteLink = await LinkQuery.deleteLink(
      userId,
      userLinkId,
      callback
    );

    if (!resultDeleteLink) {
      return callback(ERROR_MESSAGE.FAILED_DELETE_ANY("link"));
    }

    return callback(null, resultDeleteLink);
  }

  /**
   * @description Toggle Favorite
   * @param  {number} userLinkId
   * @param  {number} userId
   * @param  {CallableFunction} callback - success: Mark or Dismark favorite Link, error: error message
   * @returns {any} - Callback function for get response with Mark or Dismark favorite Link or error message
   */
  public static async toggleFavorite(
    userLinkId: number,
    userId: number,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentForToggleFavorite(userLinkId, userId)) {
      return callback(ERROR_MESSAGE.FAILED_MARK_TO_FAVORITE_LINK("link"));
    }

    const foundUserLink: UserLinkDto | any =
      await LinkQuery.getLinkLByUserIdAndLinkId(userId, userLinkId, callback);

    if (!foundUserLink) {
      return callback(ERROR_MESSAGE.FAILED_MARK_TO_FAVORITE_LINK("link"));
    }

    const resultToggleFavorite = await LinkQuery.toggleFavoriteLink(
      userId,
      userLinkId,
      callback
    );

    if (!resultToggleFavorite) {
      return callback(ERROR_MESSAGE.FAILED_MARK_TO_FAVORITE_LINK("link"));
    }

    return this.getLinkByUserLinkIdAndUserId(userLinkId, userId, callback);
  }

  /**
   * @description Toggle Active
   * @param  {number} userLinkId
   * @param  {number} userId
   * @param  {CallableFunction} callback - success: Mark or Dismark active Link, error: error message
   * @returns {any} - Callback function for get response with Mark or Dismark active Link or error message
   */
  public static async toggleActive(
    userLinkId: number,
    userId: number,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentForToggleActive(userLinkId, userId)) {
      return callback(ERROR_MESSAGE.FAILED_MARK_TO_FAVORITE_LINK("link"));
    }

    const foundUserLink: UserLinkDto | any =
      await LinkQuery.getLinkLByUserIdAndLinkId(userId, userLinkId, callback);

    if (!foundUserLink) {
      return callback(ERROR_MESSAGE.FAILED_MARK_TO_FAVORITE_LINK("link"));
    }

    const resultToggleFavorite = await LinkQuery.toggleActiveLink(
      userId,
      userLinkId,
      callback
    );

    if (!resultToggleFavorite) {
      return callback(ERROR_MESSAGE.FAILED_MARK_TO_FAVORITE_LINK("link"));
    }

    return this.getLinkByUserLinkIdAndUserId(userLinkId, userId, callback);
  }
}
