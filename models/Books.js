module.exports = (sequelize, DataTypes) => {
    const Books = sequelize.define("Books", {
      bookTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      autherName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookDiscription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageURL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookPDFURL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Books.associate = function (models) {
      // Many-to-Many with Users through UserRatings
      Books.belongsToMany(models.Users, {
        through: models.UserRatings,
        foreignKey: "bookId",
        onDelete: "CASCADE",
        as: "RatedUsers", // Unique alias
      });
  
      // One-to-Many with UserRatings
      Books.hasMany(models.UserRatings, {
        foreignKey: "bookId",
        onDelete: "CASCADE",
        as: "Ratings", // Unique alias
      });
    };
  
    return Books;
  };
  