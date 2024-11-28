module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = function (models) {
    // Many-to-Many with Books through UserRatings
    Users.belongsToMany(models.Books, {
      through: "UserRatings",
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    // One-to-Many with UserRatings
    Users.hasMany(models.UserRatings, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    // Belongs to Roles
    Users.belongsTo(models.Roles, {
      as: "role",
      foreignKey: "roleId",
      onDelete: "CASCADE",
    });
  };

  return Users;
};
