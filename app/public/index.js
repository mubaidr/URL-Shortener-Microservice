// eslint-disable-next-line
Vue.config.productionTip = false
// eslint-disable-next-line
var app = new Vue({
  el: '#app',
  data () {
    return {
      url: 'https://github.com/mubaidr',
      short: 'Your Result will appear here!',
      loading: false
    }
  },
  methods: {
    shortenURL () {
      this.loading = true
      // eslint-disable-next-line
      reqwest({
        url: 'api?url=' + this.url,
        type: 'json',
        method: 'post',
        error: function () {
          this.short = 'Error occurred!'
        },
        success: function (res) {
          this.short = res.short
        },
        complete: function () {
          this.loading = false
        }
      })
    }
  }
})
