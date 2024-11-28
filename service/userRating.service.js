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

     //Get ratings by book Id for a book
     async function getRatingsByBookId(bookId) {
        try {

         const book = await Books.findByPk(bookId);  

        if (!book) {
            return {
                status: 400,
                error: true,
                payload: "Invalid Book ID"
            };
        }
         const result = await UserRatings.findAll({
                where: { 
                    bookId: bookId,
                },
                attributes: ['ratings','commnet','userId'],
                include: [{
                    model: Users,
                    attributes: ['name', 'username']

                }]
            });  
    
            if (!result || result==[]) {
                return {
                    status: 204,
                    error: false,
                    payload: "No reviews and ratings"
                };
            }
    
            return {
                status: 200,
                error: false,
                payload: result
            };
        } catch (error) {
            console.error('Error getting ratings book by ID Service: ', error);
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
        console.error('Error getting user rating for book by bookId and userId in Service: ', error);
        return {
            status: 500,
            error: true,
            payload: "Server error",
        };
    }
}


module.exports = {
  addRatingsAndReviews,
  getRatingsByBookId,
  getUserRatingForBook
};
