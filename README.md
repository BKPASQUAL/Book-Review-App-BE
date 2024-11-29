Book Review App (Backend)

This is the backend for the Book Review App, a platform for managing and reviewing books. The app allows users to add book details such as title, author, category, description, image URL, and PDF link.

Setup Instructions

Step 1: Create the Database
Open MySQL Workbench or any MySQL client.
Run the following SQL command to create the database:
sql

CREATE DATABASE bookreviewapp;

Step 2: Install Dependencies
Clone the repository to your local machine.
Open a terminal and navigate to the project directory.
Install the required dependencies using:

npm install

Step 3: Start the Project
Run the server using the following command:

npm start
The server will start at http://localhost:4003.

Step 4: Seed the Database
Populate the database with initial data by running:

npx sequelize-cli db:seed:all

Step 5: Add Book Data
Use Postman or another API testing tool to add book data.

Add Authorization Token
Before making any POST requests, include the following Bearer token in the Authorization header:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFudWthIiwiaWQiOjIzLCJyb2xlIjoiQWRtaW4iLCJyb2xlSWQiOjEsImlhdCI6MTY5NzM0OTg5NH0.IgdB0FS-QuGx7JxttBLCFt4jV6JvVRGgxxWwWUS9AMY

Make a POST request to:

http://localhost:4003/books
Use the following JSON format for the request body:

{
"bookTitle": "The Great Gatsby",
"autherName": "F. Scott Fitzgerald",
"category": "Fiction",
"bookDiscription": "A novel about the American dream and the roaring 1920s.",
"imageURL": "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg",
"bookPDFURL": "https://example.com/pdfs/great-gatsby.pdf"
}

Before adding actual data, you can add some mock data to test the API and database connection.
