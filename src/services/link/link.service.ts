import { In, Repository } from "typeorm";

import { EntityNameConstant } from "../../constants/entity.constant";
import { ERROR_MESSAGE } from "../../constants/error-message.constant";
import { LINK } from "../../constants/link.constant";
import { TinyInt } from "../../core/enums/global.enum";
import { UserLinkDto } from "../../core/models/link.model";
import { LinksDataSource } from "../../database";
import { GroupLinkEntity } from "../../entity/group-link.entity";
import { LinkEntity } from "../../entity/link.entity";
import { UserLinkEntity } from "../../entity/user-link.entity";
import { LinkQuery } from "../../queries/link.query";
import { LinkExtensionService } from "./link-extension.service";

export class LinkService extends LinkExtensionService {
  //#region Attributes

  private userLinkRepository!: Repository<UserLinkEntity>;
  private groupLinkRepository!: Repository<GroupLinkEntity>;
  private linkRepository!: Repository<LinkEntity>;

  //#endregion

  //#region Constructor

  constructor() {
    super();
    this.userLinkRepository = LinksDataSource.getRepository(UserLinkEntity);
    this.groupLinkRepository = LinksDataSource.getRepository(GroupLinkEntity);
    this.linkRepository = LinksDataSource.getRepository(LinkEntity);
  }

  //#endregion

  //#region Public methods

  /**
   * @description Get link list by userId
   * @param  {number} userId
   * @param  {number} active - 1: active, 0: inactive
   * @param  {number} favorite - 1: favorite, 0: not favorite
   * @param  {CallableFunction} callback - success: Link list, error: error message
   * @returns {any} - Callback function for get response with Link list or error message
   */
  public async getLinkListByUserId(
    userId: number,
    active: number,
    favorite: number,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentForGetLinkListByUserId(userId, active, favorite)) {
      return callback(
        ERROR_MESSAGE.FAILED_GET_ANY(EntityNameConstant.linkList)
      );
    }

    const userLinkList: UserLinkDto[] = await this.getUserLinkDtoList(
      userId,
      callback,
      favorite,
      active
    );

    if (!userLinkList?.length) {
      return callback(
        ERROR_MESSAGE.FAILED_GET_ANY(EntityNameConstant.linkList)
      );
    }

    return callback(null, userLinkList);
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
  public async getLinkListByUserIdAndGroupId(
    userId: number,
    groupId: number,
    active: number,
    favorite: number,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentForGetLinkListByUserIdAndGroupId(userId, groupId)) {
      return callback(
        ERROR_MESSAGE.FAILED_GET_ANY(EntityNameConstant.linkList)
      );
    }

    const userLinkList: UserLinkDto[] = await this.getUserLinkDtoList(
      userId,
      callback,
      favorite,
      active
    );

    if (!userLinkList?.length) {
      return callback(
        ERROR_MESSAGE.FAILED_GET_ANY(EntityNameConstant.linkList)
      );
    }

    const groupUserLinkList = userLinkList.filter(
      (userLink: UserLinkDto) => userLink.groupId === groupId
    );

    if (!groupUserLinkList?.length) {
      return callback(
        ERROR_MESSAGE.FAILED_GET_ANY(EntityNameConstant.linkList)
      );
    }

