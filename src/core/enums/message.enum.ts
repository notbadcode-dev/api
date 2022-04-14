export enum MessageType {
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
}

export type MessageTypes =
  | MessageType.info
  | MessageType.success
  | MessageType.warning
  | MessageType.error;
