//User Model
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
        Users.belongsTo(models.Roles, {
          as: "role",
          foreignKey: "roleId",
          onDelete: "CASCADE",
        });
      };
return Users;
}; 