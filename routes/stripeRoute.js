require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const dayjs = require("dayjs");
const express = require("express");
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const { roomId, roomName, checkInDate, checkOutDate, totalAmount } = req.body;
  const fromDate = dayjs(checkInDate).format("DD/MM/YYYY");
  const toDate = dayjs(checkOutDate).format("DD/MM/YYYY");
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `Room: ${roomName}`,
            description: `Booking Period: ${fromDate} - ${toDate}`,
          },
          unit_amount: totalAmount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",

    submit_type: "book",
    success_url: `http://localhost:3000/checkout-success/${roomId}/${checkInDate}/${checkOutDate}`,
    cancel_url: `http://localhost:3000/book/${roomId}/${checkInDate}/${checkOutDate}`,
  });
  res.send({ url: session.url });
});
module.exports = router;
