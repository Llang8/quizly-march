const axios = require("axios")

module.exports = async (req, res) => {
    const mutation = `
        mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password)
        }
    `

    if (!req.body.email || !req.body.password) {
        res.redirect('/auth/login')
        return
    }

    try {
        const data = await axios.post("http://localhost:3000/graphql",
            {
                query: mutation,
                variables: {
                    email: req.body.email,
                    password: req.body.password
                }
            }, {
                'Content-Type': 'application/json'
            })

        const token = data.data.data.login

        res.cookie('jwtToken', token, {
            maxAge: 900000,
            httpOnly: true
        })

        res.redirect('/')

    } catch(e) {
        console.log(e.response.data)
        res.redirect('/auth/login')
    }
}