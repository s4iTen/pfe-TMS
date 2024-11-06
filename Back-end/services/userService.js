const User = require("../models/User");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  const { firstName, lastName, email, password, userType } = userData;

  try {
    const user = new User({ firstName, lastName, email, password, userType });
    return await user.save();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

const authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  authenticateUser,
};
