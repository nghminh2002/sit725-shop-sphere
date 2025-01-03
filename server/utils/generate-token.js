const jwt = require("jsonwebtoken");

const generateToken = (user, period) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secret,
    { expiresIn: period ? period : "1d" }
  );
  return token;
};

module.exports = generateToken;
