require("dotenv").config();
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });
const DB_NAME = "pizza-app";

client.connect(err => {
  if (err) {
    console.log(err);
  }
  const Toppings = client.db(DB_NAME).collection("toppings");

  // CREATE CODE
  Toppings.insert({ name: "pineapple" }, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });

  Toppings.insertMany([
    { name: "pepperoni" }, { name: "ham" }, { name: "sausage" }
  ], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });

  // READ CODE
  // Toppings.find({}).toArray((err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(result);
  // });

  // REMOVE CODE
  // Toppings.deleteOne({ name: "pepperoni" }, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(result);
  // });

  // if you don't put in this line, your script will just hang
  client.close();
});