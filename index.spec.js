
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const should = chai.should
const fs = require('fs')
const { ENV_CONFIG } = require('./config')

chai.use(chaiHttp)

const BASE_URL = `http://localhost:${ENV_CONFIG.PORT}`


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
    let fileName = 'sample-image.jpg'
    let publicKey = fileName
    let privateKey = fileName
    it('should POST /files', done => {
        chai.request(BASE_URL)
        .post('/files')
        .attach('fileName', fs.readFileSync('sample-image.jpg'), 'sample-image.jpg')
        .end((err, res) => {
            expect(res).to.have.status(200)
            done()
        })
    })
    it('should GET /files', done => {
        chai.request(BASE_URL)
        .get(`/files/${publicKey}`)
        .end((err, res) => {
            expect(res).to.have.status(200)
            done()
        })
    })
    it('should DELETE /files', done => {
        chai.request(BASE_URL)
        .delete(`/files/${privateKey}`)
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
    let fileName = 'sample-image.jpg'
    let publicKey = fileName
    let privateKey = fileName
    let file = fs.readFileSync(fileName)

    it('should return publikey and privatekey', done => {
        chai.request(BASE_URL)
        .post(`/files`)
        .attach('fileName', file, fileName)
        .set('Content-Type', 'image/jpeg')
        .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.publicKey).to.not.equal(null)
            expect(res.privateKey).to.not.equal(null)
            // expect(res.body.publicKey).to.equal(publicKey)
            // expect(res.body.privateKey).to.equal(privateKey)
            done()
        })
    })
    it('should return response stream with MIME type', done => {
        chai.request(BASE_URL)
        .get(`/files/${publicKey}`)
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.text).to.not.equal(null)
            expect(res.type).to.not.equal(null)

            done()
        })
    })
})

describe('Test invalid file',() => {
    it('should error when deleting non-existing file', done => {
        let invalidPrivateKey = '1'
        chai.request(BASE_URL)
        .delete(`/files/${invalidPrivateKey}`)
        .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res).to.be.json
            expect(res.message).to.not.equal(null)
            done()
        })
    })
})