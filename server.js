const express = require("express");
const app = express();

const port = process.env.port || 5501;

app.listen(port, () => console.log('Server started successfully on port : ${port} using nodemon'));
