const { db } = require("../util/admin");

exports.getAllProducts = (req, res) => {
  db.collection("mercado")
    .orderBy("name")
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
exports.postOneProduct = (req, res) => {
  let name = req.body.name;
  db.collection("mercado")
    .where("name", "==", name)
    .get()
    .then((doc) => {
      let docs = 0;
      doc.forEach(() => {
        docs++;
      });
      if (docs === 0) {
        let d = new Date();
        //Se crea un nuevo producto
        const newProduct = {
          ...req.body,
          date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
        };
        //Se añade el producto
        return db.collection("mercado").add(newProduct);
      }
    })
    .then((doc) => {
      if (doc)
        return res.json({
          msg: `Producto añadido correctamente`,
        });
      else
        return res.json({
          msg: `Ya existe este producto.`,
        });
    });
};

exports.deleteProduct = (req, res) => {
  const document = db.doc(`/mercado/${req.params.productId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Producto no encontrado" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Producto eliminado correctamente." });
    })
    .catch(() => {
      return res
        .status(500)
        .json({ error: "Error interno. ¡Inténtelo más tarde!" });
    });
};
exports.updateProduct = (req, res) => {
  const document = db.doc(`/mercado/${req.params.productId}`);

  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Producto no encontrado" });
      } else {
        let d = new Date();
        //Se actualiza el producto
        return document.update({
          ...req.body,
          date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
        });
      }
    })
    .then(() => {
      return res.json({
        msg: `Producto actualizado correctamente`,
      });
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Error en el servidor.Inténtelo más tarde." });
    });
};
//Registrar una compra
exports.checkout = (req, res) => {
  var batch = db.batch();
  let d = new Date();
  req.body.forEach((reg) => {
    batch.set(db.collection("facturacion").doc(), {
      ...reg,
      date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
    });
  });
  batch
    .commit()
    .then(() => {
      return res.json({
        msg: "Compra registrada correctamente",
      });
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Error en el servidor.Inténtelo más tarde." });
    });
};
