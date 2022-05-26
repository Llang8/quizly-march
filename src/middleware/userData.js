const axios = require("axios")


const userData = async (req, res, next) => {
    if (!req.verifiedUser) {
        next()
        return
    }

    const query = `
        query user($id: ID!) {
            user(id: $id) {
                id,
                quizzes {
                    id,
                    slug,
                    title,
                    description,
                    questions {
                        title,
                        correctAnswer,
                        order
                    },
                    submissions {
                        score,
                        userId
                    },
                    avgScore
                },
                submissions {
                    id,
                    quizId,
                    userId,
                    quiz {
                        title,
                        slug,
                        description
                    },
                    score
                }
            }
        }
    `

    try {
        const data = await axios.get('http://localhost:3000/graphql', {
            data: {
                query,
                variables: {
                    id: req.verifiedUser.user._id
                }
            }
        })

        req.verifiedUser.user.quizzes = data.data.data.user.quizzes
        req.verifiedUser.user.submissions = data.data.data.user.submissions
        next()
    } catch(e) {
        console.log(e)
        res.redirect('/auth/login')
    }
}

module.exports = userData