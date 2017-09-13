var mongoDB = require('mongodb')
var mongoClient = mongoDB.MongoClient()
var dbURL = 'mongodb://root:root@ds127854.mlab.com:27854/url-short-service'
// TODO move user/pass to system configuration

var urlService = require('./url-service')

module.exports = {
  /**
   *
   *
   * @param {string} code url
   * @param {boolean} isFullUrl If the URL is full or short code
   * @returns
   */
  async getURL (code, isFullUrl) {
    let database
    let result
    let query = isFullUrl ? {
      url: code
    } : {
      short: code
    }

    console.dir(query)

    try {
      database = await mongoClient.connect(dbURL)
      result = await database.collection('urls').findOne(query)

      console.log(result)
    } catch (err) {
      console.error(err)
    } finally {
      database.close()
    }

    return result
  },
  /**
   *
   *
   * @param {string} url url to save
   * @returns {object} Document withurl data
   */
  async setURL (url) {
    let obj = await this.getURL(url, true)

    if (!obj) {
      let maxId = 100 + (await this.getMaxId()) + 1
      let code = urlService.encode(maxId)

      console.log(maxId, code)

      obj = {
        id: maxId,
        url: url,
        short: code
      }
      await this.addURL(obj, maxId)
    }
    return obj
  },
  /**
   *
   *
   * @param {object} obj
   * @returns true
   */
  async addURL (obj, count) {
    let database = await mongoClient.connect(dbURL)

    await database.collection('urls').insertOne(obj)
    await database.collection('counters').findOneAndUpdate({}, {
      counter: count
    })
    database.close()
    return true
  },
  /**
   *
   *
   * @returns {number} Returns maxId in the counters collection
   */
  async getMaxId () {
    let database = await mongoClient.connect(dbURL)
    let result = await database.collection('counters').findOne({})

    database.close()
    return parseInt(result.counter)
  }
}
