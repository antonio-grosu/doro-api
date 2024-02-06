const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const connect = require("./db/app");
const paymentRouter = require("./routes/payment");
const authRouter = require("./routes/auth");
const courseRouter = require("./routes/course");
const authMiddleware = require("./middleware/auth");
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const cors = require("cors");
const User = require("./models/Users");

// important server responses  -> cors,routes,middleware,start
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "htpps://successful-mind.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.options("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://successful-mind.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});

app.use(cors());

app.get("/", (req, res) => {
  res.json("Dorobantu API");
});

app.use("/api/v1/", authRouter);
app.use("/api/v1/", authMiddleware, paymentRouter);
app.use("/api/v1/", authMiddleware, courseRouter);

// stripe webhook payment completed
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
app.post("/webhook", async (req, res) => {
  const event = req.body;
  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const userId = session.metadata.userId;
      // Use the userId as needed for further processing
      User.findByIdAndUpdate(userId, { isPaid: true }, { new: true })
        .then((updatedUser) => {
          console.log("User updated:", updatedUser);
          // Handle success response if needed
        })
        .catch((err) => {
          console.error("Error updating user:", err);
          // Handle error response if needed
        });
      break;
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
});

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
