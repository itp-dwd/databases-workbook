const express = require("express");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });
const DB_NAME = "pizza-app";

let db;
client.connect(err => {
  if (err) {
    console.log(err);
    return;
  }
  db = client.db(DB_NAME);
  Toppings = db.collection("toppings");
});

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
  Toppings.find({}).toArray((err, toppings) => {
    cb(err, toppings);
  });
}

function addTopping(topping, cb) {
  // result is no longer the new topping
  // change from db.insert
  Toppings.insertOne({name: topping}, (err, result) => {
    // see http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#~insertOneWriteOpResult
    cb(err, result.ops[0]);
  });
}

function deleteTopping(toppingToDelete, cb) {
  // change from db.remove
  Toppings.deleteOne({name: toppingToDelete}, (err, result) => {
    // see http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#~deleteWriteOpResult
    cb(err, result.deletedCount);
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
