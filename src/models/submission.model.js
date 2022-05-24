const mongoose = require("mongoose")

const submissionSchema = mongoose.Schema(
    {
        quizId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("submission", submissionSchema)