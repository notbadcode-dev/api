import { ERROR_MESSAGE } from "../../constants/error-message.constant";
import { QUERY } from "../../constants/query.constant";
import { connection } from "../../database";
import {
  LinkHelper,
  ReorderLinkRequestDto,
  ReorderLinkResponseDto,
  UserLinkDto,
  UserLinkDtoHelper,
} from "../models/link.model";
import { QueryHelper } from "../models/query.model";
import { QueryService } from "../utils/query.service";

export class LinkService {
  /**
   * @description Execute query for get links by userId
   * @param  {number} userId
   * @param  {number} active
   * @param  {number} favorite
   * @param  {CallableFunction} callback
   * @returns void - Link callback function for get response
   */
  public static getLinkListByUserId(
    userId: number,
    active: number,
    favorite: number,
    callback: CallableFunction
  ): void {
    connection
      .query(QUERY.LINK.SELECT_LINKS_BY_USER_ID(Number(userId)))
      .then((result: UserLinkDto[]) => {
        callback(
          null,
          QueryHelper.mapToObjectLst(
            this.filteredLinkList(result, active, favorite)
          )
        );
      })
      .catch((err) => {
        callback(ERROR_MESSAGE.FAILED_GET_ANY("Link list"));
      });
  }

  /**
   * @description Execute query for get links by userId and groupId
   * @param  {number} userId
   * @param  {number} groupId
   * @param  {number} active
   * @param  {number} favorite
   * @param  {CallableFunction} callback
   * @returns void - Link callback function for get response
   */
  public static getLinkListByUserIdAndGroupId(
    userId: number,
    groupId: number,
    active: number,
    favorite: number,
    callback: CallableFunction
  ): void {
    connection
      .query(
        QUERY.LINK.SELECT_LINKS_BY_USER_ID_GROUP_ID(
          Number(userId),
          Number(groupId)
        )
      )
      .then((result: UserLinkDto[]) => {
        callback(
          null,
          QueryHelper.mapToObjectLst(
            this.filteredLinkList(result, active, favorite)
          )
        );
      })
      .catch((err) => {
        callback(ERROR_MESSAGE.FAILED_GET_ANY("Link list"));
      });
  }

  /**
   * @description Execute query for get link by userLinkId and userId and groupId
   * @param  {number} userLinkId
   * @param  {number} userId
   * @param  {CallableFunction} callback
   * @returns void - Link callback function for get response
   */
  public static getLinkByUserLinkIdAndUserId(
    userLinkId: number,
    userId: number,
    callback: CallableFunction
  ): void {
    connection
      .query(
        QUERY.LINK.SELECT_LINK_BY_LINK_ID_AND_USER_ID(
          Number(userId),
          Number(userLinkId)
        )
      )
      .then((result: UserLinkDto[]) => {
        callback(
          null,
          QueryHelper.mapToObject(UserLinkDtoHelper.mapToObjectList(result))
        );
      })
      .catch((err) => {
        callback(ERROR_MESSAGE.FAILED_GET_ANY("Link list"));
      });
  }

  public static async create(
    link: UserLinkDto,
    userId: number,
    callback: CallableFunction
  ) {
    const resultLinkByUrl = await connection
      .query(QUERY.LINK.SELECT_LINK_BY_URL(link.link))
      .catch((err) => {
        callback(ERROR_MESSAGE.FAILED_CREATE_ANY("link"));
      });

    let linkId: number = 0;

    QueryService.controlUndefinedResult(
      resultLinkByUrl[0],
      async () => {
        const resultCreateLink = await connection
          .query(QUERY.LINK.CREATE_LINK(link.link, userId))
          .catch((err) => {
            callback(ERROR_MESSAGE.FAILED_CREATE_ANY("link"));
          });

        QueryService.controlUndefinedResult(
          resultCreateLink[0],
          () => {
            callback(ERROR_MESSAGE.FAILED_CREATE_ANY("link"));
          },
          () => {
            linkId = LinkHelper.mapToObject(resultCreateLink[0]).id;
          }
        );
      },
      () => {
        linkId = LinkHelper.mapToObject(resultLinkByUrl[0]).id;
      }
    );

    if (Number(linkId) > 0) {
      const userLink: UserLinkDto = new UserLinkDto(
        0,
        Number(userId),
        linkId,
        link.name,
        link.link,
        link.color,
        false,
        false,
        link.groupId,
        "",
        0
      );

      connection
        .query(QUERY.LINK.ASSOCIATE_LINK_TO_USER_LINK(userLink))
        .then((result: UserLinkDto[]) => {
          QueryService.controlUndefinedResult(
            result[0],
            () => {
              callback(ERROR_MESSAGE.FAILED_CREATE_ANY("link"));
            },
            () => {
              callback(null, result[0].id);
            }
          );
        })
        .catch((err) => {
          callback(ERROR_MESSAGE.FAILED_CREATE_ANY("link"));
        });
    }
  }

