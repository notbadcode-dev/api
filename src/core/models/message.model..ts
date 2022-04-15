import { HTTP_RESPONSE_MESSAGE } from "../../constants/http-response.constant";
import { MessageType, MessageTypes } from "../enums/message.enum";

export class Message {
  constructor(public content: string, public type: MessageTypes) {
    content = content ?? HTTP_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR;
    type = type ?? MessageType.info;
  }
}
