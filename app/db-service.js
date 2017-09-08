var mongoDB = require('mongodb')
var mongoClient = mongoDB.MongoClient()
var dbURL = 'mongodb://root:root@ds127854.mlab.com:27854/url-short-service'

module.exports = {
  getURL (short) {
    mongoClient.connect(dbURL, (err, db) => {
      if (err) throw err

      var query = {
        address: 'Park Lane 38'
      }
      db.collection('urls').find(query).toArray((err, result) => {
        if (err) throw err

        console.log(result)

        db.close()
      })
    })
  },
  setURL (url, short) {

  }
}
