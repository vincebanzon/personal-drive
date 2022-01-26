function create(message, done) {
    console.log("creating new file", message)
    done();
}

module.exports = { create }