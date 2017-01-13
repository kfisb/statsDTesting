var express = require('express')
var router = express.Router()
const path = require('path')
const authenticationCollection = require(path.resolve('config/database')).get('authentication')
var StatsD = require('node-statsd'),
  client = new StatsD()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
  //log stuff here
  client.increment('Entering_LoginPage')
})

router.post('/movies', (req, res, next) => {
  authenticationCollection.findOne({
    username: req.body.username,
    password: req.body.password}, 
    (err, authentication) => {
      console.log('&&&&&&&&&&&&&&&&&', authentication)
      if(err)
        next(err)
      if(authentication)
      {
        console.log('reached inside authentication if-else block')
        res.redirect('/movies')
        client.increment('Entering_MoviesPage')
      }
      else {
        console.log('failed to go inside authentication if-else block')
        res.redirect('/')
        client.increment('Invalid Login')
      }
  })
})

module.exports = router
