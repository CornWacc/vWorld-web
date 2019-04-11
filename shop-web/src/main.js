// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import element from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import swiper from "vue-awesome-swiper"
import 'swiper/dist/css/swiper.css'

Vue.use(element)
Vue.use(swiper)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
