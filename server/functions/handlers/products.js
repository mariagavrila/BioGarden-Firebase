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

//Añadir un producto a la base de datos
exports.postOneProduct = async (req, res) => {
  let name = req.body.name;

  //Comporbar si ya existe un producto con este nombre
  let validProduct = await db
    .collection("mercado")
    .get()
    .then((data) => {
      data.forEach((document) => {
        let doc = document.data();
        if (doc.name.trim() === name.trim()) return false;
      });
    });

  let d = new Date();

  //Si los datos son correctos se añade el producto
  if (validProduct) {
    //Se crea un nuevo producto
    const newProduct = {
      ...req.body,
      date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
    };
    //Se añade el producto
    db.collection("mercado")
      .add(newProduct)
      .then((doc) => {
        return res.json({
          msg: `Producto con id ${doc.id} añadido correctamente`,
        });
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: "Error en el servidor.Inténtelo más tarde." });
      });
  }
};
