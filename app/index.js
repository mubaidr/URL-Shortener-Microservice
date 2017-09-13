var express = require('express')
var path = require('path')
var url = require('url')

var dbService = require('./db-service')

var app = express()
var port = process.env.PORT || 9000

/* static resources */
app.use(express.static(path.join(__dirname, 'public')))

/* favicon */
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/favicon.png'))
})

/* invalid */
app.get('/404', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/404.html'))
})

/* code to url */
app.get('/:code', (req, res) => {
  let code = req.params.code
  dbService.getURL(code).then(result => {
    // console.log(result)
    res.redirect(result.url)
  }).catch(err => {
    console.error(err)
    res.redirect('/404')
  })
})

/* all others */
app.get('*', function (req, res) {
  res.redirect('/404')
})

/* conversion post */
app.post('/', (req, res) => {
  let address = url.parse(req.originalUrl, true).query.url
  let result

  if (!url.parse(address).hostname) {
    res.status(400).send({
      error: 'Invalid request.',
      url: address,
      short: null
    })
  } else {
    result = dbService.setURL(address)
    if (result) {
      res.status(200).send({
        error: null,
        url: result.url,
        short: result.short
      })
    } else {
      res.status(500).send({
        error: 'Something bad happened!.',
        url: address,
        short: null
      })
    }
  }
})

/* start app */
app.listen(port)
