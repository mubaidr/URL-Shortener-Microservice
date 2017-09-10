var mongoDB = require('mongodb')
var mongoClient = mongoDB.MongoClient()
var dbURL = 'mongodb://root:root@ds127854.mlab.com:27854/url-short-service'
// move user/pass to system configuration

module.exports = {
  async getURL (short) {
    let database = await mongoClient.connect(dbURL)
    let results = []
    let query = {
      short: short
    }

    try {
      results = await database.collection('urls').find(query).toArray()
    } catch (err) {
      throw err
    } finally {
      database.close()
    }

    return results
  },
  async setURL (url, short) {
    let db = await mongoClient.connect(dbURL)
    // implement url update
  }
}
