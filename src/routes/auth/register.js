const axios = require("axios")

module.exports = async (req, res) => {
    const mutation = `
        mutation register($email: String!, $password: String!, $username: String!) {
            register(email: $email, password: $password, username: $username)
        }
    `

    if (!req.body.email || !req.body.password || req.body.password !== req.body.confirmPassword) {
        res.redirect('/auth/register')
        return
    }

    try {
        const data = await axios.post("http://localhost:3000/graphql",
            {
                query: mutation,
                variables: {
                    email: req.body.email,
                    password: req.body.password,
                    username: req.body.username
                }
            }, {
                'Content-Type': 'application/json'
            })

        const token = data.data.data.register

        res.cookie('jwtToken', token, {
            maxAge: 900000,
            httpOnly: true
        })

        res.redirect('/')

    } catch(e) {
        console.log(e)
        res.redirect('/auth/register')
    }
}