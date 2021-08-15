var pressedVariable = false;
var cartHasElements = false;
var cost = 0.0;

function addElement(pizza) {
    "use strict";

    let data = pizza.parentElement;

    let pizzaName = data.childNodes[5].textContent;
    let price = data.getAttribute("data-price");
    let cart = document.getElementById("cart");
    let newOption = document.createElement("option");
    newOption.appendChild(document.createTextNode(pizzaName));
    newOption.value = data.childNodes[3].value;


    newOption.setAttribute("data-price", price);
    cart.appendChild(newOption);
    cartHasElements = true;

    cost += parseFloat(price);
    setCost(cost);
    success();
}

function setCost(newCost) {
    "use strict";

    cost = newCost;
    if (cost < 0.0) {
        cost = 0.0;
    }

    let costText = document.getElementById("cost");
    costText.textContent = parseFloat(cost).toFixed(2);
}

function selectAll(id) {
    "use strict";

    let cart = document.getElementById(id).options;
    for (let i = cart.length - 1; i >= 0; i--) {
        cart[i].selected = true;
    }
}

function deleteAll(id) {
    "use strict";

    let cart = document.getElementById(id).options;
    for (let i = cart.length - 1; i >= 0; i--) {
        cart.remove(i);
    }

    setCost(0);
    success();
}

function deleteIndividuals(id) {
    "use strict";

    let cart = document.getElementById(id);
    let currCost = cost;

    for (let i = cart.length - 1; i >= 0; i--) {
        if (cart.options[i].selected) {
            currCost -= parseFloat(cart.options[i].getAttribute("data-price"));
            cart.remove(i);
        }
    }

    setCost(currCost);
}

function pressed(text) {
    "use strict";

    pressedVariable = text.value !== "";
    success();
}

function success() {
    "use strict";

    //double check
    const text = document.getElementById("Adressinput");
    let cart = document.getElementById("cart").options;

    let submitBtn = document.getElementById("submit_btn");
    const disable = text.value.length <= 0 || cart.length <= 0;
    submitBtn.disabled = disable;
    submitBtn.className = disable ? "btn-gray" : "btn-primary";
}