require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const dayjs = require("dayjs");
const Booking = require("../models/Booking");
exports.createCheckoutSession = async (req, res) => {
  const { roomId, roomName, checkInDate, checkOutDate, totalAmount } = req.body;
  // checkout- success require a booking id
  // generate that booking id here and keep it's status pending
  // CheckOut Screen will mark it's status Booked after Successful Payment
  let booking = new Booking({
    roomId: roomId,
    roomName: roomName,
    userId: req.user._id,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    status: "Pending",
  });
  booking = await booking.save();
  const bookingId = booking._id;

  console.log("inside new session : bookingId : ", bookingId);

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
    success_url: `http://localhost:3000/checkout-success/${roomId}/${checkInDate}/${checkOutDate}/${bookingId}`,
    cancel_url: `http://localhost:3000/book/${roomId}/${checkInDate}/${checkOutDate}`,
  });
  res.send({ url: session.url });
};
