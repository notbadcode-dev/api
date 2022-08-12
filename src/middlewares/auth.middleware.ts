import "dotenv/config";

import { Request, Response } from "express";
import { REQUEST_HEADER } from "../constants/http-request.constant";

import { HttpResponseService } from "../core/services/http-response.service";
import { TokenService } from "../core/token/token.service";

export const verifyToken = async (
  request: Request,
  response: Response,
  next: CallableFunction
) => {
  const token = request.headers.authorization;
  const excludedUrlList: string[] = [
    "/api/notbadcode/auth/sign",
    "/api/notbadcode/user/create",
  ];

  if (!excludedUrlList.includes(request.originalUrl)) {
    if (!token) {
      return HttpResponseService.sendUnauthrizedResponse(response);
    }

    const verifiedToken: any = TokenService.verifyToken(token);

    if (!verifiedToken) {
      return HttpResponseService.sendUnauthrizedResponse(response);
    }

    const validToken: boolean = verifiedToken.valid;
    const userToken: { id: any; userName: string } = verifiedToken.user;

    if (!validToken) {
      return HttpResponseService.sendUnauthrizedResponse(response);
    }

    if (!userToken || !userToken.id || !userToken.userName) {
      return HttpResponseService.sendUnauthrizedResponse(response);
    }

    request.headers[REQUEST_HEADER.USER_ID] = userToken.id;
  }

  next();
};
