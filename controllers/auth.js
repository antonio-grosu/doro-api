const express = require("express");
const app = express();
const User = require("../models/Users");

//auth
const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(200).json({ user: { name: user.name } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ error: "Incorrect Paswword" });
  }

  // If the credentials are correct, send the user object
  return res.status(200).json({ id: user.id, name: user.name });
};

module.exports = { register, login };
