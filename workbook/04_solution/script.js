const Datastore = require("nedb");

const db = new Datastore({ filename: "toppings.db", autoload: true });

// Uncomment to initialize database
// const toppings = [
//   {
//     name: "pepperoni"
//   },
//   {
//     name: "ham"
//   }
// ];

// db.insert(toppings, () => {
//   console.log("Database initialized.")
// });

// Update
// Run this first
// db.findOne({name: "ham"}, (err, entry) => {
//   db.update({_id: entry._id}, {name: "sausage"}, () => {
//     db.find({}, (findErr, entries) => {
//       console.log(entries);
//     });
//   })
// });

// Delete
// Uncomment and run this second
db.findOne({ name: "sausage" }, (err, entry) => {
  db.remove({ _id: entry._id }, () => {
    db.find({}, (findErr, entries) => {
      console.log(entries);
    });
  })
});
