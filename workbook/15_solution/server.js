const express = require("express");
const path = require("path");
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

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views/about.html"));
});

function getToppings(cb) {
  Topping.find({}, (err, toppings) => {
    cb(err, toppings);
  });
}

function addTopping(topping, cb) {
  // change from insert
  Topping.create({name: topping}, (err, result) => {
    cb(err, result);
  });
}

function deleteTopping(toppingToDelete, cb) {
  // change from db.remove
  Topping.deleteOne({name: toppingToDelete}, (err) => {
    cb(err, 1);
  });
}

app.get("/toppings", (req, res) => {
  getToppings((err, toppings) => {
    res.json(toppings);
  });
});

app.post("/toppings", (req, res) => {
  const topping = req.body.topping;
  if (!topping) {
    return res.status(400).json({ message: "Missing \"topping\" attribute from request body." });
  }
  addTopping(topping, (err, newTopping) => {
    res.json(newTopping);
  });
});

app.delete("/toppings/:name", (req, res) => {
  const toppingToDelete = req.params.name;
  deleteTopping(toppingToDelete, (err, numDeleted) => {
    if (numDeleted === 0) {
      return res.status(404).json({ message: `Topping with the name "${toppingToDelete}" does not exist.` });
    }
    res.json({ numDeleted: numDeleted });
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});
