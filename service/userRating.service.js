const { UserRatings, Books, Users } = require("../models");

async function addRatingsAndReviews(rating) {
  try {
    const existRating = await UserRatings.findOne({
      where: {
        userId: rating.userId,
        bookId: rating.bookId,
      },
    });

    if (existRating) {
      return {
        status: 400,
        error: true,
        payload: "User has already rated this book!",
      };
    }
    const result = await UserRatings.create(rating);
    return {
      status: 201,
      error: false,
      payload: result,
    };
  } catch (error) {
    console.error("Error adding rating and review service:", error);
    throw error;
  }
}

//Get ratings by book Id for a book
async function getRatingsByBookId(bookId) {
  try {
    const book = await Books.findByPk(bookId);

    if (!book) {
      return {
        status: 400,
        error: true,
        payload: "Invalid Book ID",
      };
    }
    const result = await UserRatings.findAll({
      where: {
        bookId: bookId,
      },
      attributes: ["ratings", "comment", "userId"],
      include: [
        {
          model: Users,
          attributes: ["firstName", "lastName", "username"], 
        },
      ],
    });

    if (!result || result == []) {
      return {
        status: 204,
        error: false,
        payload: "No reviews and ratings",
      };
    }

    return {
      status: 200,
      error: false,
      payload: result,
    };
  } catch (error) {
    console.error("Error getting ratings book by ID Service: ", error);
    throw error;
  }
}

// Get a user rating for a specific book by user ID and book ID
async function getUserRatingForBook(bookId, userId) {
  try {
    const rating = await UserRatings.findOne({
      where: {
        bookId: bookId,
        userId: userId,
      },
    });

    if (!rating) {
      return {
        status: 404,
        error: true,
        payload: "Rating not found for the specified book and user",
      };
    }

    return {
      status: 200,
      error: false,
      payload: rating,
    };
  } catch (error) {
    console.error(
      "Error getting user rating for book by bookId and userId in Service: ",
      error
    );
    return {
      status: 500,
      error: true,
      payload: "Server error",
    };
  }
}

// Edit  rating
async function editUserRatingForBook(bookId, userId, updatedRating) {
  try {
    const existingRating = await UserRatings.findOne({
      where: {
        bookId: bookId,
        userId: userId,
      },
    });

    if (!existingRating) {
      return {
        status: 404,
        error: true,
        payload: "Rating not found for the specified book and user",
      };
    }

    const result = await existingRating.update({
      ratings: updatedRating.ratings || existingRating.ratings,
      comment: updatedRating.comment || existingRating.comment,
    });

    return {
      status: 200,
      error: false,
      payload: result,
    };
  } catch (error) {
    console.error(
      "Error editing user rating for book by bookId and userId in Service: ",
      error
    );
    return {
      status: 500,
      error: true,
      payload: "Server error",
    };
  }
}

async function deleteUserRatingForBook(bookId, userId) {
  try {
    const existingRating = await UserRatings.findOne({
      where: {
        bookId: bookId,
        userId: userId,
      },
    });

    if (!existingRating) {
      return {
        status: 404,
        error: true,
        payload: "Rating not found for the specified book and user",
      };
    }

    await existingRating.destroy();

    return {
      status: 200,
      error: false,
      payload: "Rating deleted successfully",
    };
  } catch (error) {
    console.error(
      "Error deleting user rating for book by bookId and userId in Service: ",
      error
    );
    return {
      status: 500,
      error: true,
      payload: "Server error",
    };
  }
}

 //Calculate average rating of a book
 async function getAverageRating(bookId) {
    try{
        const ratings = await UserRatings.findAll ({
            where: {
                bookId: bookId
            },
            attributes: ['ratings']
        });

        if(ratings.length ===0) {
            return {
                status: 204,
                error: true,
                payload: "N/A"
            };
        }
        const totalRatings = ratings.reduce((sum,record) => sum + record.ratings,0);
        const numberOfRatings = ratings.length;

        const averageRating = totalRatings/ numberOfRatings;

        return {
            status: 200,
            error: false,
            payload: averageRating
        }

        
    }  catch (error){
         console.error('Error calculating average rating service: ', error);
         throw error;
    }
}
    



module.exports = {
  addRatingsAndReviews,
  getRatingsByBookId,
  getUserRatingForBook,
  editUserRatingForBook,
  deleteUserRatingForBook,
  getAverageRating
};
