const express = require("express");
const app = express();
const dbConfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");
const stripeRoute = require("./routes/stripeRoute");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("public"));

app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/stripe", stripeRoute);

// app.listen(4242, () => console.log("payment server running on port 4242"));
app.listen(port, () =>
  console.log(`server started successfully on port : ${port}`)
);
