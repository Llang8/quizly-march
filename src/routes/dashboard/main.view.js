const axios = require("axios")

module.exports = async (req, res) => {

    const query = `
        query user($id: ID!) {
            user( id: $id ) {
                id,
                quizzes {
                    id,
                    slug,
                    title,
                    description,
                    submissions {
                        score
                    },
                    avgScore
                },
                username,
                email
            }
        }
    `

    let graphqlRes = {}
    try {
        /* data = await axios.get("http://localhost:3000/graphql", {
            query,
            variables: {
                id: "628d23eea019c27e91a2c115"
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }) */
        graphqlRes = await axios.get("http://localhost:3000/graphql", {
            data: {
                query,
                variables: {
                    id: "628d23eea019c27e91a2c115"
                }
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch(e) {
        console.log(e)
    }

    const user = graphqlRes.data.data.user

    console.log(user)

    res.render("dashboard", { user })
}