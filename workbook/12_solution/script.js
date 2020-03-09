require("dotenv").config();
const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected!");
});
