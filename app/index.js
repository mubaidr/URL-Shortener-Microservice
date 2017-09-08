var express = require('express')
var path = require('path')
var url = require('url')

// var urlService = require('./url-service')
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
  let obj = dbService.getURL(code)
  // redirect to url
  console.log('got: ', obj)
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
    // calculate short code
    let obj = dbService.getURL(short)
    if (!obj) {
      // save short, url to db
    }

    res.send({
      error: null,
      url: obj.url,
      short: obj.short
    })
  }
})

app.use('*', function (req, res) {
  res.end('NOT IMPLEMENTED: 404!')
})

app.listen(port)
