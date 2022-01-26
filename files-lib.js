function create(message, done) {
    console.log("creating new file", message)
    setTimeout(() => {
        done();

    }, 1000)
}

module.exports = { create }