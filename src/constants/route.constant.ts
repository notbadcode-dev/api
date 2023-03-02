export const RouteConstants = {
  auth: {
    path: "/auth/",
    sign: "/sign",
    keep: "/keep/:id",
  },

  user: {
    path: "/user/",
    getUser: "/getUser",
    getById: "/getById/:id",
    create: "/create",
    update: "/update",
  },

  link: {
    path: "/link/",
    getAll: "/getAll",
    getAllByGroupIdAndGroupId: "/getAllByGroupId/:groupId",
    getLinkByUserLinkIdAndUserId: "/getLinkByUserLinkIdAndUserId/:userLinkId",
    create: "/create",
    update: "/update",
    delete: "/delete/:userLinkId",
    toggleFavorite: "/toggleFavorite/:userLinkId",
    toggleActive: "/toggleActive/:userLinkId",
  },

  linkGroup: {
    path: "/linkGroup/",
    reorderLink: "/reorderLink",
  },
};
