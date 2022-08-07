import "dotenv/config";

import { Request, Response } from "express";

import { HttpResponseService } from "../core/services/http-response.service";
import { TokenService } from "../core/token/token.service";

export const verifyToken = async (
  request: Request,
  response: Response,
  next: CallableFunction
) => {
  const token = request.headers.authorization;

  if (!token) {
    return HttpResponseService.sendUnauthrizedResponse(response);
  }
  if (!TokenService.verifyToken(token).valid) {
    return HttpResponseService.sendUnauthrizedResponse(response);
  }
  next();
};
