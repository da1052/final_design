// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
// import './common/js/iconfont'
// import '//at.alicdn.com/t/font_813292_sya3dgfa8wc.js'
import './common/css/demo.css'
import store from './store'
import {Notify} from 'vue-ydui/dist/lib.rem/dialog'

Vue.prototype.$dialog = {
  notify: Notify
}

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;

Vue.use(YDUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
