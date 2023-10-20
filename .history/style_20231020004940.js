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

  const right = document.querySelector(".right");

  // Create the outer <ul> element with a class of "original-list"
  const originalList = document.createElement("ul");
  originalList.className = "original-list";

  // Create an array of text content for the list items
  const listItemsText = [
    productName.value,
    description.value,
    price.value,
    quantity.value,
  ];

  // Loop through the text content and create <li> elements for each item
  listItemsText.forEach((itemText) => {
    const listItem = document.createElement("li");
    listItem.textContent = itemText;
    originalList.appendChild(listItem); // Append the <li> to the <ul>
  });

  // Append the entire <ul> to the document body or a specific container
  right.appendChild(originalList);
});
