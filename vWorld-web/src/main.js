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

Date.prototype.format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
