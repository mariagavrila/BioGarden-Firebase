const { db } = require("../util/admin");

exports.getAllRegisters = (req, res) => {
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

//Devolver el historial de compras de un usuario
exports.getUserRegister = (req, res) => {
  let id = req.params.userId;
  db.collection("facturacion")
    .where("id", "==", id)
    .get()
    .then((response) => {
      let data = [];
      response.forEach((doc) => {
        let id = doc.id;
        data.push({ idRegister: id, ...doc.data() });
      });
      return res.json({
        data,
      });
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: "Error en el servidor.Inténtelo más tarde." })
    );
};
