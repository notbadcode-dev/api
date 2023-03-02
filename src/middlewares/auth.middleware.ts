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
  const httpResponseService: HttpResponseService = new HttpResponseService();
  const tokenService: TokenService = new TokenService();
  const token = request.headers.authorization;
  const excludedUrlList: string[] = [
    "/api/notbadcode",
    "/api/notbadcode/",
    "/api/notbadcode/auth/sign",
    "/api/notbadcode/user/create",
    "/api/notbadcode/docs",
    "/api/notbadcode/docs/",
  ];

  if (request.method === "OPTIONS") {
    next();
  }

  if (!excludedUrlList.includes(request.originalUrl)) {
    if (!token) {
      return httpResponseService.sendUnauthorizedResponse(response);
    }

    const verifiedToken: any = tokenService.verifyToken(token);

    if (!verifiedToken) {
      return httpResponseService.sendUnauthorizedResponse(response);
    }

    const validToken: boolean = verifiedToken.valid;
    const userToken: { id: any; userName: string } = verifiedToken.user;

    if (!validToken) {
      return httpResponseService.sendUnauthorizedResponse(response);
    }

    if (!userToken || !userToken.id || !userToken.userName) {
      return httpResponseService.sendUnauthorizedResponse(response);
    }

    request.headers[REQUEST_HEADER.USER_ID] = userToken.id;
  }

  next();
};
