var mongoDB = require('mongodb')
var mongoClient = mongoDB.MongoClient()
var dbURL = 'mongodb://root:root@ds127854.mlab.com:27854/url-short-service'
// move user/pass to system configuration

module.exports = {
  async getURL (code) {
    let database = await mongoClient.connect(dbURL)
    let results = []
    let query = {
      short: code
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
  async setURL (url, code) {
    var res = await this.getURL(code)
    if (res.length > 0) {
      return res[0] // TOFIX return promise with result
    } else {
      // TODO return new promise with result
    }
  }
}
