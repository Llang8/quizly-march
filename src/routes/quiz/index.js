const MainQuizRouter = require("express").Router()

MainQuizRouter.route("/create")
    .get(require("./editor.view"))
    .post(require("./create"))

MainQuizRouter.route("/:slug")
    .get(require("./quiz.view"))
    .post(require("./submit"))

module.exports = MainQuizRouter