const express = require("express");
const path = require("path");
const fs = require("fs");
const Datastore = require("nedb");

const db = new Datastore({
  filename: "toppingsz.db",
  autoload: true,
  onload: (err) => {
    if (err) {
      console.log(err);
    }
  }
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
  db.find({}, (err, toppings) => {
    cb(err, toppings);
  });
}

function addTopping(topping, cb) {
  db.insert({name: topping}, (err, newTopping) => {
    cb(err, newTopping);
  });
}

function deleteTopping(toppingToDelete, cb) {
  db.remove({name: toppingToDelete}, (err, numRemoved) => {
    cb(err, numRemoved);
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
