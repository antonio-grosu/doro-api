const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const connect = require("./db/app");
const paymentRouter = require("./routes/payment");
const authRouter = require("./routes/auth");
const courseRouter = require("./routes/course");
const authMiddleware = require("./middleware/auth");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// basic server response
app.get("/", (req, res) => {
  res.send("<h1>Server running...</h1> ");
});
const imagesFolder = path.join(__dirname, "images");

// Create a route to serve the image
app.get("/images/:imageName", (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(imagesFolder, imageName);

  // Check if the file exists before sending
  if (fs.existsSync(imagePath)) {
    // Send the image file
    res.sendFile(imagePath);
  } else {
    res.status(404).send("Image not found");
  }
});

// important server responses  -> cors,routes,middleware,start
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/v1/", authRouter);
app.use("/api/v1/", authMiddleware, paymentRouter);
app.use("/api/v1/", authMiddleware, courseRouter);
// app.use("/api/v1/", middleware, courseRouter);

// start function try connecting, else log the err
const start = async () => {
  try {
    connect(process.env.url);
    app.listen(5000, () => {
      console.log("Server listening on port 5000");
    });
  } catch (err) {
    console.log(err);
  }
};

start();

module.exports = app;
