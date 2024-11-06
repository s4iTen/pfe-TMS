const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await userService.authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "9999 years" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

module.exports = {
  login,
};
