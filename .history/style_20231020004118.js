import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://ornate-keel-382100-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const productInDB = ref(database, "products");

function addProduct(name, description, price, quantity) {
  const newProduct = {
    name: name,
    description: description,
    price: price,
    quantity: quantity,
  };
  push(productInDB, newProduct);
}

const productName = document.getElementById("productName");
const description = document.getElementById("description");
const price = document.getElementById("price");
const quantity = document.getElementById("quantity");
const addProductBtn = document.getElementById("addProduct");

addProductBtn.addEventListener("click", function () {
  addProductBtn.style.opacity = "0.5";
  addProductBtn.style.opacity = "0.5"; // Set opacity to 0.5 when clicked
  setTimeout(() => {
    addProductBtn.style.opacity = ""; // Set opacity back to its original value (empty string)
  }, 300); // 300 milliseconds (0.3 seconds)
  addProduct(productName.value, description.value, price.value, quantity.value);
  productName.value = "";
  description.value = "";
  price.value = "";
  quantity.value = "";

  const productList = document.getElementById("product-list");
  // Create the outer <ul> element with an id of "original-list"
  const originalList = document.createElement("ul");
  originalList.id = "original-list";

  // Create the list items and set their text content
  const productName = document.createElement("li");
  productName.textContent = "Product Name";

  const description = document.createElement("li");
  description.textContent = "Description";

  const price = document.createElement("li");
  price.textContent = "Price";

  const quantity = document.createElement("li");
  quantity.textContent = "Quantity";

  // Append the list items to the outer <ul> ("original-list")
  originalList.appendChild(productName);
  originalList.appendChild(description);
  originalList.appendChild(price);
  originalList.appendChild(quantity);

  // Append the outer <ul> to the document body or any other container element
  document.body.appendChild(originalList);
});
