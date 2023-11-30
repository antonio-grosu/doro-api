const mongoose = require("mongoose");
const { Schema } = mongoose;

const LessonSchema = new Schema({
  id: Number,
  content: {
    title: String,
    parts: [String],
  },
});

const Course = mongoose.model("Lesson", LessonSchema);

module.exports = Course;
