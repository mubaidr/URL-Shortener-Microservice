var mongoDB = require('mongodb')
var mongoClient = mongoDB.MongoClient()
var dbURL = 'mongodb://root:root@ds127854.mlab.com:27854/url-short-service'
// move user/pass to system configuration

module.exports = {
  async getURL (short) {
    var database = null
    var query = {
      short: short
    }

    await mongoClient.connect(dbURL, (err, db) => {
      if (err) throw err
      database = db
    })

    await database.collection('urls').find(query).toArray((err, result) => {
      if (err) throw err
      database.close()
      return result[0]
    })
  },
  async setURL (url, short) {
    // implement url update
  }
}
