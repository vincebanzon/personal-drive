const process = require('process');
const http = require('http');

const PORT = process.env.PORT ? process.env.PORT : 8081 

const requestListener = function (req, res) {
    if(req.url === '/') {
        res.writeHead(200);
        res.end('Hello, World!');
    } else if(req.url === '/files') {
        switch(req.method) {
            case 'POST':
                res.writeHead(200);
                res.end('POST');
                break
            case 'GET':
                res.writeHead(200);
                res.end('GET');
                break
            case 'DELETE':
                res.writeHead(200);
                res.end('DELETE');
                break
            default:
                res.writeHead(404);
                res.end('Error: URL not found.');
                break
        }
    } else {
        res.writeHead(404);
        res.end('Error: URL not found.');
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
