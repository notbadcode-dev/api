import { Request, Response } from "express";

import { ManageSendResponse } from "../core/models/http-response.model";
import { UserLinkDto } from "../core/models/link.model";
import { HttpResponseService } from "../core/services/http-response.service";
import { LinkService } from "../services/link/link.service";

export class LinkController {
  private httpResponseService!: HttpResponseService;
  private linkService!: LinkService;

  constructor() {
    this.httpResponseService = new HttpResponseService();
    this.linkService = new LinkService();
  }

  /**
   * @description Get link list by userId
   * @param  {Request} _request
   * @param  {Response} _response
   * @returns Response - Link[]
   */
  GetLinkListByUserId = async (_request: Request, _response: Response) => {
    const { userid: _userId } = _request.headers;
    const { active: _active, favorite: _favorite } = _request.query;

    this.linkService.getLinkListByUserId(
      Number(_userId),
      Number(_active),
      Number(_favorite),
      (error: Error, linkList: UserLinkDto[]) => {
        return this.httpResponseService.manageSendResponse(
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
  GetLinkListByUserIdAndGroupId = async (
    _request: Request,
    _response: Response
  ) => {
    const { userid: _userId } = _request.headers;
    const { groupId: _groupId } = _request.params;
    const { active: _active, favorite: _favorite } = _request.query;

    this.linkService.getLinkListByUserIdAndGroupId(
      Number(_userId),
      Number(_groupId),
      Number(_active),
      Number(_favorite),
      (error: Error, linkList: UserLinkDto[]) => {
        return this.httpResponseService.manageSendResponse(
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
  GetLinkByUserLinkId = async (_request: Request, _response: Response) => {
    const { userid: _userId } = _request.headers;
    const { userLinkId: _userLinkId } = _request.params;

    this.linkService.getLinkByUserLinkIdAndUserId(
      Number(_userLinkId),
      Number(_userId),
      (error: Error, linkList: UserLinkDto[]) => {
        return this.httpResponseService.manageSendResponse(
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
  Create = async (_request: Request, _response: Response) => {
    const { userid: _userId } = _request.headers;
    const link: UserLinkDto = _request.body;

    this.linkService.create(
      link,
      Number(_userId),
      (error: Error, linkList: UserLinkDto[]) => {
        return this.httpResponseService.manageSendResponse(
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
  Update = async (_request: Request, _response: Response) => {
    const { userid: _userId } = _request.headers;
    const link: UserLinkDto = _request.body;

    this.linkService.update(
      link,
      Number(_userId),
      (error: Error, linkList: UserLinkDto[]) => {
        return this.httpResponseService.manageSendResponse(
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
  DeleteLink = async (_request: Request, _response: Response) => {
    const { userid: _userId } = _request.headers;
    const { userLinkId: _userLinkId } = _request.params;

    this.linkService.delete(
      Number(_userLinkId),
      Number(_userId),
      (error: Error, linkList: UserLinkDto[]) => {
        return this.httpResponseService.manageSendResponse(
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
  ToggleFavorite = async (_request: Request, _response: Response) => {
    const { userid: _userId } = _request.headers;
    const { userLinkId: _userLinkId } = _request.params;

    this.linkService.toggleFavorite(
      Number(_userLinkId),
      Number(_userId),
      (error: Error, linkList: UserLinkDto[]) => {
        return this.httpResponseService.manageSendResponse(
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
  ToggleActive = async (_request: Request, _response: Response) => {
    const { userid: _userId } = _request.headers;
    const { userLinkId: _userLinkId } = _request.params;

    this.linkService.toggleActive(
      Number(_userLinkId),
      Number(_userId),
      (error: Error, linkList: UserLinkDto[]) => {
        return this.httpResponseService.manageSendResponse(
          new ManageSendResponse(_response, error, linkList, "Link")
        );
      }
    );
  };
}
