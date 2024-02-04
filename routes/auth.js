const express = require("express");
const router = express.Router();

const { register, login, updateProgress } = require("../controllers/auth");

router.post("/register", register).get("/register", (req, res) => {
  res.json("Register Route");
});

router.post("/login", login).get("/login", (req, res) => {
  res.json("Login Route");
});
router.post("/update-progress", updateProgress);

module.exports = router;
