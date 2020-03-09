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

// CREATE CODE
// Topping.create({ name: "pineapple" }, (err, newTopping) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(newTopping);
// });

// Topping.insertMany([
//   { name: "pepperoni" }, { name: "ham" }, { name: "sausage" }
// ], (err, newToppings) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(newToppings);
// });

// READ CODE
Topping.find({}, (err, results) => {
  if (err) {
    console.log(err);
  }
  console.log(results);
});

// REMOVE CODE
Topping.deleteOne({ name: "pepperoni" }, (err) => {
  if (err) {
    console.log(err);
  }
});

