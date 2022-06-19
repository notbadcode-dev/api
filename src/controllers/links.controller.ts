import { Request, Response } from "express";

import { UserLinkDto } from "../core/models/link.model";
import { HttpResponseService } from "../core/services/http-response.service";
import { LinkService } from "../core/services/link.service";

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
      if (error) {
        return HttpResponseService.sendInternalServerErrorResponse(
          _response,
          error
        );
      }

      if (!linkList) {
        return HttpResponseService.sendNotFoundResponse(_response, "Link list");
      }
      return HttpResponseService.sendSuccesResponse(_response, "", linkList);
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
      if (error) {
        return HttpResponseService.sendInternalServerErrorResponse(
          _response,
          error
        );
      }

      if (!linkList) {
        return HttpResponseService.sendNotFoundResponse(_response, "Link list");
      }
      return HttpResponseService.sendSuccesResponse(_response, "", linkList);
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
  const { active: _active } = _request.query;

  LinkService.getLinkByUserLinkIdAndUserId(
    Number(_userLinkId),
    Number(_userId),
    (error: Error, linkList: UserLinkDto[]) => {
      if (error) {
        return HttpResponseService.sendInternalServerErrorResponse(
          _response,
          error
        );
      }

      if (!linkList) {
        return HttpResponseService.sendNotFoundResponse(_response, "Link");
      }
      return HttpResponseService.sendSuccesResponse(_response, "", linkList);
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
      if (error) {
        return HttpResponseService.sendInternalServerErrorResponse(
          _response,
          error
        );
      }

      if (!linkList) {
        return HttpResponseService.sendNotFoundResponse(_response, "Link");
      }
      return HttpResponseService.sendSuccesResponse(_response, "", linkList);
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
      if (error) {
        return HttpResponseService.sendInternalServerErrorResponse(
          _response,
          error
        );
      }

      if (!linkList) {
        return HttpResponseService.sendNotFoundResponse(_response, "Link");
      }
      return HttpResponseService.sendSuccesResponse(_response, "", linkList);
    }
  );
};

/**
 * @description Toggle Favorite
 * @param  {Request} _request
 * @param  {Response} _response
 * @returns Response - boolen, true if success
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
      if (error) {
        return HttpResponseService.sendInternalServerErrorResponse(
          _response,
          error
        );
      }

      if (!linkList) {
        return HttpResponseService.sendNotFoundResponse(_response, "Link");
      }
      return HttpResponseService.sendSuccesResponse(_response, "", linkList);
    }
  );
};

/**
 * @description Toggle Active
 * @param  {Request} _request
 * @param  {Response} _response
 * @returns Response - boolen, true if success
 */
export const ToggleActive = async (_request: Request, _response: Response) => {
  const { userid: _userId } = _request.headers;
  const { userLinkId: _userLinkId } = _request.params;

  LinkService.toggleActive(
    Number(_userLinkId),
    Number(_userId),
    (error: Error, linkList: UserLinkDto[]) => {
      if (error) {
        return HttpResponseService.sendInternalServerErrorResponse(
          _response,
          error
        );
      }

      if (!linkList) {
        return HttpResponseService.sendNotFoundResponse(_response, "Link");
      }
      return HttpResponseService.sendSuccesResponse(_response, "", linkList);
    }
  );
};

// delete link
