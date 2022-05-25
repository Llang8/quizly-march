const MainQuizRouter = require("express").Router()

MainQuizRouter.route("/create")
    .get(require("./editor.view"))

MainQuizRouter.route("/:slug")
    .get(require("./quiz.view"))

module.exports = MainQuizRouter