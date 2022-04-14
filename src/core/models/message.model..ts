import { MessageTypes } from "../enums/message.enum";

export interface Message {
  content: string;
  type: MessageTypes;
}
