import { UserLinkDto } from "../core/models/link.model";

export const ERROR_MESSAGE = {
  FAILED_GET_ANY: (resourceName: string) =>
    `Failed to get ${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(resourceName)}`,
  FAILED_CREATE_ANY: (resourceName: string) =>
    `Failed to create ${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(resourceName)}`,
  FAILED_UPDATE_ANY: (resourceName: string) =>
    `Failed to update ${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(resourceName)}`,
  FAILED_DELETE_ANY: (resourceName: string) =>
    `Failed to delete ${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(resourceName)}`,
  FAILED_MARK_TO_FAVORITE_LINK: (resourceName: string, link: UserLinkDto) =>
    `Failed on mark to favorite ${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(
      resourceName
    )} ${LOWERCASE_ERROR_MESSAGE_LINK_PROPERTY_STRING(link, "name")}`,
  FAILED_MARK_TO_ACTIVE_LINK: (resourceName: string, link: UserLinkDto) =>
    `Failed on mark to favorite ${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(
      resourceName
    )} ${LOWERCASE_ERROR_MESSAGE_LINK_PROPERTY_STRING(link, "name")}`,
  FAILED_REORDER_LINK: (resourceName: string, link: UserLinkDto) =>
    `Failed on reorder ${LOWERCASE_ERROR_MESSAGE_RESOURCE_NAME(
      resourceName
    )} ${LOWERCASE_ERROR_MESSAGE_LINK_PROPERTY_STRING(link, "name")}`,
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
