const { UserRatings, Books, Users } = require('../models')


async function addRatingsAndReviews (rating) {
    try {
        const existRating = await UserRatings.findOne({
            where: {
                userId: rating.userId,
                bookId: rating.bookId
            }
        })

        if(existRating){
            return{
                status: 400,
                error: true,
                payload: "User has already rated this book!"
            }
        }
        const result = await UserRatings.create(rating)
        return{
            status: 201,
            error: false,
            payload: result
        }

        } catch (error) {
            console.error('Error adding rating and review service:', error);
        throw error;
        }

    } 

module.exports = {
  addRatingsAndReviews,
};
