const bbdd = require("./bbdd");
const User = require("./models/user");
let helper = require("./helper");

async function home(req, res) {
    bbdd.addDummyUser().then(function (data) {
        res.send(data);
    });
}

async function login(req, res) {
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    User.find({email: user.email}).exec(function (error, result) {
        if (result.length > 0) {
            user.comparePassword(user.password, result).then(function (res2) {
                if (res2) {
                    user.generateToken(user).then(function (token) {
                        return res.status(200).json({
                            success: res2,
                            token: `${token}`,
                            user: user,
                            msg: 'Usuario logueado correctamente'
                        });
                    })
                } else {
                    res.status(200).send("¡Contraseña incorrecta!");
                }
            })
        } else {
            res.status(200).send("¡Usuario no registrado!");
        }
    });
}

async function getUser(req, res) {
    bbdd.getUserBy(req.params.memberNumber).then(function (users) {
        return res.status(200).send(users);
    });
}

async function getUsers(req, res) {
    if (req.method === "POST") {
        const usersData = {
            name: helper.checkField(req.body.data.nombre),
            lastName: helper.checkField(req.body.data.apellido),
            dni: helper.checkField(req.body.data.dni),
            memberNumber: helper.checkField(req.body.data.nsocio)
        };
        await bbdd.postUsers(usersData).then(function (result) {
            return res.status(200).send(result);
        });
    } else { 
        await bbdd.getUsers().then(function (result) {
            return res.status(200).send(result);
        });
    }
}

async function deleteUser(req, res) {
    bbdd.deleteUser(req.params.memberNumber).then(function (result) {
        return res.status(200).send(result);
    });
}

async function addUser(req, res) {
    let user = new User();
    user.name = helper.checkField(req.body.data.name);
    user.lastName = helper.checkField(req.body.data.lastName);
    user.dni = helper.checkField(req.body.data.dni);
    user.birthDate = helper.toDate(req.body.data.birthDate);
    user.address = helper.checkField(req.body.data.address);
    user.zip = helper.checkField(req.body.data.zip);
    user.phone = helper.checkField(req.body.data.phone);
    user.email = (req.body.data.email);
    user.memberNumber = 0;
    user.memberNumberInvite = req.body.data.memberNumberInvite;
    user.maxMonthIntake = req.body.data.maxMonthIntake;
    user.ludicOrTherapeutic = helper.checkField(req.body.data.ludicOrTherapeutic);
    user.observations = helper.checkField(req.body.data.observations);
    user.password = helper.checkField(req.body.data.password);
    bbdd.addUser(user).then(function (result) {
        // if (result) {
        //     user.generateToken(user).then(function (token) {
        //         return res.status(200).json(user);
        //     });
        // } else {
            return res.status(200).json(result);
        // }
    }).catch(function (e) {
        console.log(e)
    })
}

async function updateWallet(req, res) {
    let user = {
        memberNumber: req.params.memberNumber,
        positiveBalance: req.body.positiveBalance,
        negativeBalance: req.body.negativeBalance
    };

    bbdd.updateWallet(user).then(function (result) {
        return res.status(200).send(result);
    });
}

module.exports = {
    home: home,
    login: login,
    getUser: getUser,
    getUsers: getUsers,
    addUser: addUser,
    deleteUser: deleteUser,
    updateWallet: updateWallet
};
