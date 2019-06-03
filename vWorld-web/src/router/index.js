import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/user/Login'
import BackStage from "@/components/administrator/BackStage"
import UserList from "@/components/user/UserList"
import Main from "@/components/main/Main"
import Reg from '@/components/user/Reg'
import RoleList from "@/components/role/RoleList"
import ProductMainBanner from '@/components/banner/ProductMainBannerBackStage'
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
      component: BackStage,
      children: [
        {
          path:"userList",
          name:"UserList",
          component:UserList
        },
        {
          path:"roleList",
          name:"roleList",
          component:RoleList
        },{
          path:"productMainBanner",
          name:"productMainBanner",
          component:ProductMainBanner
        }
      ]
    },

    {
      path:"/main",
      name:"Main",
      component:Main
    },

    {
      path:"/reg",
      name:"Reg",
      component:Reg
    }
  ]
})
