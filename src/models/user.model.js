const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            ]
        },
        password: {
            type: String,
            required: true,
            unique: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("user", userSchema)