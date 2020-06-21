exports.validateFields = (data) => {
  let { name, lastName, dni, email } = data;
  let errores = {
    errors: {
      name: false,
      lastName: false,
      dni: false,
      email: false,
      serverStatus: false,
    },
    mensaje: {
      name: "",
      lastName: "",
      dni: "",
      email: "",
      serverStatus: "",
    },
  };
  let counter = 0;

  if (!isValidDni(dni)) {
    errores.errors.dni = true;
    errores.mensaje.dni = "DNI Invalido";
    counter++;
  }
  if (!isValidEmail(email)) {
    errores.errors.email = true;
    errores.mensaje.email = "Email Invalido";
    counter++;
  }
  if (!isValidName(name)) {
    errores.errors.name = true;
    errores.mensaje.name = "Nombre invalido";
    counter++;
  }

  if (!isValidName(lastName)) {
    errores.errors.lastName = true;
    errores.mensaje.lastName = "Apellido invalido";
    counter++;
  }

  if (counter === 0) {
    errores.errors.serverStatus = true;
    errores.mensaje.serverStatus = "Usuario insertado correctamente";
  }
  return errores;
};

function isValidDni(dni) {
  var validChars = "TRWAGMYFPDXBNJZSQVHLCKET";
  var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
  var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
  var str = dni.toString().toUpperCase();
  if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

  var nie = str.replace(/^[X]/, "0").replace(/^[Y]/, "1").replace(/^[Z]/, "2");

  var letter = str.substr(-1);
  var charIndex = parseInt(nie.substr(0, 8)) % 23;

  if (validChars.charAt(charIndex) === letter) return true;

  return false;
}

function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email === "") return true;
  else return re.test(String(email).toLowerCase());
}

function isValidName(name) {
  var re = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/;
  let n = name.trim().toLowerCase();
  if (n.length < 3 || name.length > 50 || !re.test(n)) {
    return false;
  } else return true;
}

exports.includes = (txtp, txt) => {
  let a = txtp.trim().toLowerCase();
  let b = txt.trim().toLowerCase();
  return a.includes(b);
};
