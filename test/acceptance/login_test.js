'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))
const authenticationCollection = require(path.resolve('config/database')).get('authentication')

describe('Given Kevin and Dan\'s Super Cool Movies App', () => {
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true
  })
  
  describe('When I visit /', () => {
    beforeEach((done) => {
      authenticationCollection.insert({
        //_id: '585424fb792428b69acb2d7e',
        username: 'kfisb',
        password: 'C00lestGUYever!'
      }, (err, data) => {
          //browser.get('/albums/585424fb792428b69acb2d7e')
          console.log('a record has been inserted', data)
          done()
      })
      browser.get('/')
    })

    afterEach((done) => {
      authenticationCollection.remove({}, done)
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

   describe('When I enter an invalid user/password and click Login button', () => {
      it('Then I stay on home page and Invalid Username/Password h3 tag displays', () => {
        element(by.id('username')).sendKeys('kfisb');
        element(by.id('password')).sendKeys('abc');
        element(by.name('submit-btn')).click()
        expect(browser.getCurrentUrl()).toMatch(/\/$/ig)
        // expect(element(by.tagName('h3')).getText()).toEqual('Invalid Username/Password')
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