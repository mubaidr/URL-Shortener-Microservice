var mongoDB = require('mongodb')
var mongoClient = mongoDB.MongoClient()
var dbURL = 'mongodb://root:root@ds127854.mlab.com:27854/url-short-service'
// move user/pass to system configuration

var urlService = require('./url-service')

module.exports = {
  async getURL (code) {
    let database = await mongoClient.connect(dbURL)
    let result
    let query = {
      short: code
    }

    result = await database.collection('urls').findOne(query).toArray()
    database.close()
    return result
  },
  async setURL (url) {
    let obj
    // TODO convert url to short
    let code = ''

    obj = await this.getURL(code)
    if (!obj) {
      obj = {
        url: url,
        short: code
      }
      await this.addURL(obj)
    }
    return obj
  },
  async addURL (obj) {
    let database = await mongoClient.connect(dbURL)
    await database.collection('urls').insertOne(obj)

    database.close()
    return true
  }
}
