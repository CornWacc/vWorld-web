import Vue from 'vue'
import Router from 'vue-router'
import LoginAndReg from '@/components/user/LoginAndReg'
import BackStage from "@/components/backstage/BackStage"
import UserList from "@/components/backstage/user/UserList"
import Main from "@/components/main/Main"
import RoleList from "@/components/backstage/user/RoleList"
import ProductMainBannerList from '@/components/backstage/banner/ProductMainBannerList'
import LoginBannerList from '@/components/backstage/banner/LoginBannerList'
import VideoList from "../components/backstage/video/VideoList";
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginAndReg',
      component: LoginAndReg
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
        },{
          path:"loginBannerList",
          name:"LoginBannerList",
          component:LoginBannerList
        },{
          path:"videoList",
          name:"VideoList",
          component:VideoList
        }
      ]
    },

    {
      path:"/main",
      name:"Main",
      component:Main
    },
  ]
})
