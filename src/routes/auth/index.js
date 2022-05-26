const MainAuthRouter = require("express").Router()

MainAuthRouter.route("/login")
    .get(require("./login.view"))
    .post(require("./login"))

MainAuthRouter.route("/register")
    .get(require("./register.view"))
    .post(require("./register"))

module.exports = MainAuthRouter