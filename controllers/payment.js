const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);

const paymentController = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Dorobantu Course",
              description: "This is the payment testing",
              // images: ["http://localhost:5000/images/product-image.jpg"],
            },
            unit_amount: 10000,
          },
          quantity: 1,
        },
      ],
      success_url: "https://codevs.ro",
      cancel_url: "https://facebook.com",
      metadata: {
        userId: req.body.id, // Replace with the actual user ID
      },
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = paymentController;
