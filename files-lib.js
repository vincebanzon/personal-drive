const process = require('process')
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const util = require('util')
const copyFile = util.promisify(fs.copyFile)
const mime = require('mime')

const BASE_FOLDER = process.env.FOLDER

function create(req, done) {
    var form = new formidable.IncomingForm()

    form.parse(req, (err, fields, files) => {
        if(err) throw err

        Object.keys(files).map( key => {

            let file = files[key]
            let destination = BASE_FOLDER+file.name

            // 1. copy file
            // copyFile(file.path, destination)

            // 2. fs writefile     error. cannot get fileContent as binary
            // fs.writeFile(destination, file, 'binary', (err) => {
            //     if(err) throw err
            // })

            // 3. rename file
            fs.rename(file.path, destination, (err) => {
                if(err) throw err
                let result = {
                    publicKey: file.name,
                    privateKey: file.name
                }
                done(result)
            })

            // 4. base64
            //  Try to convert file to base64
        })
    })

}

function download(publicKey, done) {
    var fileLocation = BASE_FOLDER+publicKey
    try{
        if(fs.existsSync(fileLocation)) {
            file = fs.readFileSync(fileLocation)   // add slash between FOLDER and filename if FOLDER value has no slash ending
            let mimetype = mime.lookup(fileLocation)
            done(mimetype, file)
        } else {
            throw("Error: file does not exist")
        }
    } catch(err) {
        throw(err)
    }

}

function remove(privateKey, done) {
    var fileName = privateKey
    var fileLocation = BASE_FOLDER+fileName

    if(fs.existsSync(fileLocation)) {
        fs.unlink(fileLocation, (err) => {
            if(err) throw err
            done()          // file successfully deleted. do nothing
        })
    } else {
        throw `Error: Could not fine file ${fileName}`
    }
}

module.exports = { create, download, remove }