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

const dataTable = document.getElementById("data-table");

let rowCount = 0;
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

  if (rowCount < 60) {
    const row = dataTable.insertRow();
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    const cell3 = row.insertCell();
    const cell4 = row.insertCell();
    const cell5 = row.insertCell();
    cell1.width = cell3.width;
    cell1.textContent = productName.value;
    cell2.textContent = description.value;
    cell3.textContent = price.value;
    cell4.textContent = quantity.value;
    cell5.innerHTML = `<box-icon name='trash' align="center" type='solid' color='#ef1317' ></box-icon>`;

    rowCount++;
  }

  productName.value = "";
  description.value = "";
  price.value = "";
  quantity.value = "";
});
