const express = require("express");
const app = express();
const Lesson = require("../models/Lesson");

// get information

const getAll = async (req, res) => {
  try {
    const lessons = await Lesson.find({});
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLesson = async (req, res) => {
  const lessonId = req.params.id; // Fetch the lesson ID from the URL parameter
  try {
    const lesson = await Lesson.find({ id: lessonId }); // Use findById to query by _id

    // if (!lesson) {
    //   return res.status(404).send("Lesson not found");
    // }
    res.json(lesson);
  } catch (error) {
    console.error("Error fetching lesson:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getAll, getLesson };
