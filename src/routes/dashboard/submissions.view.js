const axios = require("axios")

module.exports = async (req, res) => {
    console.log(req.verifiedUser.user.submissions)
    res.render("submissions", { user: req.verifiedUser.user })
}