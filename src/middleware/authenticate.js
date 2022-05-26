const jwt = require("jsonwebtoken")
const { unprotectedRoutes } = require("../../config.json")

const authenticate = async (req, res, next) => {
    const token = req.cookies?.jwtToken || ""

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.verifiedUser = verified
        console.log(req.verifiedUser)
        next()
    } catch(e) {
        if (unprotectedRoutes.includes(req.path)) {
            next()
        } else {
            console.log('User authentication failed.')
            res.redirect('/auth/login')
        }
    }
}

module.exports = authenticate