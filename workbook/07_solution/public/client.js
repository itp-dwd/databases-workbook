// Data Store
// You can think of this like a front-end database
let toppings = [];

window.addEventListener("DOMContentLoaded", () => {
  const toppingsList = document.getElementById("toppings-list");
  fetch("/toppings").then(res => res.json()).then((data) => {
    toppings = data;
    toppingsList.innerHTML = ToppingsList(toppings);
  });

  const toppingForm = document.getElementById("topping-form");
  toppingForm.onsubmit = (event) => {
    event.preventDefault();
    const toppingInput = event.target.elements["topping"];
    const topping = toppingInput.value;
    toppingInput.value = "";
    fetch("/toppings",
      {
        method: "POST",
        body: JSON.stringify({ topping: topping }),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => res.json()).then((data) => {
        toppings.push(data);
        toppingsList.innerHTML = ToppingsList(toppings);
      });
  }
});

// topping now is an object with a name and _id
function ToppingsList(toppings) {
  return toppings.map((topping) => {
    return `<li data-topping="${topping.name}">
              <span>${topping.name}</span>
              <button onclick="handleRemoveClick(event)">Remove</button>
            </li>`;
  }).join("");
}

function handleRemoveClick(event) {
  const toppingsList = document.getElementById("toppings-list");
  // access data attributes using dataset
  const toppingName = event.target.parentElement.dataset.topping;
  fetch(`/toppings/${toppingName}`,
    {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then((data) => {
      // Remove topping from front end
      toppings = toppings.filter(topping => topping.name !== toppingName);
      toppingsList.innerHTML = ToppingsList(toppings);
    });
}