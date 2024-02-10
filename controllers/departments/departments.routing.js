const { listDepartments, createDepartment,associateUserDepartment ,updateUser} = require("./departments.action");
const { validateToken, authorize } = require("../../helpers/authorize");

module.exports = {
  "/": {
    get: {
      action: [validateToken, listDepartments],
      level: "public",
    },
    post: {
      action: [validateToken, createDepartment],
      level: "public",
    },
    put: {
      action: [validateToken, updateUser],
      level: "public",
    },
  },
  "/associate": {
   
    post: {
      action: [validateToken, associateUserDepartment],
      level: "public",
    },
  },
};
