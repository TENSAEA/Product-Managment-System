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

// Define your addProduct function (I assume you have it defined somewhere)
function addProduct(productName, description, price, quantity) {
  // Create the main container element
  const tableContainer = document.createElement("div");
  tableContainer.className = "table-container";

  // Create the table row element
  const tableRow = document.createElement("div");
  tableRow.className = "table-row";

  // Create the table cell elements
  const productCell = document.createElement("div");
  productCell.className = "table-cell";
  productCell.textContent = productName;
  productCell.setAttribute("align", "center");

  const descriptionCell = document.createElement("div");
  descriptionCell.className = "table-cell";
  descriptionCell.textContent = description;
  descriptionCell.setAttribute("align", "center");

  const priceCell = document.createElement("div");
  priceCell.className = "table-cell";
  priceCell.textContent = price;
  priceCell.setAttribute("align", "center");

  const quantityCell = document.createElement("div");
  quantityCell.className = "table-cell";
  quantityCell.textContent = quantity;
  quantityCell.setAttribute("align", "center");

  // Append the cells to the row
  tableRow.appendChild(productCell);
  tableRow.appendChild(descriptionCell);
  tableRow.appendChild(priceCell);
  tableRow.appendChild(quantityCell);

  // Append the row to the main container
  tableContainer.appendChild(tableRow);

  // Append the main container to the right div
  const rightDiv = document.querySelector(".right");
  rightDiv.appendChild(tableContainer);
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
});
