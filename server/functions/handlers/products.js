const { db } = require("../util/admin");

exports.getAllProducts = (req, res) => {
  db.collection("hierbas")
    .get()
    .then(data => {
      let products = [];
      data.forEach(doc => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return res.json(products);
    })
    .catch(err => console.error(err));
};

exports.postOneProduct = (req, res) => {
  const newProduct = {
    name: req.body.name
  };
  console.log(newProduct);
  db.collection("hierbas")
    .add(newProduct)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};
