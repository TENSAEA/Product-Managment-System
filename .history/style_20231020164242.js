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
const dataTable = document.getElementById("data-table");
// Retrieve products from database and populate table on page load
onValue(productInDB, (snapshot) => {
  if (snapshot.exists()) {
    const products = snapshot.val();

    // Clear existing table rows
    dataTable.innerHTML = `<tr>
    <th align="center">Product Name</th>
    <th align="center">Description</th>
    <th align="center">Price</th>
    <th>Quantity</th>
    <th>
      <i
        class="bx bx-lg bxs-trash"
        style="
          color: #ff0202;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      ></i>
    </th>
  </tr>`;

    if (products) {
      Object.entries(products).forEach(([key, product]) => {
        addProductToTable(key, product);
      });
    }
  } else {
    dataTable.innerHTML = `<h1 align="center">Opps Nothing is Here</h1>`;
  }
});

function addProduct(name, description, price, quantity) {
  const newProduct = {
    name: name,
    description: description,
    price: price,
    quantity: quantity,
  };

  // Push the new product to the database
  const newProductRef = push(productInDB, newProduct);

  // Get the unique ID generated by Firebase for this product
  const productId = newProductRef.key;

  // Add the unique ID to the new product object
  newProduct.id = productId;

  // Set the new product in Firebase
  newProductRef.set(newProduct);
}

function addProductToTable(productId, product) {
  const dataTable = document.getElementById("data-table");
  // ... rest of the code remains the same ...
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
    const exactLocation = remove(ref(database, `products/${productId}`));
  });

  cell5.appendChild(deleteButton);

  // ... rest of your code ...

  // Add update button
  const updateButton = document.createElement("i");
  updateButton.className = "bx bx-lg bx-edit bx-tada-hover";

  updateButton.style.color = "#3498db";
  updateButton.style.cursor = "pointer";
  updateButton.style.display = "flex";
  updateButton.style.justifyContent = "center";
  updateButton.style.alignItems = "center";

  updateButton.addEventListener("click", function () {
    // Handle update action, e.g., open a form or modal

    openUpdateForm(productId, product);
  });

  cell5.appendChild(updateButton);
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
    // productName.value = "";
    // description.value = "";
    // price.value = "";
    // quantity.value = "";
  }
});

const updateForm = document.getElementById("updateForm");
const updateProductName = document.getElementById("updateProductName");
const updateDescription = document.getElementById("updateDescription");
const updatePrice = document.getElementById("updatePrice");
const updateQuantity = document.getElementById("updateQuantity");
const updateProductBtn = document.getElementById("updateProductBtn");

let currentProductId = null; // Store the ID of the product being updated

// Function to open the update form with product data
function openUpdateForm(productId, product) {
  currentProductId = productId;
  updateProductName.value = product.name;
  updateDescription.value = product.description;
  updatePrice.value = product.price;
  updateQuantity.value = product.quantity;
  window.location.href = "form.html";
}

// Function to update the product in the database
updateProductBtn.addEventListener("click", function () {
  if (currentProductId) {
    const updatedProduct = {
      name: updateProductName.value,
      description: updateDescription.value,
      price: updatePrice.value,
      quantity: updateQuantity.value,
    };

    const productRef = ref(database, `products/${currentProductId}`);
    set(productRef, updatedProduct);
    updateForm.classList.add("hidden");
  }
});
