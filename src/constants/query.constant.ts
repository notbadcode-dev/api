import { UserLinkDto } from "../core/models/link.model";
import { User } from "../core/models/user.model";
import { UtilStringService } from "../core/utils/util-string.service";
import { TinyIntTypes } from "../core/enums/global.enum";

export const QUERY = {
  AUTH: {
    SELECT_USER_WHERE_USERNAME_AND_PHARAPHRASE: (
      userName: string,
      paraphrase: string
    ) => {
      return UtilStringService.formatQuery(
        "SELECT * FROM users WHERE userName = '{0}' and paraphrase = '{1}'",
        [userName, paraphrase]
      );
    },
  },

  USER: {
    SELECT_USER_WHERE_ID: (id: number) => {
      return UtilStringService.formatQuery(
        "SELECT id, userName FROM users WHERE id = {0};",
        [id]
      );
    },
    SELECT_USER_WHERE_USERNAME: (userName: string) => {
      return UtilStringService.formatQuery(
        "SELECT id, userName FROM users WHERE userName = '{0}';",
        [userName]
      );
    },
    CREATE_USER: (user: User) => {
      if (user.userName && user.paraphrase) {
        const today = new Date();
        return UtilStringService.formatQuery(
          "INSERT INTO users (id, userName, paraphrase, createdAt, lastAccessedAt) " +
            "value(null, '{0}', '{1}', '{2}', null) RETURNING *;",
          [user.userName, user?.paraphrase, today]
        );
      }

      return "";
    },
    UPDATE_USER: (user: User) => {
      if (user.userName && user.paraphrase) {
        return UtilStringService.formatQuery(
          "UPDATE users SET userName = '{1}', paraphrase = '{2}' WHERE id = {0};",
          [user.id, user?.userName, user?.paraphrase]
        );
      }

      return "";
    },
  },

  GROUP: {
    SELECT_GROUP_WHERE_USER_ID_ORDER_BY_GROUP_ORDER_AND_GROUP_NAME: (
      userId: number
    ) => {
      return UtilStringService.formatQuery(
        "SELECT " +
          "groups.id AS id, " +
          "groups.groupOrder AS groupOrder, " +
          "groups.name AS name, " +
          "groups.description AS description, " +
          "(SELECT COUNT(*) FROM groupsLinks WHERE groupsLinks.groupId = groups.id) AS linksCount " +
          "groups.createdAt AS createDate, " +
          "groups.lastModifiedAt AS lastModifiedAt, " +
          "FROM groups WHERE groups.userId = {0} " +
          "ORDER BY groupOrder, name;",
        [userId]
      );
    },

    EXIST_LINK_ON_GROUP_WHERE_USER_ID_AND_GROUP_ID_AND_PARAMETRIZE_ACTIVE: (
      userId: number,
      linkId: number,
      groupId: number,
      active: TinyIntTypes
    ) => {
      return UtilStringService.formatQuery(
        "SELECT count(*) " +
          "FROM usersLinks " +
          "LEFT OUTER JOIN links ON(links.id = usersLinks.id) " +
          "LEFT OUTER JOIN groupsLinks ON(groupsLinks.linkId = usersLinks.linkId) " +
          "LEFT OUTER JOIN groups ON(groups.id = groupsLinks.groupId) " +
          "WHERE usersLinks.userId = {0} " +
          "AND usersLinks.id = {1} " +
          "AND groups.id = {2} " +
          "AND usersLinks.active = {3};",
        [userId, linkId, groupId, active]
      );
    },

    ASSOCIATE_LINK_TO_GROUP: (groupId: number, linkId: number) => {
      return UtilStringService.formatQuery(
        "INSERT INTO groupsLinks (id, groupId, linkId, linkOrder) " +
          "VALUES (null, {0}, {1}, (SELECT COUNT(*) + 1 AS OrderLink FROM groupsLinks WHERE groupId = {0}));",
        [groupId, linkId]
      );
    },

    DEASSOCIATE_LINK_FROM_GROUP: (groupId: number, linkId: number) => {
      return UtilStringService.formatQuery(
        "DELETE FROM groupsLinks " +
          "WHERE groupId = {0} " +
          "AND linkId = {1};",
        [groupId, linkId]
      );
    },

    REORDER_LINK_ON_GROUP: (
      newLinkOrder: number,
      groupId: number,
      linkId: number
    ) => {
      return UtilStringService.formatQuery(
        "UPDATE " +
          "groupsLinks set linkOrder={0} " +
          "WHERE groupId = {1} " +
          "AND linkId = {2};",
        [newLinkOrder, groupId, linkId]
      );
    },
  },

  LINK: {
    SELECT_LINKS_BY_USER_ID_WITHOUT_GROUP: (userId: number, active: number) => {
      return UtilStringService.formatQuery(
        "SELECT " +
          "links.link AS id, " +
          "usersLinks.userId AS userId, " +
          "usersLinks.id AS userLinkid, " +
          "links.link AS link, " +
          "usersLinks.name AS name, " +
          "usersLinks.color AS color, " +
          "usersLinks.favorite AS favorite, " +
          "usersLinks.active AS active, " +
          "usersLinks.createdAt AS linkCreateDate, " +
          "usersLinks.lastModifiedAt AS lastModifiedAt, " +
          "groups.id AS groupId, " +
          "groups.id AS groupName, " +
          "FROM usersLinks " +
          "LEFT OUTER JOIN links ON(links.id = usersLinks.id) " +
          "LEFT OUTER JOIN groupsLinks ON(groupsLinks.linkId = usersLinks.linkId) " +
          "LEFT OUTER JOIN groups ON(groups.id = groupsLinks.groupId) " +
          "WHERE usersLinks.userId = {0} " +
          "AND usersLinks.active = {1} " +
          "AND groupsLinks.groupId IS NULL " +
          "ORDER BY groupId ASC;",
        [userId, active]
      );
    },

    SELECT_LINKS_BY_USER_ID: (userId: number) => {
      return UtilStringService.formatQuery(
        "SELECT " +
          "usersLinks.id AS id, " +
          "usersLinks.userId AS userId, " +
          "usersLinks.linkId AS linkId, " +
          "usersLinks.name AS name, " +
          "links.link AS link, " +
          "usersLinks.color AS color, " +
          "usersLinks.favorite AS favorite, " +
          "usersLinks.active AS active, " +
          "groups.id AS groupId, " +
          "groups.name AS groupName, " +
          "usersLinks.createdAt AS createdAt, " +
          "usersLinks.lastModifiedAt AS lastModifiedAt " +
          "FROM usersLinks " +
          "LEFT OUTER JOIN links ON(links.id = usersLinks.linkId) " +
          "LEFT OUTER JOIN groupsLinks ON(groupsLinks.linkId = usersLinks.linkId) " +
          "LEFT OUTER JOIN groups ON(groups.id = groupsLinks.groupId) " +
          "WHERE usersLinks.userId = {0} " +
          "ORDER BY groupName ASC;",
        [userId]
      );
    },

    SELECT_LINKS_BY_USER_ID_GROUP_ID: (userId: number, groupId: number) => {
      return UtilStringService.formatQuery(
        "SELECT " +
          "usersLinks.id AS id, " +
          "usersLinks.userId AS userId, " +
          "usersLinks.linkId AS linkId, " +
          "usersLinks.name AS name, " +
          "links.link AS link, " +
          "usersLinks.color AS color, " +
          "usersLinks.favorite AS favorite, " +
          "usersLinks.active AS active, " +
          "groupsLinks.linkOrder AS linkOrder, " +
          "groups.id AS groupId, " +
          "groups.name AS groupName, " +
          "usersLinks.createdAt AS createdAt, " +
          "usersLinks.lastModifiedAt AS lastModifiedAt " +
          "FROM usersLinks " +
          "LEFT OUTER JOIN links ON(links.id = usersLinks.id) " +
          "LEFT OUTER JOIN groupsLinks ON(groupsLinks.linkId = usersLinks.linkId) " +
          "LEFT OUTER JOIN groups ON(groups.id = groupsLinks.groupId) " +
          "WHERE usersLinks.userId = {0} " +
          "AND groupsLinks.groupId = {1} " +
          "ORDER BY groupName, linkOrder ASC;",
        [userId, groupId]
      );
    },

    SELECT_LINK_BY_LINK_ID_AND_USER_ID: (userId: number, linkId: number) => {
      const query: string = UtilStringService.formatQuery(
        "SELECT " +
          "usersLinks.id AS id, " +
          "usersLinks.userId AS userId, " +
          "usersLinks.linkId AS linkId, " +
          "usersLinks.name AS name, " +
          "links.link AS link, " +
          "usersLinks.color AS color, " +
          "usersLinks.favorite AS favorite, " +
          "usersLinks.active AS active, " +
          "groupsLinks.linkOrder AS linkOrder, " +
          "groups.id AS groupId, " +
          "groups.name AS groupName, " +
          "usersLinks.createdAt AS createdAt, " +
          "usersLinks.lastModifiedAt AS lastModifiedAt " +
          "FROM usersLinks " +
          "LEFT OUTER JOIN links ON(links.id = usersLinks.linkId) " +
          "LEFT OUTER JOIN groupsLinks ON(groupsLinks.linkId = usersLinks.linkId) " +
          "LEFT OUTER JOIN groups ON(groups.id = groupsLinks.groupId) " +
          "WHERE usersLinks.userId = {0} " +
          "AND usersLinks.id = {1} " +
          "ORDER BY GroupName ASC;",
        [userId, linkId]
      );

      return query;
    },

    SELECT_LINK_BY_URL: (linkUrl: string) => {
      return UtilStringService.formatQuery(
        "SELECT " +
          "links.id AS id, " +
          "links.link AS link " +
          "FROM links " +
          "WHERE links.link = '{0}';",
        [linkUrl]
      );
    },

    CREATE_LINK: (url: string, userId: number) => {
      const today = new Date();
      return UtilStringService.formatQuery(
        "INSERT INTO links (id, link, createdAt, lastModifiedAt, createdBy) " +
          "VALUES (null, '{0}', '{1}', '{2}', {3}) RETURNING *;",
        [url, today, today, userId]
      );
    },

    UPDATE_LINK: (link: UserLinkDto, userId: number) => {
      const today = new Date();
      return UtilStringService.formatQuery(
        "UPDATE userslinks SET name = '{0}', color = '{1}', lastModifiedAt = '{2}', linkId = {3} WHERE id = {4};",
        [link.name, link.color, today, link.linkId, link.id]
      );
    },

    ASSOCIATE_LINK_TO_USER_LINK: (userLink: UserLinkDto) => {
      const today = new Date();
      return UtilStringService.formatQuery(
        "INSERT INTO usersLinks (id, name, color, userId, linkId, favorite, active, createdAt, lastModifiedAt) " +
          "VALUES (null, '{0}', '{1}', {2}, {3},  0, 1, '{4}', '{5}') RETURNING *;",
        [
          userLink.name,
          userLink.color,
          userLink.userId,
          userLink.linkId,
          today,
          today,
        ]
      );
    },

    ACTIVATE_AND_DEACTIVATE_LINK_FOR_USER_ID: (
      active: number,
      userLink: number,
      userId: number
    ) => {
      return UtilStringService.formatQuery(
        "UPDATE " +
          "usersLinks set active = {0} " +
          "WHERE id = {1} " +
          "AND userId = {2};",
        [active, userLink, userId]
      );
    },

    TOGGLE_FAVORITE: (userLinkId: number, userId: number) => {
      return UtilStringService.formatQuery(
        "UPDATE " +
          "usersLinks SET favorite = IF(favorite=1, 0, 1) " +
          "WHERE id = {0} " +
          "AND userId = {1};",
        [userLinkId, userId]
      );
    },

    TOGGLE_ACTIVE: (userLinkId: number, userId: number) => {
      return UtilStringService.formatQuery(
        "UPDATE " +
          "usersLinks SET active = IF(active=1, 0, 1) " +
          "WHERE id = {0} " +
          "AND userId = {1};",
        [userLinkId, userId]
      );
    },

    DELETE_LINK: (userLinkId: number, userId: number) => {
      return UtilStringService.formatQuery(
        "DELETE FROM " +
          "usersLinks " +
          "WHERE id = {0} " +
          "AND userId = {1} RETURNING *;",
        [userLinkId, userId]
      );
    },
  },
};
