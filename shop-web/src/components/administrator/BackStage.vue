<template>
  <div class="all">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div class="aside-title">
          <el-row>
            <el-col :span="10"><div class="aside-title-image"></div></el-col>
            <el-col :span="8"><div class="aside-title-font">VideoShop</div></el-col>
          </el-row>
         <div class="menu">
           <el-menu
             default-active="2"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose">
             <el-submenu index="1">
               <template slot="title">
                 <i class="el-icon-service"></i>
                 <span>User</span>
               </template>
               <el-menu-item-group>
                 <el-menu-item index="1-1"><router-link to="/userList" tag="div">用户管理操作</router-link></el-menu-item>
                 <el-menu-item index="1-2">用户登录日志</el-menu-item>
               </el-menu-item-group>
             </el-submenu>
           </el-menu>
           <el-menu
             default-active="2"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose">
             <el-submenu index="1">
               <template slot="title">
                 <i class="el-icon-picture-outline"></i>
                 <span>Banner</span>
               </template>
               <el-menu-item-group>
                 <el-menu-item index="1-1">商品主页广告</el-menu-item>
                 <el-menu-item index="1-2">登陆主页广告</el-menu-item>
               </el-menu-item-group>
             </el-submenu>
           </el-menu>
           <el-menu
             default-active="2"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose">
             <el-submenu index="1">
               <template slot="title">
                 <i class="el-icon-picture-outline"></i>
                 <span>Video</span>
               </template>
               <el-menu-item-group>
                 <el-menu-item index="1-1">电影展示列表</el-menu-item>
                 <el-menu-item index="1-2">电影票售出详情</el-menu-item>
               </el-menu-item-group>
             </el-submenu>
           </el-menu>
         </div>
        </div>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>注销</el-dropdown-item>
              <el-dropdown-item>修改</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{userName}}</span>
        </el-header>

        <el-main>
          <router-view name="UserList" content="UserLogin"></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
    export default {
        name: "BackStage",
      data(){
          return{
            userName:"Corn"
          }
      },
      methods:{
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>

  .all{
    width: 100%;
    height: 100%;
    /*border:1px solid red;*/
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .aside-title{
    width: 100%;
    /*border: 1px solid green;*/
    padding-top: 6px;
  }
  .aside-title-image{
    background: url("../../img/login/shop.png");
    width: 46px;
    height: 46px;
    background-size: cover;
    margin-left: 26px;
  }
  .aside-title-font{
    font-size: 20px;
    margin-top: 12px;
  }
  .menu{
    margin-top: 20px;
  }
  .el-menu{
    background-color: rgb(238,241,246);
  }
  .el-menu-item{
    background-color: rgb(238,241,246);
  }
  .el-menu >>> .el-menu-item-group__title {
    padding: 0;
  }

</style>
