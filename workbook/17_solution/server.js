const express = require("express");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const mongoose = require("mongoose");
const uri = process.env.MONGO_URL;
const DB_NAME = "pizza-app";
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to MongoDB!");
});

const Topping = require("./topping.js");

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
  // Change to add toArray to find
  Topping.find({}, (err, toppings) => {
    cb(err, toppings);
  });
}

function addTopping(topping, cb) {
  Topping.create({name: topping}, (err, savedTopping) => {
    cb(err, savedTopping);
  });
}

function deleteTopping(toppingToDelete, cb) {
  Topping.deleteOne({name: toppingToDelete}, (err) => {
    cb(err);
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
    if (err) {
      console.log(err);
      res.status(403).json({ message: `Cannot create duplicate topping ${newTopping}.` });
    }
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