  /**
   * @description Update link
   * @param  {Request} _request
   * @param  {Response} _response
   * @returns Response - LinkId
   */
  public static async update(
    link: UserLinkDto,
    userId: number,
    callback: CallableFunction
  ) {
    const resultLinkById = await connection
      .query(QUERY.LINK.SELECT_LINK_BY_LINK_ID_AND_USER_ID(userId, link.id))
      .catch((err) => {
        callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("link"));
      });
    const resultLinkByUrl = await connection
      .query(QUERY.LINK.SELECT_LINK_BY_URL(link.link))
      .catch((err) => {
        callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("link"));
      });

    let linkId: number = 0;

    if (resultLinkById[0] === undefined) {
      callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("link"));
    }

    if (resultLinkByUrl[0] !== undefined) {
      linkId = LinkHelper.mapToObject(resultLinkByUrl[0]).id;
    }

    if (linkId === 0) {
      const resultCreateLink = await connection
        .query(QUERY.LINK.CREATE_LINK(link.link, userId))
        .catch((err) => {
          callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("link"));
        });

      QueryService.controlUndefinedResult(
        resultCreateLink[0],
        () => {
          callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("link"));
        },
        () => {
          link.linkId = LinkHelper.mapToObject(resultCreateLink[0]).id;
        }
      );
    }

    connection
      .execute(QUERY.LINK.UPDATE_LINK(link, userId))
      .then(() => {
        callback(null, link.id);
      })
      .catch((err) => {
        callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("link"));
      });
  }

  /**
   * @description Delete Link
   * @param  {Request} _request
   * @param  {Response} _response
   * @returns Response - Deleted link
   */
  public static async delete(
    linkId: number,
    userId: number,
    callback: CallableFunction
  ) {
    const resultLinkById: UserLinkDto[] = await connection
      .query(QUERY.LINK.SELECT_LINK_BY_LINK_ID_AND_USER_ID(userId, linkId))
      .catch((err) => {
        callback(ERROR_MESSAGE.FAILED_DELETE_ANY("link"));
      });

    QueryService.controlUndefinedResult(
      resultLinkById[0],
      () => {
        callback(ERROR_MESSAGE.FAILED_DELETE_ANY("link"));
      },
      () => {
        connection
          .query(QUERY.LINK.DELETE_LINK(linkId, userId))
          .then((result: UserLinkDto[]) => {
            callback(null, result[0]);
          })
          .catch((err) => {
            callback(ERROR_MESSAGE.FAILED_DELETE_ANY("link"));
          });
      }
    );
  }

  /**
   * @description Toggle Favorite
   * @param  {Request} _request
   * @param  {Response} _response
   * @returns Response - Modified Link
   */
  public static async toggleFavorite(
    linkId: number,
    userId: number,
    callback: CallableFunction
  ) {
    const resultLinkById: UserLinkDto[] = await connection
      .query(QUERY.LINK.SELECT_LINK_BY_LINK_ID_AND_USER_ID(userId, linkId))
      .catch((err) => {
        callback(ERROR_MESSAGE.FAILED_UPDATE_ANY("link"));
      });

    QueryService.controlUndefinedResult(
      resultLinkById[0],
      () => {
        callback(ERROR_MESSAGE.FAILED_GET_ANY("link"));
      },
      () => {
        connection
          .query(QUERY.LINK.TOGGLE_FAVORITE(linkId, userId))
          .then((result: UserLinkDto[]) => {
            QueryService.controlUndefinedResult(
              result,
              () => {
                callback(
                  ERROR_MESSAGE.FAILED_MARK_TO_FAVORITE_LINK(
                    "link",
                    resultLinkById[0]
                  )
                );
              },
              () => {
                this.getLinkByUserLinkIdAndUserId(linkId, userId, callback);
              }
            );
          })
          .catch((err) => {
            callback(
              ERROR_MESSAGE.FAILED_MARK_TO_FAVORITE_LINK(
                "link",
                resultLinkById[0]
              )
            );
          });
      }
    );
  }

  /**
   * @description Toggle Active
   * @param  {Request} _request
   * @param  {Response} _response
   * @returns Response - Modified Link
   */
  public static async toggleActive(
    linkId: number,
    userId: number,
    callback: CallableFunction
  ) {
    const resultLinkById: UserLinkDto[] = await connection
      .query(QUERY.LINK.SELECT_LINK_BY_LINK_ID_AND_USER_ID(userId, linkId))
      .catch((err) => {
        ERROR_MESSAGE.FAILED_GET_ANY("link");
      });

    QueryService.controlUndefinedResult(
      resultLinkById[0],
      () => {
        callback(ERROR_MESSAGE.FAILED_GET_ANY("link"));
      },
      () => {
        connection
          .query(QUERY.LINK.TOGGLE_ACTIVE(linkId, userId))
          .then((result: UserLinkDto[]) => {
            QueryService.controlUndefinedResult(
              result,
              () => {
                callback(
                  ERROR_MESSAGE.FAILED_MARK_TO_ACTIVE_LINK(
                    "link",
                    resultLinkById[0]
                  )
                );
              },
              () => {
                this.getLinkByUserLinkIdAndUserId(linkId, userId, callback);
              }
            );
          })
          .catch((err) => {
            callback(
              ERROR_MESSAGE.FAILED_MARK_TO_ACTIVE_LINK(
                "link",
                resultLinkById[0]
              )
            );
          });
      }
    );
  }
  /**
   * @description Toggle Active
   * @param  {Request} _request
   * @param  {Response} _response
   * @returns Response - Modified Link
   */
  public static async recorderLink(
    reorderlinkRequest: ReorderLinkRequestDto,
    userId: number,
    callback: CallableFunction
  ) {
    const newLinkOnPosition: UserLinkDto[] = await connection
      .query(
        QUERY.LINK.SELECT_LINK_BY_LINK_ID_AND_USER_ID(
          userId,
          reorderlinkRequest.newLinkIdOnPosition
        )
      )
      .catch((err) => {
        callback(ERROR_MESSAGE.FAILED_GET_ANY("link"));
      });

    const lastLinkOnPosition: UserLinkDto[] = await connection
      .query(
        QUERY.LINK.SELECT_LINK_BY_LINK_ID_AND_USER_ID(
          userId,
          reorderlinkRequest.lastLinkIdOnPosition
        )
      )
      .catch((err) => {
        callback(ERROR_MESSAGE.FAILED_GET_ANY("link"));
      });

    if (
      newLinkOnPosition[0] === undefined &&
      lastLinkOnPosition[0] === undefined
    ) {
      callback(ERROR_MESSAGE.FAILED_REORDER_LINK("link", newLinkOnPosition[0]));
      return;
    }

    if (newLinkOnPosition[0].linkId === lastLinkOnPosition[0].linkId) {
      callback(ERROR_MESSAGE.FAILED_REORDER_LINK("link", newLinkOnPosition[0]));
      return;
    }

    if (newLinkOnPosition[0].groupId !== lastLinkOnPosition[0].groupId) {
      callback(ERROR_MESSAGE.FAILED_REORDER_LINK("link", newLinkOnPosition[0]));
      return;
    }

    const { groupId, newLinkIdOnPosition, lastLinkIdOnPosition } =
      reorderlinkRequest;
    const newOrder =
      lastLinkOnPosition[0]?.linkOrder ?? newLinkOnPosition[0]?.linkOrder ?? 0;
    const lastOrder =
      newLinkOnPosition[0]?.linkOrder ?? lastLinkOnPosition[0]?.linkOrder ?? 0;

    connection
      .query(
        QUERY.GROUP.REORDER_LINK_ON_GROUP(
          newOrder,
          groupId,
          newLinkIdOnPosition
        )
      )
      .then(() => {
        connection
          .query(
            QUERY.GROUP.REORDER_LINK_ON_GROUP(
              lastOrder,
              groupId,
              lastLinkIdOnPosition
            )
          )
          .then(() => {
            callback(
              null,
              new ReorderLinkResponseDto(
                newLinkOnPosition[0],
                lastLinkOnPosition[0]
              )
            );
          })
          .catch((err) => {
            callback(
              ERROR_MESSAGE.FAILED_REORDER_LINK("link", newLinkOnPosition[0])
            );
          });
      })
      .catch((err) => {
        callback(
          ERROR_MESSAGE.FAILED_REORDER_LINK("link", newLinkOnPosition[0])
        );
      });
  }

  /**
   * @description Filtered and return only active links
   * @param  {UserLinkDto[]} linkList
   * @param  {number} active
   * @param  {number} favorite
   */
  private static filteredLinkList(
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
