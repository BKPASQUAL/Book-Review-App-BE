const express = require("express");
const userController = require("../controller/users.controller");
const authMiddleware = require("../middleware/auth.middleware");

function getUserRoutes() {
  const router = express.Router();

  router.use(express.json());
  router.post("/signIn", userController.loginUser);

  router.use(authMiddleware);

  router.post("/register", userController.registerUser);
  router.get("/roles", userController.getUserRoles);
  router.get("/", userController.getAllUsers);
  router.get("/signgnedUser", userController.getSignedUser);
  router.get("/:id", userController.getUserById);
  router.patch("/:id", userController.updateUser);
  router.delete("/:id", userController.deleteUser);

  return router;
}

module.exports = getUserRoutes();
