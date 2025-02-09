require('dotenv').config();

const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

// ROUTE-1: create new user: post request: /api/auth/create-user
router.post(
  "/create-user",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email ID").isEmail(),
    body("password", "At least 5 characters required for password").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // Check if user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "User already exists!" });
      }

      const salt = await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(req.body.password, salt);

      // Create new user
      user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      //   console.log(authToken);
      success = true;
      return res.status(201).json(success, authToken); // Return token for created user
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE-2: authenticate user: post request: /api/auth/login (no login required)
router.post(
  "/login",
  [
    body("email", "Enter a valid email ID").isEmail(),
    body("password", "Password can't be empty!").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Enter correct credentials!" });
      }
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        success = false;
        return res.status(400).json({ error: "Enter correct credentials!" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE-3 : get logged in user details : POST : "/api/auth/get-user" (login required)
router.post("/get-user", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
