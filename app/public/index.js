// eslint-disable-next-line
Vue.config.productionTip = false
// eslint-disable-next-line
var app = new Vue({
  el: '#app',
  data () {
    return {
      url: 'https://github.com/mubaidr',
      short: '',
      loading: false
    }
  },
  methods: {
    shortenURL () {
      let _self = this
      _self.loading = true
      // eslint-disable-next-line
      reqwest({
        url: 'api?url=' + _self.url,
        method: 'post',
        error: function () {
          _self.short = 'Error occurred!'
          _self.loading = false
        },
        success: function (res) {
          _self.short = location.href + res.short
          _self.loading = false
        }
      })
    }
  }
})
