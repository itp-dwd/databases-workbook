const fs = require("fs");
require("dotenv").config();
const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected!");
});

const ToppingSchema = mongoose.Schema({
  name: String
});

const Topping = mongoose.model("Topping", ToppingSchema);

const content = fs.readFileSync("pizzaToppings.json");
const toppings = JSON.parse(content);
// convert the topping strings to objects like {name: "pepperoni"}
const toppingsObjects = toppings.pizzaToppings.map(name => {
  return { name: name };
});

Topping.insertMany(toppingsObjects, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
  mongoose.disconnect();
});
