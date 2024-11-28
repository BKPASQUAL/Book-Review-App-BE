module.exports = (sequelize, DataTypes) => {
    const UserRatings = sequelize.define("UserRatings", {
      ratings: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      commnet: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    UserRatings.associate = function (models) {
      // Belongs to Users
      UserRatings.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "User", // Unique alias
      });
  
      // Belongs to Books
      UserRatings.belongsTo(models.Books, {
        foreignKey: "bookId",
        onDelete: "CASCADE",
        as: "Book", // Unique alias
      });
    };
  
    return UserRatings;
  };
  