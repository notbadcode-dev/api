import { Response } from "express";

import { Message } from "./message.model.";

export class HttpResponse<T> {
  constructor(public data: T | null, public messageResponseList: Message[]) {}
}

export class ManageSendResponse {
  constructor(
    public response: Response,
    public error: Error,
    public resource: any,
    public resourceDescription: string
  ) {}
}
