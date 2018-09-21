let request = require('supertest'),
    index = require('server'),
    assert = require('assert')

describe('all blogs', () => {
    it("shows all the blog ", () => {
        console.log(request(index).get('/api/blog/all'))
    })
})