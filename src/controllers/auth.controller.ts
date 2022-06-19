import { Request, Response } from "express";

import { User } from "../core/models/user.model";
import { AuthService } from "../core/services/auth.service";
import { HttpResponseService } from "../core/services/http-response.service";

/**
 * @description Sign in with userName and paraphrase
 * @param  {Request} _request
 * @param  {Response} _response
 * @returns Response - Token
 */
export const SignIn = async (_request: Request, _response: Response) => {
  const { userName: _userName, paraphrase: _paraphrase } = _request.body;
  AuthService.signIn(_userName, _paraphrase, (error: Error, user: User) => {
    if (error) {
      return HttpResponseService.sendInternalServerErrorResponse(
        _response,
        error
      );
    }

    if (!user) {
      return HttpResponseService.sendNotFoundResponse(_response, "User");
    }
    return HttpResponseService.sendSuccesResponse(_response, "", user);
  });
};

/**
 * @description Verify token for any user for keep session
 * @param  {Request} _request
 * @param  {Response} _response
 * @returns Response - Token
 */
export const KeepSession = async (_request: Request, _response: Response) => {
  const { id: _id } = _request.params;
  const token = _request.headers.authorization;

  AuthService.keepSession(
    _id,
    token as string,
    (error: Error, verifyToken: boolean) => {
      if (error) {
        return HttpResponseService.sendInternalServerErrorResponse(
          _response,
          error
        );
      }

      if (!verifyToken) {
        return HttpResponseService.sendForbiddenResponse(_response);
      }

      return HttpResponseService.sendSuccesResponse(_response, "", verifyToken);
    }
  );
};
