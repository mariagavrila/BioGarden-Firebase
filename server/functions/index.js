const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

const FBAuth = require("./util/FBAuth");

const {
  getAllProducts,
  postOneProduct,
  deleteProduct,
  updateProduct,
  checkout,
} = require("./handlers/products");
const {
  login,
  getUser,
  getUsers,
  postOneUser,
  deleteUser,
  updateUser,
} = require("./handlers/users");
const { getAllRegisters, getUserRegister } = require("./handlers/registers");

//Rutas de producto
app.get("/mercado", FBAuth, getAllProducts);
app.post("/mercado", FBAuth, postOneProduct);
app.post("/deleteProduct/:productId", FBAuth, deleteProduct);
app.post("/updateProduct/:productId", FBAuth, updateProduct);
app.post("/checkout", FBAuth, checkout);

// Rutas de usuario
app.post("/login", login);
app.post("/users", FBAuth, getUsers);
app.post("/users/:userId", FBAuth, getUser);
app.post("/user", FBAuth, postOneUser);
app.post("/delete/:userId", FBAuth, deleteUser);
app.post("/update/:userId", FBAuth, updateUser);

//Rutas del historial de facturación
app.get("/history", FBAuth, getAllRegisters);
app.get("/history/:userId", FBAuth, getUserRegister);

exports.api = functions.region("europe-west1").https.onRequest(app);
