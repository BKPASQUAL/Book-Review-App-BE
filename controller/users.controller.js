const bcrypt = require("bcrypt");
const userService = require("../service/users.service");
const { sign } = require("jsonwebtoken");

// Register User
async function registerUser(req, res) {
  try {
    const { firstName, lastName, email, username, password, roleId } = req.body;

    if (!(firstName && lastName && email && username && password && roleId)) {
      return res
        .status(400)
        .json({ error: true, payload: "All input is required" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await userService.registerUser(
      firstName,
      lastName,
      email,
      username,
      hashPassword,
      roleId
    );

    if (result.error) {
      return res
        .status(result.status)
        .json({ error: true, payload: result.payload });
    } else {
      return res
        .status(result.status)
        .json({ error: false, payload: result.payload });
    }
  } catch (error) {
    console.error("Error in user controller: ", error);
    return res.status(500).json({ error: true, payload: error.message });
  }
}

// Login User
async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userService.loginUser(username);

    if (!user) {
      return res
        .status(404)
        .json({ error: true, payload: "User doesn't exist" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ error: true, payload: "Invalid username or password" });
    }

    const accessToken = sign(
      { username: user.username, id: user.id, roleId: user.roleId },
      "importantsecret"
    );

    return res.status(200).json({
      error: false,
      payload: { userId: user.id, accessToken, roleId: user.roleId },
    });
  } catch (error) {
    console.error("Error in user login controller: ", error);
    return res.status(500).json({ error: true, payload: error.message });
  }
}

//Get User Roles
async function getUserRoles(req, res) {
  try {
    const result = await userService.getUserRoles();

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
    console.log("Error Getting User Roles Controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error,
    });
  }
}

//Get All Users
async function getAllUsers(req, res) {
  try {
    const userRole_id = req.user.roleId;

    if (![1].includes(userRole_id)) {
      return res.status(403).json({
        error: true,
        payload: "Unauthorized. Only Admins can view users.",
      });
    }

    const result = await userService.getAllUsers();

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
    console.log("Error Getting Users Controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error,
    });
  }
}

//Get User By Id
async function getUserById(req, res) {
  try {
    const userRole_id = req.user.roleId;
    const { id } = req.params;

    if (![1].includes(userRole_id)) {
      return res.status(403).json({
        error: true,
        payload: "Unauthorized. Only Admins can view users.",
      });
    }

    const result = await userService.getUserById(id);

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
    console.log("Error Getting User Controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error,
    });
  }
}

//Get Signed User
async function getSignedUser(req, res) {
  try {
    const id = req.user.id;

    const result = await userService.getUserById(id);

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
    console.log("Error Getting Signed User Controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error,
    });
  }
}

//Update User
async function updateUser(req, res) {
  try {
    const userRole_id = req.user.roleId;
    const { id } = req.params;
    const userData = req.body;

    // Only admins can update users
    if (![1].includes(userRole_id)) {
      return res.status(403).json({
        error: true,
        payload: "Unauthorized. Only admins can update users.",
      });
    }

    const result = await userService.updateUser(id, userData);

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
    console.error("Error updating user controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message,
    });
  }
}

//Delete User
async function deleteUser(req, res) {
  try {
    const userRole_id = req.user.roleId;
    const { id } = req.params;

    if (![1].includes(userRole_id)) {
      return res.status(403).json({
        error: true,
        payload: "Unauthorized. Only Admins can delete users.",
      });
    }

    const result = await userService.deleteUser(id);

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
    console.log("Error Deleting User Controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserRoles,
  getAllUsers,
  getUserById,
  getSignedUser,
  updateUser,
  deleteUser,
};
