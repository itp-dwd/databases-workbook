const Datastore = require("nedb");

const db = new Datastore({ filename: "toppings.db", autoload: true });

// const topping = {
//   name: "pepperoni"
// };

const toppings = [
  {
    name: "pepperoni"
  },
  {
    name: "ham"
  }
];

db.insert(toppings, () => {
  db.find({name: "ham"}, (err, entries) => {
    console.log(entries);
  });
});
