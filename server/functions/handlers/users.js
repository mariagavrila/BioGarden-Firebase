const { db } = require("../util/admin");

const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

const { validateLoginData } = require("../util/validators");

// Log user in
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        error: "Credenciales incorrectas. Vuelva a intentarlo!",
      });
    });
};
exports.getUsers = (req, res) => {
  const user = {
    name: req.body.nombre,
    lastName: req.body.apellido,
    dni: req.body.dni,
    memberNumber: req.body.nsocio,
  };
  db.collection("users")
    .get()
    .then((data) => {
      let users = [];
      data.forEach((document) => {
        let doc = document.data();
        let name = user.name !== "" ? user.name : doc.name;
        let lastName = user.lastName !== "" ? user.lastName : doc.lastName;
        let dni = user.dni !== "" ? user.dni : doc.dni;
        let memberNumber =
          user.memberNumber !== ""
            ? Number(user.memberNumber)
            : doc.memberNumber;

        let docName = doc.name.includes(name);
        let docLastName = doc.lastName.includes(lastName);
        if (
          docName &&
          docLastName &&
          doc.dni === dni &&
          doc.memberNumber === memberNumber
        ) {
          users.push({
            nombre: `${doc.name} ${doc.lastName}`,
            nsocio: doc.memberNumber,
            inscripcion: doc.startInscriptionDate,
            caducidad: doc.endInscriptionDate,

            // estado: doc.status,
            // wallet: doc.wallet
          });
        }
      });
      return res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.postOneUser = async (req, res) => {
  let max = await db
    .collection("users")
    .get()
    .then((data) => {
      let nums = [];
      data.forEach((document) => {
        let doc = document.data();
        nums.push(parseInt(doc.memberNumber));
      });
      let max = Math.max.apply(null, nums) + 1;
      return max;
    });
  let d = new Date();
  let memberNum;
  memberNum = max > 0 ? max : 1;
  const newUser = {
    name: req.body.nombre,
    lastName: req.body.apellido,
    dni: req.body.dni,
    memberNumber: `${memberNum}`,
    startInscriptionDate: `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()}`,
    endInscriptionDate: `${d.getDate()}/${d.getMonth() + 1}/${
      d.getFullYear() + 1
    }`,
  };
  db.collection("users")
    .add(newUser)
    .then((doc) => {
      res.json({ message: `Usuario ${doc.id} creado correctamente` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

// Fetch one User
/*exports.getUser = (req, res) => {
    let UserData = {};
    db.doc(`/users/${req.params.UserId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'User not found' });
        }
        UserData = doc.data();
        UserData.UserId = doc.id;
        return db
          .collection('comments')
          .orderBy('createdAt', 'desc')
          .where('UserId', '==', req.params.UserId)
          .get();
      })
      .then((data) => {
        UserData.comments = [];
        data.forEach((doc) => {
          UserData.comments.push(doc.data());
        });
        return res.json(UserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  };*/
