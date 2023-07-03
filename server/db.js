require("dotenv").config();
const { connect } = require("http2");
const mongoose = require("mongoose");
var mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var connection = mongoose.connection;

connection.on("error", () => console.log("db Connection failed"));
connection.on("connected", () => console.log("db Connection successful"));
module.exports = mongoose;
