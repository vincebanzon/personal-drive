const fs = require('fs')
const formidable = require('formidable')
const mime = require('mime')
const { ENV_CONFIG } = require('./../config')

const BASE_FOLDER = ENV_CONFIG.FOLDER

function create(req, done) {
    var form = new formidable.IncomingForm()

    form.parse(req, (err, fields, files) => {
        if(err) throw err

        Object.keys(files).map( key => {
            let fileName = files[key].name.replace(' ', '%20')
            let destination = BASE_FOLDER+fileName
            fs.rename(files[key].path, destination, (err) => {
                if(err) throw err
                done({
                    publicKey: fileName,
                    privateKey: fileName
                })
            })
        })
    })
}

function download(publicKey, done) {
    var fileLocation = BASE_FOLDER+publicKey
    try{
        if(fs.existsSync(fileLocation)) {
            file = fs.readFileSync(fileLocation)        // add slash between FOLDER and filename if FOLDER value has no slash ending
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