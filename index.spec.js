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