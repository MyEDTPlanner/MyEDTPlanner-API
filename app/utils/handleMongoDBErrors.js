const handleMongoDBErrors = (error) => {
    let handledError

    switch (error.code) {
        case 11000:
            handledError = `Data already exists`
            break
        default:
            handledError = `Unknown error`
    }
    return handledError
}

module.exports = handleMongoDBErrors