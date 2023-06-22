const { connect } = require('http2');
const mongoose = require('mongoose');
var mongoUrl = 'mongodb+srv://test_user:test-pass@cluster0.uoiobel.mongodb.net/mern-hotels';

mongoose.connect(mongoUrl , {useUnifiedTopology: true , useNewUrlParser : true });
var connection = mongoose.connection

connection.on('error' , ()=>
    console.log('db Connection faild')
)
connection.on('connected', () =>
    console.log('db Connection successfull')
)
module.exports = mongoose