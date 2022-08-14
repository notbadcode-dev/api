import { Response } from "express";

import { Message } from "./message.model.";

export class HttpResponse {
  constructor(
    public data: string | number | boolean | object | Date | null,
    public messageResponseList: Message[]
  ) {}
}

export class ManageSendResponse {
  constructor(
    public response: Response,
    public error: Error,
    public resource: any,
    public resourceDescription: string
  ) {}
}
