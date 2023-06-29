const express = require("express");
const app = express();
// const cors = require("cors");
const dbConfig = require("./db");

const authRoute = require("./routes/authRoute");
const roomsRoute = require("./routes/roomsRoute");
const bookingsRoute = require("./routes/bookingsRoute");
const stripeRoute = require("./routes/stripeRoute");
const privateRoute = require("./routes/privateRoute");
const errorHandler = require("./middleware/error");
const port = process.env.PORT || 5000;

// app.use(cors);
app.use(express.json());
app.use(express.static("public"));


app.get("/", (req, res, next) => {
  res.send("Api running");
});

//routes
app.use("/api/private", privateRoute);
app.use("/api/auth", authRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/stripe", stripeRoute);
app.use(errorHandler); // error handler : should be last in the middleware
const server = app.listen(port, () =>
  console.log(`server started on port : ${port}`)
);
process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
