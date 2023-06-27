const { connect } = require("http2");
const mongoose = require("mongoose");
require("dotenv").config();
var mongoUrl = process.env.MONGO_URL.toString();

mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true });
var connection = mongoose.connection;

connection.on("error", () => console.log("db Connection faild"));
connection.on("connected", () => console.log("db Connection successfull"));
module.exports = mongoose;
