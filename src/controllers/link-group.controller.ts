import { Request, Response } from "express";

import { ManageSendResponse } from "../core/models/http-response.model";
import {
  ReorderLinkRequestDto,
  ReorderLinkResponseDto,
} from "../core/models/link.model";
import { HttpResponseService } from "../core/services/http-response.service";
import { LinkGroupService } from "../services/link-group/link-group.service";

export class LinkGroupController {
  httpResponseService!: HttpResponseService;

  constructor() {
    this.httpResponseService = new HttpResponseService();
  }

  ReorderLinkOnGroup = async (_request: Request, _response: Response) => {
    const { userid: _userId } = _request.headers;
    const reorderlinkRequest: ReorderLinkRequestDto = _request.body;

    LinkGroupService.reorderLink(
      reorderlinkRequest,
      Number(_userId),
      (error: Error, reorderLinkResponseDto: ReorderLinkResponseDto) => {
        return this.httpResponseService.manageSendResponse(
          new ManageSendResponse(
            _response,
            error,
            reorderLinkResponseDto,
            "Link"
          )
        );
      }
    );
  };
}
