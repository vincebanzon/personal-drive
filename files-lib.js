const process = require('process')
const fs = require('fs')
const path = require('path')

const BASE_FOLDER = process.env.FOLDER

function create(message, done) {
    console.log("creating new file", message)
    done();
}

function download(publicKey, done) {
    var filename = 'sample-image.jpg' // TODO: base from publickKey
    var fileLocation = BASE_FOLDER+filename
    var file
    var error
    try{
        file = fs.readFileSync(fileLocation)   // add slash between FOLDER and filename if FOLDER value has no slash ending
    } catch(err) {
        error = `Cannot read file ${fileLocation}`
    }

    done(error, file)
}

function remove(privateKey, done) {
    console.log('privateKey: ', privateKey)
    var filename = 'sample-image.jpg'
    var fileLocation = BASE_FOLDER+filename

    var file
    var error
    try {
        // if(fs.existsSync(fileLocation)) {
        //     console.log('file exist')
            fs.unlink(fileLocation, (err) => {
                if(err) error = err
                // file successfully deleted. do nothing
                console.log('done with error: ', error)
                done(error)
            })

        // } else {
        //     console.log("file does not exist")
        //     error = `Error: Could not find file ${fileLocation}`
        //     done(error)
        // }

    } catch (error) {
        error = err
        done(error)
    }
}

module.exports = { create, download, remove }