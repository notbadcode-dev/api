export const ERROR_MESSAGE = {
  FAILED_GET_ANY: (resourceName: string) => `Failed to get ${resourceName}`,
  FAILED_CREATE_ANY: (resourceName: string) =>
    `Failed to create ${resourceName.trim().toLowerCase()}`,
  FAILED_UPDATE_ANY: (resourceName: string) =>
    `Failed to update ${resourceName.trim().toLowerCase()}`,
};
