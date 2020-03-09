const mongoose = require("mongoose");

const ToppingSchema = new mongoose.Schema({
  name: { type: String, unique: true }
});

const Topping = mongoose.model("Topping", ToppingSchema);
module.exports = Topping;
