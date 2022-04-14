import { Message } from "./message.model.";

export interface HttpResponse {
  data: string | number | boolean | object | Date | null;
  messageResponseList: Message[];
}
