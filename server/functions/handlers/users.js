const { db } = require("../util/admin");

const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

const { validateFields, includes } = require("../util/validators");

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
    .orderBy("name")
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
          user.memberNumber !== "" ? user.memberNumber : doc.memberNumber;

        //Se meten todos los usuarios que coinciden con la busqueda en un array para ser devueltos
        if (
          includes(doc.name, name) &&
          includes(doc.lastName, lastName) &&
          doc.dni === dni &&
          doc.memberNumber === memberNumber
        ) {
          users.push({
            userId: document.id,
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
  let { name, lastName, dni, email, address, zip, city, phone } = req.body;

  //Se validan los campos del nuevo usuario
  let validData = validateFields({ name, lastName, dni, email });

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
    // //status 1 = activo
    // //status 2 = falta algún dato
    // //Si algunos de los campos no obligatorios se quedan vacíos, se pone el status en 2
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
    await db
      .collection("users")
      .add(newUser)
      .catch(() => {
        validData.errors.serverStatus = false;
        validData.mensaje.serverStatus =
          "Error en el servidor.Inténtelo más tarde.";
      });
  }
  //Se devuelve el objeto que contiene tanto los errores como el éxito de la inserción
  return res.json(validData);
};

// Devolver los datos de un usuario
exports.getUser = (req, res) => {
  const document = db.doc(`/users/${req.params.userId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      return res.json(doc.data());
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Error en el servidor.Inténtelo más tarde." });
    });
};
exports.deleteUser = (req, res) => {
  const document = db.doc(`/users/${req.params.userId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Usuario eliminado correctamente." });
    })
    .catch(() => {
      return res
        .status(500)
        .json({ error: "Error interno. ¡Inténtelo más tarde!" });
    });
};
exports.updateUser = (req, res) => {
  const document = db.doc(`/users/${req.params.userId}`);
  let { name, lastName, dni, email, address, zip, city, phone } = req.body;

  //Se validan los campos del nuevo usuario
  let validData = validateFields({ name, lastName, dni, email });

  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      } else {
        //Si el campo serverStatus se encuentra en true, se añade el usuario a la bbdd
        if (validData.errors.serverStatus) {
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

          //Se actualiza el usuario
          return document.update({ ...req.body, status });
        }
      }
    })
    .then(() => {
      validData.mensaje.serverStatus = "Usuario actualizado correctamente";
      //Se devuelve el objeto que contiene tanto los errores como el éxito de la inserción
      return res.json(validData);
    })
    .catch(() => {
      validData.errors.serverStatus = false;
      validData.mensaje.serverStatus =
        "Error en el servidor.Inténtelo más tarde.";
      //Se devuelve el objeto que contiene tanto los errores como el éxito de la inserción
      return res.json(validData);
    });
};
