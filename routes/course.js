const express = require("express");
const router = express.Router();

const { getAll, getLesson } = require("../controllers/course");

router.get("/course", getAll);
router.get("/course/lesson/:id", getLesson);

module.exports = router;
