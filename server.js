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
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.send("Api running");
});

//routes
app.use("/api/private", privateRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/stripe", stripeRoute);
app.use("/api/admin", adminRoute);
app.use(errorHandler); // error handler : should be last in the middlewares
const server = app.listen(port, () =>
  console.log(`server started on port : ${port}`)
);
process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
