"use strict";
let userController = require("./userController");
var exceptionHandler = require("express-exception-handler");
exceptionHandler.handle();
let express = require("express");
let router = express.Router();
const User = require('./models/user')
const helper = require('./helper')
function requireLogin(req, res, next) {
    let user = new User()
    let token = (helper.checkField(req.body.token) + helper.checkField(req.query.token)).trim()
    user.verifyToken(token).then(function (result) {
        if (result) {
            res.redirect("http://localhost:3000/");
        } else {
            next();
            console.log({message: 'Successful log in'});
        }
    })

}

router.get("/", userController.home);
router.post("/", userController.login);
router.get("/users", requireLogin, userController.getUsers);
router.post("/users", requireLogin, userController.getUsers);
router.post("/users/add", requireLogin, userController.addUser);
router.delete("/users/:memberNumber", requireLogin, userController.deleteUser);
router.get("/users/:memberNumber", requireLogin, userController.getUser);
router.post("/users/:memberNumber/wallet", requireLogin, userController.updateWallet);

module.exports = router;
