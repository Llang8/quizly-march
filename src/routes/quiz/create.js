const axios = require("axios")

module.exports = async (req, res) => {
    const quizData = req.body

    const quizObject = {
        userId: req.verifiedUser.user._id,
        title: quizData.quizTitle,
        description: quizData.quizDescription,
        questions: []
    }

    for (const key in quizData) {
        if (key.includes('questionTitle')) {
            const questionNum = parseInt(key.split('questionTitle')[1])
            
            while(!quizObject.questions[questionNum]) {
                quizObject.questions.push({})
            }

            quizObject.questions[questionNum].title = quizData[key]
        } else if (key.includes('questionAnswer')) {
            const questionNum = parseInt(key.split('questionAnswer')[1])
            
            while(!quizObject.questions[questionNum]) {
                quizObject.questions.push({})
            }

            quizObject.questions[questionNum].correctAnswer = quizData[key]
            quizObject.questions[questionNum].order = questionNum + 1
        }
    }

    const mutation = `
        mutation createQuiz($userId: String!, $title: String!, $description: String!, $questions: [QuestionInput!]!) {
            createQuiz(userId: $userId, title: $title, description: $description, questions: $questions)
        }
    `

    try {
        const data = await axios.post('http://localhost:3000/graphql', 
        {
            query: mutation,
            variables: quizObject
        },
        {
            'Content-Type': 'application/json'
        })

        console.log(data.data.errors)
        res.redirect('/')
    } catch(e) {
        console.log(e)
        console.log(e.response.data.errors)
    }
}