const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

const FBAuth = require("./util/FBAuth");

const { getAllProducts, postOneProduct } = require("./handlers/products");
const {
  login,
  getUsers,
  postOneUser,
  deleteUser,
} = require("./handlers/users");

//Products routes
app.get("/products", getAllProducts);
app.post("/product", postOneProduct);

// Users route
app.post("/login", login);
app.post("/users", FBAuth, getUsers);
app.post("/user", FBAuth, postOneUser);
app.post("/user/:userId", FBAuth, deleteUser);

exports.api = functions.region("europe-west1").https.onRequest(app);
