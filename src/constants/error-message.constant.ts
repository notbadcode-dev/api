import { UserLinkDto } from "../core/models/link.model";

export const ERROR_MESSAGE_AUTH = {
  ERROR_ON_LOGIN: "Error on login",
  ERROR_ON_LOGOUT: "Error on logout",
  ERROR_ON_KEEP_SESSION: "Error on keep session",
  ERROR_ON_SEARCH_USERNAME_OR_PASSWORD: "Error searh username or password",
};

export const ERROR_MESSAGE_USER = {
  USER_ALREADY_EXIST_SAME_USERNAME: "User already exist with same username",
  USERNAME_IS_EMPTY: "Username is empty",
  USERNAME_NOT_EMAIL: "User name is not email",
  USERNAME_IS_SUSPICIOUS: "User name is suspicious",
  PASSWORD_NOT_CORRECT_LENGHT: "Password is not correct length",
  PASSWORD_CONTAINS_MORE_THAN_TWO_NUMBERS_IN_ROW:
    "Password contains more than 2 numbers in a row",
  PASSWORD_CONTAINS_MORE_THAN_TREE_NUMBERS:
    "Password contain more than 3 numbers",
  PASSWORD_NOT_CONSTAINS_NUMBERS: "Password not contain numbers",
  PASSWORD_NOT_CONSTAINS_LOWER_NUMBERS: "Password not contain lower letters",
  PASSWORD_NOT_CONSTAINS_UPPER_NUMBERS: "Password not contain upper letters",
  PASSWORD_NOT_CONSTAINS_SPECIAL_CHARACTER:
    "Password not contain special character",
};

export const ERROR_MESSAGE = {
  NOT_FOUND_ANY: (resourceName: string): string =>
    `${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(resourceName)} not found`,
  FAILED_GET_ANY: (resourceName: string): string =>
    `Failed to get ${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(resourceName)}`,
  FAILED_CREATE_ANY: (resourceName: string) =>
    `Failed to create ${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(resourceName)}`,
  FAILED_UPDATE_ANY: (resourceName: string) =>
    `Failed to update ${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(resourceName)}`,
  FAILED_DELETE_ANY: (resourceName: string) =>
    `Failed to delete ${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(resourceName)}`,
  FAILED_ASSOCIATE_LINK_TO_USER_LINK: (linkName: string) =>
    `Failed to associate link ${linkName}`,
  FAILED_MARK_TO_FAVORITE_LINK: (resourceName: string, link?: UserLinkDto) =>
    `Failed on mark to favorite ${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(
      resourceName
    )} ${
      link ? LOWERCASE_ERROR_MESSAGE_LINK_PROPERTY_STRING(link, "name") : ""
    }`,
  FAILED_MARK_TO_ACTIVE_LINK: (resourceName: string, link?: UserLinkDto) =>
    `Failed on mark to favorite ${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(
      resourceName
    )} ${
      link ? LOWERCASE_ERROR_MESSAGE_LINK_PROPERTY_STRING(link, "name") : ""
    }`,
  FAILED_REORDER_LINK: (resourceName: string, link?: UserLinkDto) =>
    `Failed on reorder ${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(resourceName)} ${
      link ? LOWERCASE_ERROR_MESSAGE_LINK_PROPERTY_STRING(link, "name") : ""
    }`,
};

export const LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME = (resourceName: string) => {
  return resourceName?.trim()?.toLowerCase() ?? "";
};

export const LOWERCASE_ERROR_MESSAGE_LINK_PROPERTY_STRING = (
  link: UserLinkDto,
  property: string
) => {
  if (link) {
    return "";
  }

  if (!link[property]) {
    return "";
  }

  return link[property];
};
