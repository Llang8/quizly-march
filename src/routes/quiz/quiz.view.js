const axios = require("axios")

module.exports = async (req, res) => {
    const slug = req.params.slug

    console.log(slug)

    const query = `
        query quizBySlug($slug: String!) {
            quizBySlug(slug: $slug) {
            title,
            description,
            questions {
                title,
                correctAnswer,
                order
            }
            }
        }
    `

    try {
        const quizData = await axios.get('http://localhost:3000/graphql', {
            data: {
                query,
                variables: {
                    slug
                }
            },
            'Content-Type': 'application/json'
        })

        const quiz = quizData.data.data.quizBySlug

        quiz.questions = quiz.questions.sort((a, b) => a.order - b.order)

        if (!quiz) {
            res.redirect('/')
            return
        }

        res.render('quiz', { quiz })
    } catch(e) {
        console.log(e)
    }

    // res.render('quiz')
}