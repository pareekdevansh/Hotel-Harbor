const express = require("express");
const app = express();

const dbConfig = require('./db');
const roomsRoute = require('./routes/roomsRoute');

const port = process.env.port || 5000;

app.use('/api/rooms', roomsRoute);
app.listen(port, () => console.log('Server started successfully on port : ${port} using nodemon'));
