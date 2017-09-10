var express = require('express')
var path = require('path')
var url = require('url')

// var urlService = require('./url-service')
var dbService = require('./db-service')

var app = express()
var port = process.env.PORT || 9000

app.use(express.static(path.join(__dirname, 'public')))

app.use('/favicon.ico', (req, res) => {
  res.status(204).end()
})

app.get('/404', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/404.html'))
})

app.get('/:code', (req, res, next) => {
  let code = req.params.code
  dbService.getURL(code).then((result) => {
    if (res.length > 0) {
      res.redirect(result[0].url)
    } else {
      res.redirect('/404')
    }
  }).catch(() => {
    res.redirect('/404')
  }).then(next)
})

app.get('*', function (req, res) {
  res.redirect('/404')
})

app.post('/', (req, res, next) => {
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

app.listen(port)
