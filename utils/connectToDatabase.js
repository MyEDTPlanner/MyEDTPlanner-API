const mongoose = require('mongoose')

const connectToDatabase = async () => {
    const { MONGO_URI } = process.env

    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = connectToDatabase