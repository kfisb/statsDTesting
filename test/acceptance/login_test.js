'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))

describe('Given Kevin and Dan\'s Super Cool Movies App', () => {
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true
  })
  
  describe('When I visit /', () => {
    beforeEach(() => {
      browser.get('/')
    })
    it('Then I see the login page', () => {
      expect(element(by.tagName('h1')).getText()).toEqual('Login to Kevin and Dan\'s Super Cool Movies App')
    })

    describe('When I enter a valid user/password and click Login button', () => {
      it('Then I\'m redirected to movies home page', () => {
        element(by.id('username')).sendKeys('kfisb');
        element(by.id('password')).sendKeys('C00lestGUYever!');
        element(by.name('submit-btn')).click()
        expect(browser.getCurrentUrl()).toMatch(/\/movies$/ig)
      })
    })

  })

//   describe('Given I visit /users', () => {
//     it('Then I see the express default', () => {
//       browser.get('/users')
//       expect(element(by.tagName('body')).getText()).toEqual('respond with a resource')
//     })
//   })
})