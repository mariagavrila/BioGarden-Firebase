const mongoose = require('mongoose')
var Schema = mongoose.Schema
var autoIncrement = require("mongodb-autoincrement");
var validate = require('mongoose-validator')
var extend = require('mongoose-validator').extend
const beautifyUnique = require('mongoose-beautiful-unique-validation');
let helper = require("../helper");
autoIncrement.setDefaults({
    collection: 'User',     // collection name for counters, default: counters
    field: 'memberNumber',               // auto increment field name, default: _id
    step: 1             // auto increment step
});
let bcrypt = require('bcryptjs')
let jwt = require("jsonwebtoken");
const secret = "ASD2ihuDAS212";
const bcrypt_lenght = 10
let startDate = new Date()
let endDate = new Date().setFullYear(startDate.getFullYear() + 1)

function isValidDni(dni) {
    var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    var str = dni.toString().toUpperCase();
    if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

    var nie = str
        .replace(/^[X]/, '0')
        .replace(/^[Y]/, '1')
        .replace(/^[Z]/, '2');

    var letter = str.substr(-1);
    var charIndex = parseInt(nie.substr(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) return true;

    return false;
}

function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
}

function isValidName(name) {
    var re = /^[a-zA-Z '.-]*$/
    return re.test(String(name).toLowerCase())
}

function isValidAge(age) {
    if (age < Date.now()) {
        var ageDifMs = Date.now() - age.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        let t = Math.abs(ageDate.getUTCFullYear() - 1970);
        console.log(t)
        if (t >= 21) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

function isValidNameLenght(name) {
    if (name.length < 3 || name.length > 50) {
        return false
    } else {
        return true
    }
}

extend('isDni', function (value) {
    return isValidDni(value)
})
extend('isAdult', function (value) {
    return isValidAge(value)
})
var nameValidator = [
    validate({
        validator: isValidNameLenght
    }),
    validate({
        validator: isValidName
    })
]
var dniValidator = [
    validate({
        validator: 'isDni',
    })
]
var birthdateValidator = [
    validate({
        validator: 'isAdult',
    })
]
var numberValidator = [validate({
    validator: 'isNumeric'
})]
var emailValidator = [
    validate({
        validator: isValidEmail
    })]

var UserSchema = Schema({
    name: {type: String, required: true, trim: true, validate: nameValidator},
    lastName: {type: String, required: true, trim: true, validate: nameValidator},
    birthDate: {type: Date, required: true, validate: birthdateValidator},
    dni: {type: String, required: true, trim: true, validate: dniValidator},
    address: {type: String, default: "", trim: true},
    zip: {type: String, default: "", trim: true, validate: numberValidator},
    phone: {type: String, default: "", trim: true},
    email: {type: String, trim: true, validate: emailValidator},
    memberNumber: {type: Number, required: true},
    memberNumberInvite: {type: Number, required: true},
    maxMonthIntake: {type: Number, default: 0, validate: numberValidator},
    startInscriptionDate: {type: Date, default: startDate},
    endInscriptionDate: {type: Date, default: endDate},
    ludicOrThepeutic: {type: String, default: "Ludico", trim: true},
    observations: {type: String, default: "", trim: true},
    openObservations: {type: Boolean, default: false},
    status: {type: String, default: "Activo", trim: true},
    password: {type: String},
    wallet: {type: Schema.Types.ObjectId, ref: 'Wallet'},
    rfid: {type: Number, default: 0}
}, {strict: true, timestamps: true});

UserSchema.index({"email": 1}, {unique: true, sparse: true})
UserSchema.index({"dni": 1}, {unique: true})
UserSchema.index({"memberNumber": 1}, {unique: true})

UserSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.genSalt(bcrypt_lenght, function (error, salt) {
            bcrypt.hash(document.password, salt, function (err, hashedPassword) {
                if (err) {
                    console.log(err)
                    next(err);
                } else {
                    document.password = hashedPassword;
                    next();
                }
            });
        })
    } else {
        next();
    }
});
UserSchema.methods.comparePassword = function (passw, cb) {
    return new Promise(resolve => {
        bcrypt.compare(passw, cb[0].password, (err, res1) => {
            resolve(res1)
        })
    })
};
UserSchema.methods.generateToken = function (user) {
    return new Promise(resolve => {
        var payload = {
            iat: Math.round(Date.now() / 1000),
            exp: Math.round((Date.now() / 1000) + 30 * 24 * 60),
            iss: 'localhost:3000',
            email: user.email
        };
        var token = jwt.sign(payload, secret);
        resolve(token)
    })
};
UserSchema.methods.verifyToken = function (token) {
    return new Promise(resolve => {
        jwt.verify(token, secret, (err, authorizedData) => {
            if (err) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
};
UserSchema.methods.validateFields = async function () {
    return new Promise(async resolve => {
        let errores = {
            errors: {
                name: false,
                lastName: false,
                dni: false,
                memberNumberInvite: false,
                email: false,
                birthDate: false,
                serverStatus: false,
            },
            mensaje: {
                name: "",
                lastName: "",
                dni: "",
                memberNumberInvite: "",
                email: "",
                birthDate: "",
                serverError: "",
            }
        }
        let counter = 0;
        let name = helper.checkField(this.name)
        let lastName = helper.checkField(this.lastName)
        let dni = helper.checkField(this.dni)
        let email = helper.checkField(this.email)
        let memberNumberInvite = helper.checkField(this.memberNumberInvite)
        let birthDate = helper.checkField(this.birthDate)
        let existDni = await this.existsField("dni", dni)
        let existsEmail = await this.existsField("email", email)
        let existsMemberNumberInvite = await this.existsField("memberNumber", memberNumberInvite)

        if (!isValidDni(dni)) {
            errores.errors.dni = true;
            errores.mensaje.dni = "DNI Invalido"
            counter++;
        } else if (existDni) {
            errores.errors.dni = true;
            errores.mensaje.dni = "DNI en uso"
            counter++;
        }
        if (!isValidEmail(email)) {
            errores.errors.email = true;
            errores.mensaje.email = "Email Invalido"
            counter++;
        } else if (existsEmail) {
            errores.errors.email = true;
            errores.mensaje.email = "Email en uso"
            counter++;
        }
        if (!existsMemberNumberInvite) {
            errores.errors.memberNumberInvite = true;
            errores.mensaje.memberNumberInvite = "El socio que invita no existe"
            counter++;
        }
        if (!isValidName(helper.trimString(name))) {
            errores.errors.name = true;
            errores.mensaje.name = "El nombre solo puede contener caracteres alfabeticos"
            counter++;
        }
        if (!isValidNameLenght(helper.trimString(name))) {
            let message = "La longitud del nombre debe ser entre 3 y 50"
            errores.errors.name = true;
            errores.mensaje.name = (errores.mensaje.name !== "" ? `${errores.mensaje.name},${message}` : message)
            counter++;
        }

        if (!isValidName(helper.trimString(lastName))) {
            errores.errors.lastName = true;
            errores.mensaje.lastName = "Los apellidos solo puede contener caracteres alfabeticos"
            counter++;
        }
        if (!isValidNameLenght(helper.trimString(lastName))) {
            let message = "La longitud de los apellidos deben ser entre 3 y 50"
            errores.errors.lastName = true;
            errores.mensaje.lastName = (errores.mensaje.lastName !== "" ? `${errores.mensaje.lastName},${message}` : message)
            counter++;
        }

        if (!isValidAge(birthDate)) {
            errores.errors.birthDate = true;
            errores.mensaje.birthDate = "No cumple con la edad minima exigida por el club"
            counter++;
        }

        if (counter === 0) {
            errores.errors.serverStatus = true;
            errores.mensaje.serverStatus = "Usuario insertado correctamente";
        }
        resolve(errores)
    })
};
UserSchema.methods.existsField = async function (field, value) {
    return new Promise(resolve => {
        var key = {[field]: value}
        mongoose.model('User').findOne(key, async function (err, result) {
            if (err) {
                console.log(err)
                console.log("ERROR")
            }
            if (helper.checkField(result) !== "") {
                let res = `Existe ${field} :${value}`
                resolve(true)
            } else {
                resolve(false)
            }
        });
    })
};
UserSchema.plugin(autoIncrement.mongoosePlugin)
UserSchema.plugin(beautifyUnique)


module.exports = mongoose.model('User', UserSchema)
