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

//Get All user ratings for a book
async function getRatingsByBookId(req, res) {
    try {
        const {id}  = req.params;
        const result = await UserRatingsService.getRatingsByBookId(id);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json ({
            error: true,
            payload: error
        })
    }
}

// Get a user rating for a specific book by user ID and book ID
async function getUserRatingForBook(req, res) {
    try {
        const { bookId, userId } = req.params;

        const result = await UserRatingsService.getUserRatingForBook(bookId, userId);

        if (result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload,
            });
        }

        return res.status(result.status).json({
            error: false,
            payload: result.payload,
        });

    } catch (error) {
        console.error('Error in getUserRatingForBook Controller:', error);
        return res.status(500).json({
            error: true,
            payload: "Server Error",
        });
    }
}



module.exports = {
  addRatingsAndReviews,
  getRatingsByBookId,
  getUserRatingForBook
};
