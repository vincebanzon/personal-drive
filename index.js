const process = require('process')
const http = require('http')
const url = require('url')
const formidable = require('formidable')
const util = require('util')

var filesLib = require('./files-lib');

const PORT = process.env.PORT ? process.env.PORT : 8081 


const requestListener = function (req, res) {

    function respond404(res) {
        res.writeHead(404)
        res.end('Error: URL not found.');
    }

    function respond400(res, message) {
        res.writeHead(400)
        res.end(message)
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
                respond404(res)
                break;
        }
    } else if(paths[1] === 'files') {
        switch(req.method) {
            case 'POST':
                // can be improved by using Promise.
                // might error after timeout (2000ms)
                let callback = (req, res) => {
                    var form = new formidable.IncomingForm()
                    form.parse(req, (err, fields, files) => {
                        if(err) {
                            respond400(res, err)
                            return
                        }
                        let result = {
                            publicKey: '',
                            privateKey: ''
                        }
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        // res.write(result)
                        // res.end(util.inspect({fields: fields, files: files}))
                        res.end(JSON.stringify(result))
                    })
                }
                filesLib.create('text', async () => await callback(req, res))
                break
            case 'GET':
                if(paths[2]) {                      // check if publickey is present
                    let publickey = paths[2]

                    res.writeHead(200);
                    res.end(publickey);
                } else {
                    res.writeHead(200);
                    res.end('GET');
                }
                break
            case 'DELETE':
                if(paths[2]) {
                    let privatekey = paths[2]

                    res.writeHead(200);
                    res.end(privatekey);
                } else {
                    res.writeHead(200);
                    res.end();
                }
                break
            default:
                respond404(res)
                break
        }
    } else {
        respond404(res)
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
