import { Response } from "express";

import { HTTP_RESPONSE_CODE } from "../../constants/http-response.constant";
import { MessageType } from "../enums/message.enum";
import { HttpResponse } from "../models/http-response.model";

export class HttpResponseService {
  /**
   * @description: Send response when exist any not controller error on server - HTTP STATUS 500
   * @param  {Response} _response
   * @returns {Response}
   */
  public static sendInternalServerErrorResponse(_response: Response): Response {
    const httpResponse: HttpResponse = {
      data: null,
      messageResponseList: [
        {
          content: "Internal Server Error",
          type: MessageType.error,
        },
      ],
    };
    return _response
      .status(HTTP_RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .send(httpResponse);
  }

  /**
   * @description: Send response when resource required not found - HTTP STATUS 404
   * @param  {Response} _response
   * @param  {string} notFoundEntity - Text for complete not found message
   * @returns {Response}
   */
  public static sendNotFoundResponse(
    _response: Response,
    notFoundEntity: string
  ): Response {
    const httpResponse: HttpResponse = {
      data: null,
      messageResponseList: [
        {
          content: `Not found ${notFoundEntity}`,
          type: MessageType.error,
        },
      ],
    };
    return _response.status(HTTP_RESPONSE_CODE.NOT_FOUND).send(httpResponse);
  }

  /**
   * @description: Send sucessfully response whit required data - HTTP STATUS 200
   * @param  {Response} _response
   * @param  {string} successMessage
   * @param  {any} sendData
   * @returns {Response}
   */
  public static sendSuccesResponse(
    _response: Response,
    successMessage: string,
    sendData: any
  ): Response {
    const httpResponse: HttpResponse = {
      data: sendData,
      messageResponseList: [
        {
          content: successMessage,
          type: MessageType.success,
        },
      ],
    };
    return _response.status(HTTP_RESPONSE_CODE.OK).send(httpResponse);
  }
}
