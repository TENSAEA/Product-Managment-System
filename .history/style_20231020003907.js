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

  // Create the outer <ul> element with an id of "product-list"
  const productList = document.createElement("ul");
  productList.id = "product-list";

  // Create the inner <ul> element with an id of "header-list"
  const headerList = document.createElement("ul");
  headerList.id = "header-list";

  // Create the list items and set their text content
  const productHeader = document.createElement("li");
  productHeader.textContent = "Product Name";

  const descriptionHeader = document.createElement("li");
  descriptionHeader.textContent = "Description";

  const priceHeader = document.createElement("li");
  priceHeader.textContent = "Price";

  const quantityHeader = document.createElement("li");
  quantityHeader.textContent = "Quantity";

  // Append the list items to the inner <ul> ("header-list")
  headerList.appendChild(productHeader);
  headerList.appendChild(descriptionHeader);
  headerList.appendChild(priceHeader);
  headerList.appendChild(quantityHeader);

  // Append the inner <ul> to the outer <ul> ("product-list")
  productList.appendChild(headerList);

  // Append the outer <ul> to the document body or any other container element
  document.body.appendChild(productList);
});
