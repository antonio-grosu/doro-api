const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment");

router.post("/create-checkout-session", paymentController);

module.exports = router;
