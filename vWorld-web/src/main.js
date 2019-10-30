// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import element from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import './assets/iconFont/iconfont.css'
import './assets/font_n7lakczx9p/iconfont.css'
import  Globel from './globel'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import VueSocketIO from 'vue-socket.io'

Vue.use(element)
Vue.use(ViewUI)
// Vue.use(Swiper)
Vue.prototype.$axios = axios
Vue.prototype.Globel = Globel
Vue.config.productionTip = false

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:9888",
  })
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
