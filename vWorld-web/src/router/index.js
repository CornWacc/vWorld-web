import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/user/Login'
import BackStage from "@/components/administrator/BackStage"
import UserList from "@/components/userList/UserList"
import ShopMain from "@/components/main/ShopMain"
import Reg from '@/components/user/Reg'
import RoleList from "@/components/role/RoleList"
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
        }
      ]
    },

    {
      path:"/shopMain",
      name:"ShopMain",
      component:ShopMain
    },

    {
      path:"/reg",
      name:"Reg",
      component:Reg
    }
  ]
})
