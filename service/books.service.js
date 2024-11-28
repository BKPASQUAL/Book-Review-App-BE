const { Books } = require("../models");

async function addBook(book) {
  try {
    await Books.create(book);
    return {
      error: false,
      status: 201,
      payload: "Book Added successfully ",
    };
  } catch (error) {
    console.error("Error creating Brand service:", error);
    throw error;
  }
}

async function getAllBooks() {
    try{
        const books = await Books.findAll();

        if(!books || books.length === 0){
            return {
                error: true,
                status: 204,
                payload: "No Books Available",
              };
        }

        return{
            error:false,
            status:200,
            payload:books
        }
    }  catch (error) {
        console.error("Error getting books service:", error);
        throw error;
      }
}

module.exports = {
  addBook,
  getAllBooks,
};