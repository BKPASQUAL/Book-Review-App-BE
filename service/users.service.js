const { Users, Roles } = require("../models");
const bcrypt = require("bcrypt");

// Register User
async function registerUser(
  firstName,
  lastName,
  email,
  username,
  hashPassword,
  roleId
) {
  try {
    const usernameExist = await Users.findOne({ where: { username } });
    const emailExist = await Users.findOne({ where: { email } });

    if (usernameExist) {
      return { error: true, status: 409, payload: "Username already exists!" };
    }

    if (emailExist) {
      return { error: true, status: 409, payload: "Email already in use!" };
    }

    const role = await Roles.findByPk(roleId);
    if (!role) {
      return { error: true, status: 400, payload: "Invalid role ID." };
    }

    await Users.create({
      firstName,
      lastName,
      email,
      username,
      password: hashPassword,
      roleId,
    });

    return { error: false, status: 201, payload: "User successfully created!" };
  } catch (error) {
    console.error("Error in register user service: ", error);
    throw error;
  }
}

// Login User
async function loginUser(username) {
  try {
    const user = await Users.findOne({
      where: { username },
      include: { model: Roles, as: "role", attributes: ["role"] },
    });
    return user;
  } catch (error) {
    console.error("Error in login user service: ", error);
    throw error;
  }
}

//Get User Roles
async function getUserRoles() {
  try {
    const roles = await Roles.findAll();

    if (!roles) {
      return {
        error: true,
        status: 204,
        payload:
          "No User Roles Available. Please Create User Roles In The Database.",
      };
    } else {
      return {
        error: false,
        status: 200,
        payload: roles,
      };
    }
  } catch (error) {
    console.error("Error Getting User Roles Service : ", error);
    throw error;
  }
}

//Get All Users.
async function getAllUsers() {
  try {
    const users = await Users.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: Roles,
        as: "role",
        attributes: ["role"],
      },
    });

    if (!users) {
      return {
        error: true,
        status: 204,
        payload: "No user data available!",
      };
    } else {
      return {
        error: false,
        status: 200,
        payload: users,
      };
    }
  } catch (error) {
    console.error("Error Getting User Service : ", error);
    throw error;
  }
}

//Get User By Id
async function getUserById(id) {
  try {
    const user = await Users.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: Roles,
        as: "role",
        attributes: ["role"],
      },
    });

    if (!user) {
      return {
        error: true,
        status: 404,
        payload: "User Doesn't Exist!",
      };
    } else {
      return {
        error: false,
        status: 200,
        payload: user,
      };
    }
  } catch (error) {
    console.error("Error Getting User Service : ", error);
    throw error;
  }
}

//Update User
async function updateUser(id, userData) {
  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return {
        error: true,
        status: 404,
        payload: "User doesn't exist!",
      };
    }

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    } else {
      delete userData.password;
    }

    await user.update(userData);

    return {
      error: false,
      status: 200,
      payload: "User successfully updated!",
    };
  } catch (error) {
    console.error("Error updating user service: ", error);
    throw error;
  }
}

//Delete User
async function deleteUser(id) {
  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return {
        error: true,
        status: 404,
        payload: "User Doesn't Exist!",
      };
    } else {
      const delUser = await user.destroy();

      return {
        error: false,
        status: 200,
        payload: "User Successfullly Deleted!",
      };
    }
  } catch (error) {
    console.error("Error Deleting User Service : ", error);
    throw error;
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserRoles,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
