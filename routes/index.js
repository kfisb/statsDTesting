var express = require('express')
var router = express.Router()
var StatsD = require('node-statsd'),
  client = new StatsD()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
  //log stuff here
  client.increment('Entering_LoginPage')
})

router.post('/movies', (req, res, next) => {
  res.redirect('/movies')
  client.increment('Entering_MoviesPage')
})

module.exports = router
