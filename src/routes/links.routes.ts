import { Router } from "express";

import {
  GetLinkListByUserId,
  GetLinkListByUserIdAndGroupId,
  GetLinkByUserLinkId,
  Create,
  Update,
  ToggleFavorite,
  ToggleActive,
  DeleteLink,
  ReorderLinkOnGroup,
} from "../controllers/links.controller";

const linkRoutes = {
  getAllByUserId: "/getAll",
  getAllByUserAndGroupId: "/getAllByGroupId/:groupId",
  getLinkByUserLinkIdAndUserId: "/getLinkByUserLinkIdAndUserId/:userLinkId",
  create: "/create",
  update: "/update",
  delete: "/delete/:userLinkId",
  toggleFavorite: "/toggleFavorite/:userLinkId",
  toggleActive: "/toggleActive/:userLinkId",
  reorderLink: "/reorderLink",
};

const routes = Router();
routes.get(linkRoutes.getAllByUserId, GetLinkListByUserId);
routes.get(linkRoutes.getAllByUserAndGroupId, GetLinkListByUserIdAndGroupId);
routes.get(linkRoutes.getLinkByUserLinkIdAndUserId, GetLinkByUserLinkId);
routes.post(linkRoutes.create, Create);
routes.put(linkRoutes.update, Update);
routes.delete(linkRoutes.delete, DeleteLink);
routes.put(linkRoutes.toggleFavorite, ToggleFavorite);
routes.put(linkRoutes.toggleActive, ToggleActive);
routes.post(linkRoutes.reorderLink, ReorderLinkOnGroup);

export default routes;
