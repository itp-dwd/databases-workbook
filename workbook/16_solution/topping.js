const mongoose = require("mongoose");

const ToppingSchema = new mongoose.Schema({
  name: String
});

const Topping = mongoose.model("Topping", ToppingSchema);
module.exports = Topping;
