require('dotenv').config();
const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  //get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res
      .status(401)
      .send({ error: "Authentication with valid token is required" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ error: "Authentication with valid token is required" });
  }
};

module.exports = fetchUser;
