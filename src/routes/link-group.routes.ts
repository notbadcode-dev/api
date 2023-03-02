import { Router } from "express";

import { RouteConstants } from "../constants/route.constant";
import { LinkGroupController } from "../controllers/link-group.controller";

const routes = Router();
const linkGroupController: LinkGroupController = new LinkGroupController();

routes.post(
  RouteConstants.linkGroup.reorderLink,
  linkGroupController.ReorderLinkOnGroup
);

export default routes;
