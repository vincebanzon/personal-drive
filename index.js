const process = require('process')
const http = require('http')
const url = require('url')
const formidable = require('formidable')
const util = require('util')

var filesLib = require('./files-lib');

const PORT = process.env.PORT ? process.env.PORT : 8081 


const requestListener = function (req, res) {

    function respond404() {
        res.writeHead(404)
        res.end('Error: URL not found.');
    }

    function respond400(respond) {
        if(typeof message === 'string') {                           // respond message
            res.writeHead(400)
            res.end(respond)
        } else {                                                    // respond json
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(respond))
        }
    }

    // work around to get /:publickey and /:privatekey since I don't know how to get them natively.
    // and new URL("") needs a specific localhost which might cause error when base_url is different from my environment
    let paths = req.url.split('/')

    if(paths[1] === "") {
        switch(req.method) {
            case 'GET':
                res.writeHead(200);
                res.end('Hello, World!');
                break
            default:
                respond404()
                break;
        }
    } else if(paths[1] === 'files') {
        switch(req.method) {
            case 'POST':
                // can be improved by using Promise.
                // might error after timeout (2000ms)
                try {
                    filesLib.create(req, (result) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(result))
                    })
                } catch(err) {
                    respond400(err)
                }
                break
            case 'GET':
                if(paths[2]) {                      // check if publickey param is present
                    let publicKey = paths[2]
                    try {
                        filesLib.download(publicKey, (mimeType, file) => {
                            res.setHeader("Content-Type", mimeType)
                            res.writeHead(200)
                            res.end(file, 'binary')
                        })
                    } catch (err) {
                        respond400(err)
                    }
                } else {
                    respond400("Error: Invalid publicKey")
                }
                break
            case 'DELETE':
                if(paths[2]) {
                    let privateKey = paths[2]
                    try {
                        filesLib.remove(privateKey, () => {
                            res.writeHead(200, { 'Content-Type': 'application/json'});
                            res.end(JSON.stringify({message: 'File successfully deleted.'}));
                        })
                    } catch (err) {
                        respond400(err)
                    }
                } else {
                    respond400({message: "Invalid privateKey"})

                }
                break
            default:
                respond404()
                break
        }
    } else {
        respond404()
    }
}

const server = http.createServer(requestListener);
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});



/**
 * TDD
 * Install mocha and chai
 *
 * Update script:
 *  npm start
 *  npm test
 *
 * Setup EnvVar:
 *  PORT
 *  FOLDER
 *
 *
 * Create a server
 *  Create sample get endpoint
 *  Test endpoint
 *
 * Create test for endpoints
 * Create endpoints
 *  POST /files
 *  GET  /files/:publicKey
 *  Delete /files/privateKey
 *
 * Read parameters
 *
 *
 *
 */
