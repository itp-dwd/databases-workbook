require("dotenv").config();
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  if (err) {
    console.log(err);
  }
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
