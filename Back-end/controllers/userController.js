const userService = require("../services/userService");

const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    accountType: userType,
  } = req.body;

  if (!firstName || !lastName || !email || !password || !userType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newUser = await userService.createUser({
      firstName,
      lastName,
      email,
      password,
      userType,
    });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Failed to create user" });
    }
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
};
