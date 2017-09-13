var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
var base = alphabet.length

module.exports = {
  /**
   *
   *
   * @param {number} num Number to encode to base 58
   * @returns {string} Encoded string
   */
  encode (num) {
    var encoded = ''
    while (num) {
      var remainder = num % base
      num = Math.floor(num / base)
      encoded = alphabet[remainder].toString() + encoded
    }
    return encoded
  },
  /**
   *
   *
   * @param {string} str String to decode
   * @returns {number} Decoded number
   */
  decode (str) {
    var decoded = 0
    while (str) {
      var index = alphabet.indexOf(str[0])
      var power = str.length - 1
      decoded += index * (Math.pow(base, power))
      str = str.substring(1)
    }
    return decoded
  }
}
