const booksService = require("../service/books.service");

async function addBook(req, res) {
  try {
    const userRole_id = req.user.roleId;
    const book = req.body;

    if (![1].includes(userRole_id)) {
      return res.status(403).json({
        error: true,
        payload: "Unauthorized. Only Admins can create books.",
      });
    }

    const result = await booksService.addBook(book);

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
    console.error("Error adding book in controller:", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

async function getAllBooks(req,res) {
  try {
    const result = await booksService.getAllBooks();

    return res.status(result.status).json({
      error: result.error,
      payload: result.payload,
    });
  } catch (error) {
    console.log("Error getting all Books: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

async function getBookById(req, res) {
    try {
        const { id } = req.params;
        const result = await booksService.getBookById(id);
    
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
        console.log("Error get book by id controller: ", error);
        return res.status(500).json({
          error: true,
          payload: error,
        });
      }
    }
    

module.exports = {
  addBook,
  getAllBooks,
  getBookById
};
