const fs = require("fs");
require("dotenv").config();
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });
const DB_NAME = "pizza-app";

client.connect(err => {
  if (err) {
    console.log(err);
    return;
  }

  const content = fs.readFileSync("pizzaToppings.json");
  const toppings = JSON.parse(content);
  // convert the topping strings to objects like {name: "pepperoni"}
  const toppingsObjects = toppings.pizzaToppings.map(name => {
    return { name: name };
  });

  const Toppings = client.db(DB_NAME).collection("toppings");
  Toppings.insertMany(toppingsObjects, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
  
  client.close();

});
