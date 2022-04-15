import "dotenv/config";

import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { HttpResponseService } from "../core/services/http-response.service";

export const verifyToken = async (
  request: Request,
  response: Response,
  next: CallableFunction
) => {
  const token = request.headers.authorization;

  if (!token) {
    return HttpResponseService.sendUnauthrizedResponse(response);
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    console.log(err);

    if (err) {
      return HttpResponseService.sendForbiddenResponse(response);
    }

    next();
  });
};
