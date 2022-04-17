import "dotenv/config";

import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { HttpResponseService } from "../core/services/http-response.service";
import { TokenService } from "../core/services/token.service";

export const verifyToken = async (
  request: Request,
  response: Response,
  next: CallableFunction
) => {
  const token = request.headers.authorization;

  if (!token) {
    return HttpResponseService.sendUnauthrizedResponse(response);
  }
  const tokenValid: any = TokenService.verifyToken(token).valid;
  if (!tokenValid) {
    return HttpResponseService.sendForbiddenResponse(response);
  }
  next();
};
