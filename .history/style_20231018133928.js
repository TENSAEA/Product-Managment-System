import { intializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";

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

console.log(app);
