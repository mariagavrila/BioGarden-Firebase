const { db } = require("../util/admin");

const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

const { validateFields } = require("../util/validators");

// Logar un usuario
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      //Se obtiene el token para utilizarlo como autorización
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      return res.json({
        error: "Credenciales incorrectas. Vuelva a intentarlo!",
      });
    });
};
//Obtener una lista filtrada de socios
exports.getUsers = (req, res) => {
  //Se utilizan los 4 campos para filtrar
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
      //Por cada usuario se verifica si coincide con los criterios de busqueda
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

        //Se meten todos los usuarios que coinciden con la busqueda en un array para ser devueltos
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
            estado: doc.status,
          });
        }
      });
      return res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
//Añadir un usuario a la base de datos
exports.postOneUser = async (req, res) => {
  let {
    name,
    lastName,
    dni,
    email,
    birthDate,
    address,
    zip,
    city,
    phone,
  } = req.body;

  //Se validan los campos del nuevo usuario
  let validData = validateFields(name, lastName, dni, email, birthDate);

  //Si el campo serverStatus se encuentra en true, se añade el usuario a la bbdd
  if (validData.errors.serverStatus) {
    //Conseguir el número de socio del último usuario
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

    //Si no hay ningún usuario en la base de datos se comienzan a crear desde el número 1
    let memberNum;
    memberNum = max > 0 ? max : 1;

    let d = new Date();
    //status 1 = activo
    //status 2 = falta algún dato
    //Si algunos de los campos no obligatorios se quedan vacíos, se pone el status en 2
    let status;
    if (
      address === "" ||
      zip === "" ||
      city === "" ||
      phone === "" ||
      email === ""
    ) {
      status = "2";
    } else status = "1";

    //Se crea un nuevo usuario
    const newUser = {
      ...req.body,
      status,
      memberNumber: `${memberNum}`,
      startInscriptionDate: `${d.getDate()}/${
        d.getMonth() + 1
      }/${d.getFullYear()}`,
      endInscriptionDate: `${d.getDate()}/${d.getMonth() + 1}/${
        d.getFullYear() + 1
      }`,
    };
    //Se añade el usuario
    db.collection("users")
      .add(newUser)
      .catch(() => {
        validData.errors.serverStatus = false;
        validData.mensaje.serverError =
          "Error en el servidor.Inténtelo más tarde.";
      });
  }
  //Se devuelve el objeto que contiene tanto los errores como el éxito de la inserción
  res.json(validData);
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
