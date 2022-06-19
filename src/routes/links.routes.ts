import { Router } from "express";

import {
  GetLinkListByUserId,
  GetLinkListByUserIdAndGroupId,
  GetLinkByUserLinkId,
  Create,
  Update,
  ToggleFavorite,
  ToggleActive,
} from "../controllers/links.controller";

const linkRoutes = {
  getAllByUserId: "/getAll",
  getAllByUserAndGroupId: "/getAllByGroupId/:groupId",
  getLinkByUserLinkIdAndUserId: "/getLinkByUserLinkIdAndUserId/:userLinkId",
  create: "/create",
  update: "/update",
  toggleFavorite: "/toggleFavorite/:userLinkId",
  toggleActive: "/toggleActive/:userLinkId",
};

const routes = Router();
routes.get(linkRoutes.getAllByUserId, GetLinkListByUserId);
routes.get(linkRoutes.getAllByUserAndGroupId, GetLinkListByUserIdAndGroupId);
routes.get(linkRoutes.getLinkByUserLinkIdAndUserId, GetLinkByUserLinkId);
routes.post(linkRoutes.create, Create);
routes.put(linkRoutes.update, Update);
routes.put(linkRoutes.toggleFavorite, ToggleFavorite);
routes.put(linkRoutes.toggleActive, ToggleActive);

export default routes;
