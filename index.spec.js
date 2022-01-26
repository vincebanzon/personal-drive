var process = require('process')
var chai = require('chai')
var chaiHttp = require('chai-http')
var expect = chai.expect

chai.use(chaiHttp)

const PORT = process.env.PORT
const BASE_URL = `http://localhost:${PORT}`


describe('Sample', () => {
    it('should be true', (done) => {
        expect(true).to.equal(true);
        done();
    })
    it('should be false', (done) => {
        expect(false).to.equal(false);
        done();
    })
})

describe('Test server', () => {
    it('should GET /', done => {
        chai.request(BASE_URL)
        .get('/')
        .end((err, res) => {
            expect(res).to.have.status(200)
            done()
        })
    })
})

describe('Test endpoint', () => {
    it('should POST /files', done => {
        chai.request(BASE_URL)
        .post('/files')
        .end((err, res) => {
            expect(res).to.have.status(200)
            done()
        })
    })
    it('should GET /files', done => {
        chai.request(BASE_URL)
        .get('/files')
        .end((err, res) => {
            expect(res).to.have.status(200)
            done()
        })
    })
    it('should DELETE /files', done => {
        chai.request(BASE_URL)
        .delete('/files')
        .end((err, res) => {
            expect(res).to.have.status(200)
            done()
        })
    })
})


describe('Test non-existing endpoint', () => {
    it('should not POST /', done => {
        chai.request(BASE_URL)
        .post('/')
        .end((err, res) => {
            expect(res).to.have.status(404)
            done()
        })
    })
    it('should not GET /file', done => {
        chai.request(BASE_URL)
        .get('/file')
        .end((err, res) => {
            expect(res).to.have.status(404)
            done()
        })
    })
})

describe('Test publickey and privatekey URL params', () => {
    let file = "multipart/form-data"
    let publickey = "1"
    let privatekey = "2"
    it('should return publikey and privatekey', done => {
        chai.request(BASE_URL)
        .get(`/files`)
        .end((err, res) => {
            // should return JSON with {publicKey: '', privateKey: ''}
            done()
        })
    })
    it('should return publickey', done => {
        chai.request(BASE_URL)
        .get(`/files/${publickey}`)
        .end((err, res) => {
            // should return stream file with a MIME type
            expect(res.text).to.equal(publickey)
            done()
        })
    })
    it('should return privatekey', done => {
        chai.request(BASE_URL)
        .delete(`/files/${privatekey}`)
        .end((err, res) => {
            // should return JSON confirmin file removal
            expect(res.text).to.equal(privatekey)
            done()
        })
    })
})