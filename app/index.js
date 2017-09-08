var express = require('express')
var path = require('path')
var url = require('url')

var urlService = require('./url-service')
var dbService = require('./db-service')

var app = express()
var port = process.env.PORT || 9000

app.use(express.static(path.join(__dirname, 'public')))

app.use('*', (req, res, next) => {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).end()
  } else {
    console.log('Request at ' + new Date().toUTCString())
    next()
  }
})

app.get('/:code', (req, res, next) => {
  let code = req.params.code
})

app.get('/', (req, res, next) => {
  var address = url.parse(req.originalUrl, true).query.url
  if (!url.parse(address).hostname) {
    res.status(400).send({
      error: 'Invalid request.',
      url: address,
      short: null
    })
  } else {
    var short = null
    res.send({
      error: null,
      url: address,
      short: short
    })
  }
})

app.use('*', function (req, res) {
  res.end('NOT IMPLEMENTED: 404!')
})

app.listen(port)
