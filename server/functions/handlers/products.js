const { db } = require("../util/admin");

exports.getAllProducts = (req, res) => {
  db.collection("mercado")
    .get()
    .then((data) => {
      let products = [];
      data.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return res.json(products);
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: "Error en el servidor.Inténtelo más tarde." })
    );
};

exports.postOneProduct = (req, res) => {
  const newProduct = {
    ...req.body,
  };
  db.collection("mercado")
    .add(newProduct)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};
