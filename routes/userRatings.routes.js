const express = require("express");
const userRatingsController = require("../controller/userRatings.controller");
const authMiddleware = require("../middleware/auth.middleware");

function userRatingsRoutes() {
  const router = express.Router();

  router.use(express.json());

  router.get("/:id", userRatingsController.getRatingsByBookId);
  router.get("/:bookId/:userId", userRatingsController.getUserRatingForBook);

  router.use(authMiddleware);

  router.post("/", userRatingsController.addRatingsAndReviews);

  return router;
}

module.exports = userRatingsRoutes();
