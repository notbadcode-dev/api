import { Message } from "./message.model.";

export class HttpResponse {
  constructor(
    public data: string | number | boolean | object | Date | null,
    public messageResponseList: Message[]
  ) {}
}
