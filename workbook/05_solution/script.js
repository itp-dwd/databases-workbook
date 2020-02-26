const fs = require("fs");
const Datastore = require("nedb");

const db = new Datastore({ filename: "toppings.db", autoload: true });
// deletes everything in the database
db.remove({}, { multi: true }, function (err, numRemoved) {
  const content = fs.readFileSync("pizzaToppings.json");
  const toppings = JSON.parse(content);
  
  // convert the topping strings to objects like {name: "pepperoni"}
  const toppingsObjects = toppings.pizzaToppings.map(name => {
    return { name: name };
  });
  db.insert(toppingsObjects, function(err, entries) {
    console.log(entries);
  });
});
