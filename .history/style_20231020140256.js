import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://ornate-keel-382100-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const productInDB = ref(database, "products");

// Retrieve products from database and populate table on page load
onValue(productInDB, (snapshot) => {
  const products = snapshot.val();
  if (products) {
    Object.values(products).forEach((product) => {
      addProductToTable(product);
    });
  }
});

function addProduct(name, description, price, quantity) {
  const newProduct = {
    name: name,
    description: description,
    price: price,
    quantity: quantity,
  };
  const newProductRef = push(productInDB, "products");
  newProductRef.set(newProduct);

  // Add product to table in real-time
  addProductToTable(newProduct);
}

const dataTable = document.getElementById("data-table");

function addProductToTable(product) {
  const row = dataTable.insertRow();
  const cell1 = row.insertCell();
  const cell2 = row.insertCell();
  const cell3 = row.insertCell();
  const cell4 = row.insertCell();
  const cell5 = row.insertCell();

  cell1.width = cell3.width;
  cell1.textContent = product.name;
  cell2.textContent = product.description;
  cell3.textContent = product.price;
  cell4.textContent = product.quantity;

  // Add delete button
  const deleteButton = document.createElement("i");
  deleteButton.className = "bx bx-lg bxs-trash bx-tada-hover";

  deleteButton.style.color = "#ff0202";
  deleteButton.style.cursor = "pointer";
  deleteButton.style.display = "flex";
  deleteButton.style.justifyContent = "center";
  deleteButton.style.alignItems = "center";

  deleteButton.addEventListener("click", function () {
    // Delete the product from the database
    remove(ref(database, `products/${product.id}`));

    // Remove the row from the table
    dataTable.deleteRow(row.rowIndex);
  });

  cell5.appendChild(deleteButton);
}

const productName = document.getElementById("productName");
const description = document.getElementById("description");
const price = document.getElementById("price");
const quantity = document.getElementById("quantity");
const addProductBtn = document.getElementById("addProduct");

addProductBtn.addEventListener("click", function () {
  // Check if all fields are filled
  if (productName.value && description.value && price.value && quantity.value) {
    addProduct(
      productName.value,
      description.value,
      price.value,
      quantity.value
    );

    // Clear input fields after adding a product
    productName.value = "";
    description.value = "";
    price.value = "";
    quantity.value = "";
  }
});
