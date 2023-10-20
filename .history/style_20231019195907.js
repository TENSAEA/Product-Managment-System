import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";

import {
  getDatabase,
  ref,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://ornate-keel-382100-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const productInDB = ref(database, "products");

function addProduct(name, description, price) {
  const newProduct = {
    name: name,
    description: description,
    price: price,
  };
  productInDB.push(newProduct);
}

const productName = document.getElementById("productName");
const description = document.getElementById("description");
const price = document.getElementById("price");
const quantity = document.getElementById("quantity");
const addProductBtn = document.getElementById("addProduct");

addProductBtn.addEventListener("click", function () {
  addProduct(productName.value, description.value, price.value);
  productName.value = "";
  description.value = "";
  price.value = "";
  quantity.value = "";
});
