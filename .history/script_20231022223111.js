// Done by @Tensae_Aschalew

// Import from firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { set } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
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
    dataTable.innerHTML = `<h1 align="center">Oops Nothing is Here</h1>`;
  }
});

// Add product function
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

// Add Product To Table Function
function addProductToTable(productId, product) {
  const dataTable = document.getElementById("data-table");
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

  // Event listener for Delete button
  deleteButton.addEventListener("click", function () {
    const exactLocation = remove(ref(database, `products/${productId}`));
  });
  // Append Delete Button
  cell5.appendChild(deleteButton);

  // Add update button
  const updateButton = document.createElement("i");
  updateButton.className = "bx bx-lg bx-edit bx-tada-hover";
  updateButton.style.color = "#3498db";
  updateButton.style.cursor = "pointer";
  updateButton.style.display = "flex";
  updateButton.style.justifyContent = "center";
  updateButton.style.alignItems = "center";
  // Update button Event listener
  updateButton.addEventListener("click", function () {
    updateForm.classList.remove("hidden-1");
    openUpdateForm(productId, product);
  });
  // Append Update Button
  cell5.appendChild(updateButton);
}

const productName = document.getElementById("productName");
const description = document.getElementById("description");
const price = document.getElementById("price");
const quantity = document.getElementById("quantity");
const addProductBtn = document.getElementById("addProduct");

// Add Product Button Event Listener
addProductBtn.addEventListener("click", function () {
  // Check if any of the fields is empty
  if (
    !productName.value ||
    !description.value ||
    !price.value ||
    !quantity.value
  ) {
    alert("All fields are required!");
    return; // Prevent further execution
  }

  if (productName.value && description.value && price.value && quantity.value) {
    addProduct(
      productName.value,
      description.value,
      price.value,
      quantity.value
    );
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
}

// function for alert message
function showAlert(message) {
  const customAlert = document.getElementById("custom-alert");
  const alertMessage = document.getElementById("alert-message");

  alertMessage.textContent = message;
  customAlert.style.display = "block";

  setTimeout(function () {
    customAlert.style.display = "none";
  }, 3000);
}

// Function to update the product in the database
updateProductBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (currentProductId) {
    const updatedProduct = {
      name: updateProductName.value,
      description: updateDescription.value,
      price: updatePrice.value,
      quantity: updateQuantity.value,
    };

    const productRef = ref(database, `products/${currentProductId}`);
    set(productRef, updatedProduct);
  }
  showAlert("Successfully Updated");
  updateForm.classList.add("hidden-1");
});

const searchIcon = document.getElementById("searchIcon");
const searchContainer = document.getElementById("searchContainer");
const searchInput = document.getElementById("searchInput");

// Show/hide search input when search icon is clicked
searchIcon.addEventListener("click", function () {
  if (searchContainer.style.display === "none") {
    searchContainer.style.display = "block";
  } else {
    searchContainer.style.display = "none";
    // Clear the input and show all products again when hiding the search input
    searchInput.value = "";
    showAllProducts();
  }
});

// Filter products based on name when user types in the search input
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  const rows = dataTable.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    const productNameCell = rows[i].getElementsByTagName("td")[0];
    const productName = productNameCell.textContent.toLowerCase();

    if (productName.includes(searchTerm)) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
});

// Function to show all products when no filter is applied
function showAllProducts() {
  const rows = dataTable.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    rows[i].style.display = "";
  }
}

// This is all my Javascript code Done by @Tensae_Aschalew
