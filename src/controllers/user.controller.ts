import { Request, Response } from "express";
import { ManageSendResponse } from "../core/models/http-response.model";

import { User } from "../core/models/user.model";
import { HttpResponseService } from "../core/services/http-response.service";
import { UserService } from "../core/services/user/user.service";

/**
 * @description Get any user by id
 * @param  {Request} _request
 * @param  {Response} _response
 * @returns Response - User
 */
export const GetUserById = async (_request: Request, _response: Response) => {
  const { id: _id } = _request.params;

  UserService.getById(Number(_id), (error: Error, user: User) => {
    return HttpResponseService.manageSendResponse(
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
export const Create = async (_request: Request, _response: Response) => {
  const _user: User = _request.body;

  UserService.create(_user, (error: Error, user: User) => {
    return HttpResponseService.manageSendResponse(
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
export const Update = async (_request: Request, _response: Response) => {
  const _user: User = _request.body;

  UserService.update(_user, (error: Error, user: User) => {
    return HttpResponseService.manageSendResponse(
      new ManageSendResponse(_response, error, user, "User")
    );
  });
};
