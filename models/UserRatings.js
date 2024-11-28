module.exports = (sequelize, DataTypes) => {
    const UserRatings = sequelize.define("UserRatings", {
      ratings: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  

  
    return UserRatings;
  };
  