import { Response } from "express";

import {
  HTTP_RESPONSE_CODE,
  HTTP_RESPONSE_MESSAGE,
} from "../../constants/http-response.constant";
import { MessageType } from "../enums/message.enum";
import {
  HttpResponse,
  ManageSendResponse,
} from "../models/http-response.model";

export class HttpResponseService {
  /**
   * @description Send response for http response code
   * @param  {Response} _response
   * @param  {number} httpErrorCode
   * @param  {HttpResponse} httpResponse
   * @return Response
   */
  private sendResponse<T>(
    _response: Response,
    httpErrorCode: number,
    httpResponse: HttpResponse<T>
  ): Response | void | void {
    if (!_response.writableFinished) {
      return _response.status(httpErrorCode).json(httpResponse);
    }
  }

  /**
   * @description: Send response when exist any not controller error on server - HTTP STATUS 500
   * @param  {Response} _response
   * @returns {Response}
   */
  public sendInternalServerErrorResponse(
    _response: Response,
    error: Error
  ): Response | void {
    return this.sendResponse<null>(
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
  public sendNotFoundResponse(
    _response: Response,
    notFoundEntity: string
  ): Response | void {
    return this.sendResponse<null>(_response, HTTP_RESPONSE_CODE.NOT_FOUND, {
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
  public sendForbiddenResponse(_response: Response): Response | void {
    return this.sendResponse<null>(_response, HTTP_RESPONSE_CODE.FORBIDDEN, {
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
  public sendUnauthorizedResponse(_response: Response): Response | void {
    return this.sendResponse<null>(_response, HTTP_RESPONSE_CODE.UNAUTHORIZED, {
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
  public sendSuccessResponse<T>(
    _response: Response,
    successMessage: string,
    sendData: T
  ): Response | void {
    return this.sendResponse<T>(_response, HTTP_RESPONSE_CODE.OK, {
      data: sendData,
      messageResponseList: [
        {
          content: successMessage ?? HTTP_RESPONSE_MESSAGE.OK,
          type: MessageType.success,
        },
      ],
    });
  }

  public manageSendResponse(
    manageSendResponse: ManageSendResponse
  ): Response | void {
    const { response, error, resource, resourceDescription } =
      manageSendResponse;
    if (error) {
      return this.sendInternalServerErrorResponse(response, error);
    }

    if (!resource) {
      return this.sendNotFoundResponse(response, resourceDescription);
    }
    return this.sendSuccessResponse(response, "", resource);
  }
}
