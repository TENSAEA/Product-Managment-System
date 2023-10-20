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

  const listItems = [
    productName.value,
    description.value,
    price.value,
    quantity.value,
  ];

  const tableContainer = document.getElementById("table-container");

  listItems.forEach((item) => {
    const tableRow = document.createElement("div");
    tableRow.classList.add("table-row");

    const tableCell = document.createElement("div");
    tableCell.classList.add("table-cell");
    tableCell.textContent = item;

    tableRow.appendChild(tableCell);
    tableContainer.appendChild(tableRow);
  });
});
