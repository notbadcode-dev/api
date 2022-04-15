import { Request, Response } from "express";

import { User } from "../core/models/user/user.model";
import { HttpResponseService } from "../core/services/http-response.service";
import { UserService } from "../core/services/user.service";

/**
 * @description Get any user by id
 * @param  {Request} _request
 * @param  {Response} _response
 * @returns Response - User
 */
export const GetUserById = async (_request: Request, _response: Response) => {
  const { id: _id } = _request.params;

  UserService.getUserById(_id, (error: Error, user: User) => {
    if (error) {
      return HttpResponseService.sendInternalServerErrorResponse(_response);
    }

    if (!user) {
      return HttpResponseService.sendNotFoundResponse(_response, "User");
    }
    return HttpResponseService.sendSuccesResponse(_response, "", user);
  });
};
