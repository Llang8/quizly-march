const { default: axios } = require("axios")

module.exports = async (req, res) => {
    const answerData = req.body
    const slug = req.params.slug

    let submissionData = {
        quizId: answerData.quizId,
        userId: req.verifiedUser.user._id,
        answers: []
    }

    for (const key in answerData) {
        if (key !== "quizId") {
            submissionData.answers.push({
                questionId: key,
                answer: answerData[key]
            })
        }
    }

    const mutation = `
        mutation submitQuiz($quizId: String!, $userId: String!, $answers: [AnswerInput!]!) {
            submitQuiz(quizId: $quizId, userId: $userId, answers: $answers)
        }
    `

    try {
        const data = await axios.post('http://localhost:3000/graphql', {
            query: mutation,
            variables: submissionData
        },
        {
            'Content-Type': 'application/json'
        })

        console.log(data)
    } catch(e) {
        console.log(e)
    }

    res.redirect('/submissions')
}