    return callback(null, groupUserLinkList);
  }

  /**
   * @description Get Link by userId and linkId
   * @param  {number} userLinkId
   * @param  {number} userId
   * @param  {CallableFunction} callback - success: Link, error: error message
   * @returns {any} - Callback function for get response with link or error message
   */
  async getLinkByUserLinkIdAndUserId(
    userLinkId: number,
    userId: number,
    callback: CallableFunction
  ): Promise<any> {
    if (
      !this.verifyArgumentForGetLinkByUserLinkIdAndUserId(userLinkId, userId)
    ) {
      return callback(ERROR_MESSAGE.FAILED_GET_ANY(EntityNameConstant.link));
    }

    const foundUserLinkList = await this.getUserLinkEntityList(userId);

    if (!foundUserLinkList?.length) {
      return callback(
        ERROR_MESSAGE.FAILED_GET_ANY(EntityNameConstant.linkList)
      );
    }

    const foundGroupLinks =
      await this.getGroupLinkEntityListAccordingExistLinkOnUserLinkEntityList(
        foundUserLinkList,
        userId
      );
    const userLinkList: UserLinkDto[] = foundUserLinkList.map(
      (userEntity: UserLinkEntity) =>
        this.mapToUserLinkDto(userEntity, foundGroupLinks)
    );

    if (!userLinkList?.length) {
      return callback(ERROR_MESSAGE.FAILED_GET_ANY(EntityNameConstant.link));
    }

    const foundUserLink: UserLinkDto | null =
      userLinkList.find(
        (userLink: UserLinkDto) => userLink.id === userLinkId
      ) ?? null;

    if (!foundUserLink) {
      return callback(ERROR_MESSAGE.NOT_FOUND_ANY(EntityNameConstant.link));
    }

    return callback(null, foundUserLink);
  }

  /**
   * @description Create link and optional associate to user with third party function
   * @param  {UserLinkDto} link
   * @param  {number} userId
   * @param  {CallableFunction} callback - success: Created LinkId, error: error message
   * @returns {any} - Callback function for get response with created linkId or error message
   */
  public async create(
    link: UserLinkDto,
    userId: number,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentForCreate(link, userId)) {
      return callback(ERROR_MESSAGE.FAILED_CREATE_ANY(EntityNameConstant.link));
    }

    const foundLink = await this.getLinkEntityByLink(link.link);
    let linkId: number = foundLink?.id ?? 0;

    if (!foundLink) {
      const resultCreateLink = await this.createLink(userId, link);

      if (!resultCreateLink) {
        return callback(
          ERROR_MESSAGE.FAILED_CREATE_ANY(EntityNameConstant.link)
        );
      }

      linkId = resultCreateLink.id;
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
  public async associatedLinkToUserLink(
    userId: number,
    linkId: number,
    link: UserLinkDto,
    callback: CallableFunction
  ): Promise<void> {
    if (this.verifyArgumentForAssociatedLinkToUserLink(userId, linkId, link)) {
      const today = new Date();
      const foundUserLink = await this.userLinkRepository.findOneBy({
        user: { id: Number(userId) },
        link: { id: linkId },
      });

      if (foundUserLink) {
        return callback(null, foundUserLink.id);
      }

      const createUserLink = this.userLinkRepository.create({
        user: {
          id: Number(userId),
        },
        link: {
          id: linkId,
        },
        name: link.name,
        color: link.color ?? LINK.DEFAULT_COLOR,
        favorite: TinyInt.downLogic,
        active: TinyInt.downLogic,
        createdAt: today,
        lastModifiedAt: today,
      });

      if (!createUserLink) {
        return callback(
          ERROR_MESSAGE.FAILED_ASSOCIATE_LINK_TO_USER_LINK(link.name)
        );
      }

      const savedUserLink = await this.userLinkRepository.save(createUserLink);
      if (savedUserLink && link?.groupId) {
        const createdGroupLink = this.groupLinkRepository.create({
          group: {
            id: link?.groupId,
          },
          link: {
            id: linkId,
          },
          linkOrder: 0,
        });

        await this.groupLinkRepository.save(createdGroupLink);
      }

      return callback(null, savedUserLink.id);
    }
  }

  /**
   * @description Update link and associate it with user
   * @param  {UserLinkDto} link
   * @param  {number} userId
   * @param  {CallableFunction} callback - success: Updated LinkId, error: error message
   * @returns {any} - Callback function for get response with updated linkId or error message
   */
  public async update(
    link: UserLinkDto,
    userId: number,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentForUpdate(link, userId)) {
      return callback(ERROR_MESSAGE.FAILED_UPDATE_ANY(EntityNameConstant.link));
    }

    const foundUserLink = await this.getUserLinkEntityByLink(userId, link.id);

    if (!foundUserLink) {
      return callback(ERROR_MESSAGE.NOT_FOUND_ANY(EntityNameConstant.link));
    }

    const foundLink = await this.getLinkEntityByLink(link.link);

    if (!foundLink) {
      const resultCreateLink = await this.createLink(userId, link);
      if (!resultCreateLink) {
        return callback(
          ERROR_MESSAGE.FAILED_UPDATE_ANY(EntityNameConstant.link)
        );
      }

      link.linkId = resultCreateLink?.id ?? 0;
    } else {
      link.linkId = foundLink?.id ?? 0;
    }

    if (!link.linkId) {
      return callback(ERROR_MESSAGE.FAILED_UPDATE_ANY(EntityNameConstant.link));
    }

    const resultUpdateLink = await this.updateLink(userId, link);

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
  public async delete(
    userLinkId: number,
    userId: number,
    callback: CallableFunction
  ): Promise<any> {
    if (!this.verifyArgumentForDelete(userLinkId, userId)) {
      return callback(ERROR_MESSAGE.FAILED_DELETE_ANY(EntityNameConstant.link));
    }

    const foundUserLink = await this.getUserLinkEntityByLink(
      userId,
      userLinkId
    );

    if (!foundUserLink) {
      return callback(ERROR_MESSAGE.FAILED_DELETE_ANY(EntityNameConstant.link));
    }

    const deletedUserLink = await this.userLinkRepository.delete({
      id: userLinkId,
      user: { id: userId },
    });

    if (!deletedUserLink) {
      return callback(ERROR_MESSAGE.FAILED_DELETE_ANY(EntityNameConstant.link));
    }

    return callback(null, deletedUserLink?.affected ?? 0 > 0);
  }

  /**
   * @description Toggle Favorite
   * @param  {number} userLinkId
   * @param  {number} userId
   * @param  {CallableFunction} callback - success: Mark or Dismark favorite Link, error: error message
   * @returns {any} - Callback function for get response with Mark or Dismark favorite Link or error message
   */
  public async toggleFavorite(
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
  public async toggleActive(
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

  //#endregion

  //#region Private methods

  /**
   * @description Get UserEntityList from userLinkRepository
   * @param  {number} userId
   * @param  {number} favorite
   * @param  {number} active
   * @returns Promise<UserLinkEntity[]>
   */
  private async getUserLinkEntityList(
    userId: number,
    favorite?: number,
    active?: number
  ): Promise<UserLinkEntity[]> {
    const favoriteList: number[] = this.getTinyIntListAccordingIsNan(favorite);
    const activeList: number[] = this.getTinyIntListAccordingIsNan(active);
    const relationList: string[] = ["user", "link"];

    const foundUserLinkList = await this.userLinkRepository.find({
      where: {
        user: {
          id: userId,
        },
        favorite: In(favoriteList),
        active: In(activeList),
      },
      relations: relationList,
    });

    return foundUserLinkList;
  }

  /**
   * @description Get UserEntityList from groupLinkRepository
   * @param  {UserLinkEntity[]} foundUserLinkList
   * @param  {number} userId
   * @param  {number} groupId?
   * @returns Promise<GroupLinkEntity[]>
   */
  private async getGroupLinkEntityListAccordingExistLinkOnUserLinkEntityList(
    foundUserLinkList: UserLinkEntity[],
    userId: number,
    groupId?: number
  ): Promise<GroupLinkEntity[]> {
    const foundLinkIdList: number[] =
      foundUserLinkList.map(
        (userLinkEntity: UserLinkEntity) => userLinkEntity.link.id
      ) ?? [];
    const foundGroupIdList: number[] = groupId ? [groupId] : [];
    const relationList: string[] = ["group", "link"];

    const linkWhere = {
      link: {
        id: In(foundLinkIdList),
        user: {
          id: userId,
        },
      },
    };

    const groupWhere = foundGroupIdList.length
      ? {
          group: {
            id: In(foundGroupIdList),
          },
        }
      : undefined;

    const where = {
      ...linkWhere,
      ...groupWhere,
    };

    return await this.groupLinkRepository.find({
      where: where,
      relations: relationList,
    });
  }

  /**
   * @description Generate and get user link list
   * @param  {number} userId
   * @param  {CallableFunction} callback
   * @param  {number} favorite?
   * @param  {number} active?
   * @returns Promise
   */
  private async getUserLinkDtoList(
    userId: number,
    callback: CallableFunction,
    favorite?: number,
    active?: number
  ): Promise<UserLinkDto[]> {
    const foundUserLinkList = await this.getUserLinkEntityList(
      userId,
      favorite,
      active
    );

    if (!foundUserLinkList?.length) {
      return callback(
        ERROR_MESSAGE.FAILED_GET_ANY(EntityNameConstant.linkList)
      );
    }

    const foundGroupLinks =
      await this.getGroupLinkEntityListAccordingExistLinkOnUserLinkEntityList(
        foundUserLinkList,
        userId
      );

    if (!foundGroupLinks?.length) {
      return callback(
        ERROR_MESSAGE.FAILED_GET_ANY(EntityNameConstant.linkList)
      );
    }

    const userLinkList: UserLinkDto[] = foundUserLinkList.map(
      (userEntity: UserLinkEntity) =>
        this.mapToUserLinkDto(userEntity, foundGroupLinks)
    );

    return userLinkList;
  }

  /**
   * @description Get UserEntityList from userLinkRepository
   * @param  {string} link
   * @returns Promise<LinkEntity | null>
   */
  private async getLinkEntityByLink(link: string): Promise<LinkEntity | null> {
    const foundLink = await this.linkRepository.findOneBy({ link: link });
    return foundLink;
  }

  /**
   * @description Get UserLinkEntityList from userLinkRepository
   * @param  {number} userId
   * @param  {number} userLinkId
   * @returns Promise<UserLinkEntity | null>
   */
  private async getUserLinkEntityByLink(
    userId: number,
    userLinkId: number
  ): Promise<UserLinkEntity | null> {
    const foundUserLink = await this.userLinkRepository.findOneBy({
      id: userLinkId,
      user: { id: userId },
    });
    return foundUserLink;
  }

  /**
   * @description Get tinyIntList when tinyInt isNan
   * @param  {number} tinyInt
   * @returns number
   */
  private getTinyIntListAccordingIsNan(tinyInt?: number): number[] {
    if (!tinyInt || isNaN(tinyInt)) {
      return [TinyInt.downLogic, TinyInt.highLogic];
    }

    return [tinyInt];
  }

  /**
   * @description Create a link with linkRepository
   * @param  {UserLinkDto} userLink
   * @returns Promise<LinkEntity>
   */
  private async createLink(
    userId: number,
    userLink: UserLinkDto
  ): Promise<LinkEntity> {
    const today = new Date();
    const createdLink = this.linkRepository.create({
      user: {
        id: userId,
      },
      link: userLink.link,
      createdAt: today,
      lastModifiedAt: today,
    });

    return this.linkRepository.save(createdLink);
  }

  /**
   * @description Create a link with linkRepository
   * @param  {UserLinkDto} userLink
   * @returns Promise<LinkEntity>
   */
  private async updateLink(
    userId: number,
    userLink: UserLinkDto
  ): Promise<number> {
    const today = new Date();

    const updateUserLink = await this.userLinkRepository.update(
      { id: userLink.id },
      {
        name: userLink.name,
        color: userLink.color,
        link: {
          id: userLink.linkId,
        },
        lastModifiedAt: today,
      }
    );

    return updateUserLink.affected ?? 0;
  }

  //#endregion

  //#region Mappers methods

  /**
   * @description Map UserLinkEntity to UserLinkDto
   * @param  {UserLinkEntity} userLink
   * @param  {GroupLinkEntity[]} groupLinkEntityList
   * @returns UserLinkDto
   */
  private mapToUserLinkDto(
    userLink: UserLinkEntity,
    groupLinkEntityList: GroupLinkEntity[]
  ): UserLinkDto {
    const groupLink =
      groupLinkEntityList.find(
        (groupLinkEntity: GroupLinkEntity) =>
          groupLinkEntity.link?.id === userLink.link?.id
      ) ?? null;

    return {
      id: userLink.id,
      userId: userLink.user.id,
      linkId: userLink.link.id,
      name: userLink.name,
      link: userLink.link.link,
      color: userLink.color,
      favorite: userLink.favorite === TinyInt.highLogic ? true : false,
      active: userLink.active === TinyInt.highLogic ? true : false,
      groupId: groupLink?.group?.id ?? 0,
      groupName: groupLink?.group?.name ?? "",
      linkOrder: groupLink?.linkOrder ?? 0,
      createdAt: userLink.createdAt,
      lastModifiedAt: userLink.lastModifiedAt,
    };
  }

  //#endregion
}
