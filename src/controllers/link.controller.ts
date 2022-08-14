import { Request, Response } from "express";

import { ManageSendResponse } from "../core/models/http-response.model";
import { UserLinkDto } from "../core/models/link.model";
import { HttpResponseService } from "../core/services/http-response.service";
import { LinkService } from "../services/link/link.service";

/**
 * @description Get link list by userId
 * @param  {Request} _request
 * @param  {Response} _response
 * @returns Response - Link[]
 */
export const GetLinkListByUserId = async (
  _request: Request,
  _response: Response
) => {
  const { userid: _userId } = _request.headers;
  const { active: _active, favorite: _favorite } = _request.query;

  LinkService.getLinkListByUserId(
    Number(_userId),
    Number(_active),
    Number(_favorite),
    (error: Error, linkList: UserLinkDto[]) => {
      return HttpResponseService.manageSendResponse(
        new ManageSendResponse(_response, error, linkList, "Link list")
      );
    }
  );
};

/**
 * @description Get link list by userId and groupId
 * @param  {Request} _request
 * @param  {Response} _response
 * @returns Response - Link[]
 */
export const GetLinkListByUserIdAndGroupId = async (
  _request: Request,
  _response: Response
) => {
  const { userid: _userId } = _request.headers;
  const { groupId: _groupId } = _request.params;
  const { active: _active, favorite: _favorite } = _request.query;

  LinkService.getLinkListByUserIdAndGroupId(
    Number(_userId),
    Number(_groupId),
    Number(_active),
    Number(_favorite),
    (error: Error, linkList: UserLinkDto[]) => {
      return HttpResponseService.manageSendResponse(
        new ManageSendResponse(_response, error, linkList, "Link list")
      );
    }
  );
};

/**
 * @description Get link list by userId
 * @param  {Request} _request
 * @param  {Response} _response
 * @returns Response - Link
 */
export const GetLinkByUserLinkId = async (
  _request: Request,
  _response: Response
) => {
  const { userid: _userId } = _request.headers;
  const { userLinkId: _userLinkId } = _request.params;

  LinkService.getLinkByUserLinkIdAndUserId(
    Number(_userLinkId),
    Number(_userId),
    (error: Error, linkList: UserLinkDto[]) => {
      return HttpResponseService.manageSendResponse(
        new ManageSendResponse(_response, error, linkList, "Link list")
      );
    }
  );
};

/**
 * @description Create link
 * @param  {Request} _request
 * @param  {Response} _response
 * @returns Response - LinkId
 */
export const Create = async (_request: Request, _response: Response) => {
  const { userid: _userId } = _request.headers;
  const link: UserLinkDto = _request.body;

  LinkService.create(
    link,
    Number(_userId),
    (error: Error, linkList: UserLinkDto[]) => {
      return HttpResponseService.manageSendResponse(
        new ManageSendResponse(_response, error, linkList, "Link")
      );
    }
  );
};

/**
 * @description Update link
 * @param  {Request} _request
 * @param  {Response} _response
 * @returns Response - LinkId
 */
export const Update = async (_request: Request, _response: Response) => {
  const { userid: _userId } = _request.headers;
  const link: UserLinkDto = _request.body;

  LinkService.update(
    link,
    Number(_userId),
    (error: Error, linkList: UserLinkDto[]) => {
      return HttpResponseService.manageSendResponse(
        new ManageSendResponse(_response, error, linkList, "Link")
      );
    }
  );
};

/**
 * @description Delete Link
 * @param  {Request} _request
 * @param  {Response} _response
 * @returns Response - Deleted link
 */
export const DeleteLink = async (_request: Request, _response: Response) => {
  const { userid: _userId } = _request.headers;
  const { userLinkId: _userLinkId } = _request.params;

  LinkService.delete(
    Number(_userLinkId),
    Number(_userId),
    (error: Error, linkList: UserLinkDto[]) => {
      return HttpResponseService.manageSendResponse(
        new ManageSendResponse(_response, error, linkList, "Link")
      );
    }
  );
};

/**
 * @description Toggle Favorite
 * @param  {Request} _request
 * @param  {Response} _response
 * @returns Response - Modified link
 */
export const ToggleFavorite = async (
  _request: Request,
  _response: Response
) => {
  const { userid: _userId } = _request.headers;
  const { userLinkId: _userLinkId } = _request.params;

  LinkService.toggleFavorite(
    Number(_userLinkId),
    Number(_userId),
    (error: Error, linkList: UserLinkDto[]) => {
      return HttpResponseService.manageSendResponse(
        new ManageSendResponse(_response, error, linkList, "Link")
      );
    }
  );
};

/**
 * @description Toggle Active
 * @param  {Request} _request
 * @param  {Response} _response
 * @returns Response - Modified link
 */
export const ToggleActive = async (_request: Request, _response: Response) => {
  const { userid: _userId } = _request.headers;
  const { userLinkId: _userLinkId } = _request.params;

  LinkService.toggleActive(
    Number(_userLinkId),
    Number(_userId),
    (error: Error, linkList: UserLinkDto[]) => {
      return HttpResponseService.manageSendResponse(
        new ManageSendResponse(_response, error, linkList, "Link")
      );
    }
  );
};
