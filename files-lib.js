const process = require('process')
const fs = require('fs')

function create(message, done) {
    console.log("creating new file", message)
    done();
}

function download(publicKey, done) {
    var filename = 'sample-image.jpg' // TODO: base from publickKey
    var img
    var error
    try{
        img = fs.readFileSync(`${process.env.FOLDER}${filename}`)   // add slash between FOLDER and filename if FOLDER value has no slash ending
    } catch(err) {
        error = `Cannot read file ${process.env.FOLDER}${filename}`
    }

    done(error, img)
}

module.exports = { create, download }