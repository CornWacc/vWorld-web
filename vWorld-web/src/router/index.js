import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/user/Login'
import BackStage from "@/components/backstage/BackStage"
import UserList from "@/components/backstage/user/UserList"
import Main from "@/components/main/Main"
import Reg from '@/components/user/Reg'
import RoleList from "@/components/backstage/role/RoleList"
import ProductMainBannerList from '@/components/backstage/banner/ProductMainBannerList'
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
          name:"RoleList",
          component:RoleList
        },{
          path:"productMainBannerList",
          name:"ProductMainBannerList",
          component:ProductMainBannerList
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
