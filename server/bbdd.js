let User = require("./models/user");
let Wallet = require("./models/wallet");
let helper = require("./helper");
const mongoose = require("mongoose");
let uiri = "mongodb://joselito:joselito@cluster0-shard-00-00-70fbx.mongodb.net:27017,cluster0-shard-00-01-70fbx.mongodb.net:27017,cluster0-shard-00-02-70fbx.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
let connect = mongoose.connect(uiri, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("Conexión a la base de datos establecida correctamente");
    }
});

function addDummyUser() {
    let user = new User();
    user.name = "Jose Marria";
    user.lastName = "navarro";
    user.memberNumber = " ";
    user.dni = "245548111N";
    user.password = "12345678";
    user.email = "jose@2litos.com";
    return addUser(user);
}

async function addUser(user) {
    return new Promise(resolve => {
        user.validateFields().then(function (data) {
            if (data.errors.serverStatus) {
                user.wallet = new Wallet();
                user.save((err, userStored) => {
                    if (err) {
                        resolve(err)
                    } else {
                        if (userStored) {
                            user.wallet.memberNumber = user.memberNumber
                            user.wallet.save();
                            resolve(data);
                        }
                    }
                });
            } else {
                resolve(data)
            }
        })
    })
}

async function getUsers() {
    return new Promise(resolve => {
        User.find().exec(function (error, result) {
            Wallet.populate(result, {path: "wallet"}, function (err, result) {
                resolve(result)
            })
        });
    });

}

async function postUsers(user) {
    // console.log(user);
    return new Promise(resolve => {
        User.find().exec(function (error, result) {
            Wallet.populate(result, {path: "wallet"}, function (err, result) {
                let users = [];
                result.forEach(doc => {
                    let name = user.name !== "" ? user.name : doc.name;
                    let lastName = user.lastName !== "" ? user.lastName : doc.lastName;
                    let dni = user.dni !== "" ? user.dni : doc.dni;
                    let memberNumber = user.memberNumber !== "" ? Number(user.memberNumber) : doc.memberNumber;

                    let docName = doc.name.includes((name))
                    let docLastName = doc.lastName.includes((lastName))
                    if (docName && docLastName &&
                        doc.dni === dni && doc.memberNumber === memberNumber) {
                        users.push({
                            nombre: `${doc.name} ${doc.lastName}`,
                            nsocio: doc.memberNumber,
                            inscripcion: `${
                                doc.startInscriptionDate.getDate() + "-" +
                                helper.pad(doc.startInscriptionDate.getMonth()) + "-" +
                                doc.startInscriptionDate.getFullYear()
                            }`,
                            caducidad: `${
                                doc.endInscriptionDate.getDate() + "-" +
                                helper.pad(doc.endInscriptionDate.getMonth()) + "-" +
                                doc.endInscriptionDate.getFullYear()
                            }`,
                            estado: doc.status,
                            wallet: doc.wallet
                        });
                    }
                });
                resolve(users);

            });
        });
    });
}

async function getUserBy(memberNumber) {
    return new Promise(resolve => {
        User.find({memberNumber: memberNumber}).exec(function (error, result) {
            Wallet.populate(result, {path: "wallet"}, function (err, result) {
                resolve(result)
            })
        });
    });
}

async function deleteUser(memberNumber) {
    return new Promise(resolve => {
        User.remove(
            {
                memberNumber: memberNumber
            },
            function (err, user) {
                if (user.deletedCount === 1) {
                    resolve("Deleted");
                } else {
                    resolve("Not deleted");
                }
            }
        );
    });
}

async function updateWallet(user) {
    return new Promise(resolve => {
        getUserBy(user.memberNumber).then(function (result) {
            let wallet = result[0].wallet
            wallet.positiveBalance = user.positiveBalance;
            wallet.negativeBalance = user.negativeBalance;
            wallet.date = new Date();
            wallet.save().then(() => {
                resolve(`Cartera miembro ${user.memberNumber} actualizada`);
            });
        })
    })
}

module.exports = {
    addUser: addUser,
    getUsers: getUsers,
    postUsers: postUsers,
    getUserBy: getUserBy,
    deleteUser: deleteUser,
    addDummyUser: addDummyUser,
    updateWallet: updateWallet
};
