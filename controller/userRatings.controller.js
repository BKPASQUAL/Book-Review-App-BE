const UserRatingsService = require("../service/userRating.service");

//Add ratings
async function addRatingsAndReviews(req, res) {
  try {
    const rating = req.body;

    const result = await UserRatingsService.addRatingsAndReviews(rating);

    if (result.error) {
      return res.status(result.status).json({
        error: true,
        payload: result.payload,
      });
    } else {
      return res.status(result.status).json({
        error: false,
        payload: result.payload,
      });
    }
  } catch (error) {
    console.error("Error adding rating and review controller: ", error);
    return res.status(500).json({
      error: true,
      payload: "Internal Server Error",
    });
  }
}

module.exports = {
  addRatingsAndReviews,
};
