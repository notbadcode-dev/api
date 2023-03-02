import { Router } from "express";

import { RouteConstants } from "../constants/route.constant";
import { LinkController } from "../controllers/link.controller";

const routes = Router();
const linkController: LinkController = new LinkController();

routes.get(RouteConstants.link.getAll, linkController.GetLinkListByUserId);
routes.get(
  RouteConstants.link.getAllByGroupIdAndGroupId,
  linkController.GetLinkListByUserIdAndGroupId
);
routes.get(
  RouteConstants.link.getLinkByUserLinkIdAndUserId,
  linkController.GetLinkByUserLinkId
);
routes.post(RouteConstants.link.create, linkController.Create);
routes.put(RouteConstants.link.update, linkController.Update);
routes.delete(RouteConstants.link.delete, linkController.DeleteLink);
routes.put(RouteConstants.link.toggleFavorite, linkController.ToggleFavorite);
routes.put(RouteConstants.link.toggleActive, linkController.ToggleActive);

export default routes;
