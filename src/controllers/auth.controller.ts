import { Request, Response } from "express";

import { EntityNameConstant } from "../constants/entity.constant";
import { AuthService } from "../core/auth/auth.service";
import { ManageSendResponse } from "../core/models/http-response.model";
import { User } from "../core/models/user.model";
import { HttpResponseService } from "../core/services/http-response.service";

export class AuthController {
  httpResponseService!: HttpResponseService;
  authService!: AuthService;

  constructor() {
    this.httpResponseService = new HttpResponseService();
    this.authService = new AuthService();
  }

  /**
   * @description Sign in with userName and paraphrase
   * @param  {Request} _request
   * @param  {Response} _response
   * @returns Response - Token
   */
  SignIn = async (_request: Request, _response: Response) => {
    const { userName: _userName, paraphrase: _paraphrase } = _request.body;
    this.authService.signIn(
      _userName,
      _paraphrase,
      (error: Error, user: User) => {
        return this.httpResponseService.manageSendResponse(
          new ManageSendResponse(
            _response,
            error,
            user,
            EntityNameConstant.user
          )
        );
      }
    );
  };

  /**
   * @description Verify token for any user for keep session
   * @param  {Request} _request
   * @param  {Response} _response
   * @returns Response - Token
   */
  KeepSession = async (_request: Request, _response: Response) => {
    const { id: _id } = _request.params;
    const token = _request.headers.authorization;

    this.authService.keepSession(
      Number(_id),
      token as string,
      (error: Error, verifyToken: boolean) => {
        if (error) {
          return this.httpResponseService.sendInternalServerErrorResponse(
            _response,
            error
          );
        }

        if (!verifyToken) {
          return this.httpResponseService.sendForbiddenResponse(_response);
        }

        return this.httpResponseService.sendSuccessResponse(
          _response,
          "",
          verifyToken
        );
      }
    );
  };
}
