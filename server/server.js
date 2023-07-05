const express = require("express");
const app = express();
const cors = require("cors");
const dbConfig = require("./db");
require("dotenv").config();
const authRoute = require("./routes/authRoute");
const roomsRoute = require("./routes/roomsRoute");
const bookingsRoute = require("./routes/bookingsRoute");
const stripeRoute = require("./routes/stripeRoute");
const privateRoute = require("./routes/privateRoute");
const usersRoute = require("./routes/usersRoute");
const adminRoute = require("./routes/adminRoute");
const errorHandler = require("./middleware/error");
const port = process.env.PORT || 5000;

const client_url = process.env.CLIENT_URL;
const stripe_url = process.env.STRIPE_CHECKOUT_URL;

// CORS configuration
// Enable CORS middleware
app.use(function (req, res, next) {
  const allowedOrigins = [client_url, stripe_url];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    // Respond with an appropriate error or deny the request
    return res.status(403).json({ error: "Origin not allowed" });
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "3600");

  if (req.method === "OPTIONS") {
    console.log("responded OK to preflight request");
    res.sendStatus(204);
  } else {
    next();
  }
});


app.use(express.json());
app.use(express.static("public"));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", client_url);
//   res.header("Access-Control-Allow-Origin",stripe_url);

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   console.log("header allowed");
//   next();
// });
app.get("/", (req, res, next) => {
  res.send(`API running`);
});

// Routes
app.use("/api/private", privateRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/stripe", stripeRoute);
app.use("/api/admin", adminRoute);
app.use(errorHandler); // error handler: should be last in the middlewares

const server = app.listen(port, () =>
  console.log(
    `Server started on port: ${port} with URL: ${process.env.SERVER_URL}`
  )
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
