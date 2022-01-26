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
    it('should get /', (done) => {
        chai.request(BASE_URL)
        .get('/')
        .end((err, res) => {
            expect(res).to.have.status(200)
            done()
        })
    })
})