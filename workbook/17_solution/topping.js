const mongoose = require("mongoose");

const ToppingSchema = new mongoose.Schema({
  name: { type: String, unique: true }
}, { timestamps: true });

const Topping = mongoose.model("Topping", ToppingSchema);
module.exports = Topping;
