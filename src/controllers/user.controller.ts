import { Request, Response } from "express";

import { ManageSendResponse } from "../core/models/http-response.model";
import { User } from "../core/models/user.model";
import { HttpResponseService } from "../core/services/http-response.service";
import { UserService } from "../core/services/user/user.service";

export class UserController {
  private userService!: UserService;
  private httpResponseService!: HttpResponseService;

  constructor() {
    this.userService = new UserService();
    this.httpResponseService = new HttpResponseService();
  }

  /**
   * @description Get user by token
   * @param  {Request} _request
   * @param  {Response} _response
   * @returns Response - User
   */
  GetUser = async (_request: Request, _response: Response) => {
    const token = _request.headers.authorization || "";

    this.userService.get(token, (error: Error, user: User) => {
      return this.httpResponseService.manageSendResponse(
        new ManageSendResponse(_response, error, user, "User")
      );
    });
  };

  /**
   * @description Get any user by id
   * @param  {Request} _request
   * @param  {Response} _response
   * @returns Response - User
   */
  GetUserById = async (_request: Request, _response: Response) => {
    const { id: _id } = _request.params;

    this.userService.getById(Number(_id), (error: Error, user: User) => {
      return this.httpResponseService.manageSendResponse(
        new ManageSendResponse(_response, error, user, "User")
      );
    });
  };

  /**
   * @description Create user
   * @param  {Request} _request
   * @param  {Response} _response
   * @returns Response - User
   */
  Create = async (_request: Request, _response: Response) => {
    const _user: User = _request.body;

    this.userService.create(_user, (error: Error, user: User) => {
      return this.httpResponseService.manageSendResponse(
        new ManageSendResponse(_response, error, user, "User")
      );
    });
  };

  /**
   * @description Create user
   * @param  {Request} _request
   * @param  {Response} _response
   * @returns Response - User
   */
  Update = async (_request: Request, _response: Response) => {
    const _user: User = _request.body;

    this.userService.update(_user, (error: Error, user: User) => {
      return this.httpResponseService.manageSendResponse(
        new ManageSendResponse(_response, error, user, "User")
      );
    });
  };
}
