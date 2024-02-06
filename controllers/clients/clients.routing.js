const { validateToken, authorize } = require("../../helpers/authorize");
const { listClients, createClient } = require("./clients.action");
  module.exports = {
    "/": {
      get: {
        action: [validateToken, listClients],
        level: "public",
      },
      post: {
        action: [validateToken, createClient],
        level: "public",
      },
    },
  };
  