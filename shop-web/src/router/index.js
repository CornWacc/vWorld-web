import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/user/Login'
import BackStage from "@/components/administrator/BackStage"


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/backStage',
      name: 'BackStage',
      component: BackStage
    }
  ]
})
