const fs = require('fs')
const formidable = require('formidable')
const mime = require('mime')
const { ENV_CONFIG } = require('./../config')

function create(req, done) {
    console.log('create to google')
}

function download(publicKey, done) {
    console.log('download from google')
}

function remove(privateKey, done) {
    console.log('remove from google')
}

module.exports = { create, download, remove }