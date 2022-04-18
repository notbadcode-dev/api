import { Response } from "express";

import {
  HTTP_RESPONSE_CODE,
  HTTP_RESPONSE_MESSAGE,
} from "../../constants/http-response.constant";
import { MessageType } from "../enums/message.enum";
import { HttpResponse } from "../models/http-response.model";

export class HttpResponseService {
  /**
   * @description Send response for http response code
   * @param  {Response} _response
   * @param  {number} httpErrorCode
   * @param  {HttpResponse} httpResponse
   * @return Response
   */
  private static sendResponse(
    _response: Response,
    httpErrorCode: number,
    httpResponse: HttpResponse
  ): Response {
    return _response.status(httpErrorCode).send(httpResponse);
  }

  /**
   * @description: Send response when exist any not controller error on server - HTTP STATUS 500
   * @param  {Response} _response
   * @returns {Response}
   */
  public static sendInternalServerErrorResponse(
    _response: Response,
    error: Error
  ): Response {
    return this.sendResponse(
      _response,
      HTTP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      {
        data: null,
        messageResponseList: [
          {
            content: `${HTTP_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR} - ${error}`,
            type: MessageType.error,
          },
        ],
      }
    );
  }

  /**
   * @description: Send response when resource required not found - HTTP STATUS 404
   * @param  {Response} _response
   * @param  {string} notFoundEntity - Text for complete not found message
   * @returns Response
   */
  public static sendNotFoundResponse(
    _response: Response,
    notFoundEntity: string
  ): Response {
    return this.sendResponse(_response, HTTP_RESPONSE_CODE.NOT_FOUND, {
      data: null,
      messageResponseList: [
        {
          content: `${notFoundEntity} ${HTTP_RESPONSE_MESSAGE.NOT_FOUND}`,
          type: MessageType.error,
        },
      ],
    });
  }

  /**
   * @description: Send response when forbidden - HTTP STATUS 403
   * @param  {Response} _response
   * @returns Response
   */
  public static sendForbiddenResponse(_response: Response): Response {
    return this.sendResponse(_response, HTTP_RESPONSE_CODE.FORBIDDEN, {
      data: null,
      messageResponseList: [
        {
          content: HTTP_RESPONSE_MESSAGE.FORBIDDEN,
          type: MessageType.warning,
        },
      ],
    });
  }

  /**
   * @description: Send response when forbidden - HTTP STATUS 401
   * @param  {Response} _response
   * @returns Response
   */
  public static sendUnauthrizedResponse(_response: Response): Response {
    return this.sendResponse(_response, HTTP_RESPONSE_CODE.UNAUTHORIZED, {
      data: null,
      messageResponseList: [
        {
          content: HTTP_RESPONSE_MESSAGE.UNAUTHORIZED,
          type: MessageType.warning,
        },
      ],
    });
  }

  /**
   * @description: Send sucessfully response whit required data - HTTP STATUS 200
   * @param  {Response} _response
   * @param  {string} successMessage
   * @param  {any} sendData
   * @returns Response
   */
  public static sendSuccesResponse(
    _response: Response,
    successMessage: string,
    sendData: any
  ): Response {
    return this.sendResponse(_response, HTTP_RESPONSE_CODE.OK, {
      data: sendData,
      messageResponseList: [
        {
          content: successMessage ?? HTTP_RESPONSE_MESSAGE.OK,
          type: MessageType.success,
        },
      ],
    });
  }
}
