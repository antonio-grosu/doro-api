const express = require("express");
const User = require("../models/Users");

const verifyAuth = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(401).send("Access Denied: Invalid credentials");
    }

    const foundUser = await User.findOne({ _id: id });
    if (!foundUser) {
      return res.status(401).send("Access Denied: User not found");
    }

    // Attach user information to the request object if needed
    req.user = foundUser;

    // You can modify or add other properties to req.body or req.user if necessary

    next(); // Proceed to the next middleware or route
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = verifyAuth;
