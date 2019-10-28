<template>
  <el-container class="all">
    <el-header class="header">
      <el-row style="display: block;margin-left: auto;margin-right: auto;width: 80%">
        <el-col :span="14">
          <div class="header-img"><p class="header-title">微世界</p></div>
        </el-col>
        <el-col :span="10">
          <el-dropdown type="primary" @command="handleCommand" class="header-user-header">
            <el-avatar shape="circle" :size="60" :src="this.userForm.userAvatar" @error="errorHandler"></el-avatar>
            <el-dropdown-menu style="text-align: left">
              <el-dropdown-item>{{this.userForm.userName}}</el-dropdown-item>
              <el-dropdown-item divided command="logOut">注销</el-dropdown-item>
              <el-dropdown-item command="toPersonalData">个人信息</el-dropdown-item>
              <el-dropdown-item v-if="userForm.isAdmin" command="toBackStage">后台管理</el-dropdown-item>
              <el-dropdown-item>我的购物车</el-dropdown-item>
              <el-dropdown-item>历史订单信息</el-dropdown-item>
              <el-dropdown-item>历史观看记录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main">
      <el-row>
        <el-col :span="12" :offset="1" class="main_left_model">
          <div class="main_left_model_user">
            <el-row style="margin-top: 10px;margin-left: 20px">
              <el-col :span="4">
                <el-avatar :size="80" class="main_left_model_user_header"></el-avatar>
              </el-col>
              <el-col :lg="{span:12,offset:1}" :xl="{span:12,offset:0}" class="main_left_model_user_base">
                <el-row class="user_name">CornWacc</el-row>
                <el-row class="user_info">关注|粉丝|视频数|点赞|</el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-menu  class="main_left_model_navmenu" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">我的视频</el-menu-item>
                <el-menu-item index="2">我的关注</el-menu-item>
                <el-menu-item index="3">最新评论</el-menu-item>
                <el-menu-item index="4">我的V社</el-menu-item>
              </el-menu>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6" class="main_right_model">
        </el-col>
      </el-row>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
    export default {
        name: "PersonalData",
        data() {
            return {
                userForm: {
                    userAvatar: "",
                    userName: "",
                    userRoleId: "",
                    isAdmin: false
                }
            }
        },
        methods: {
            /**
             * dropdown点击绑定事件
             * */
            handleCommand(c) {
                if (c == "toBackStage") {
                    this.$router.push(
                        {
                            path: "/backStage",
                        }
                    )
                }
                if (c == "logOut") {
                    this.$axios({
                        url: this.Globel.requestUrl + "/user/userLogOut?userId=" + localStorage.getItem("userId"),
                        method: "GET"
                    }).then(res => {
                        if (res.data.success) {
                            localStorage.clear()
                            this.$router.push("/")
                        }
                    })
                }
                if (c == "toPersonalData") {
                    this.$router.push({
                        path: "/personal",
                    })
                }
            },

            errorHandler() {
                console.log(1)
            },
        }
    }
</script>

<style scoped>
  .all {
    width: 100%;
    height: 100%;
  }

  .header {
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    height: 90px !important;
    border-bottom: 1px solid red;
    padding: 0px !important;
    margin-bottom: 20px;
  }

  .main {
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    height: 90px !important;
    margin-bottom: 20px;
  }

  .header-img {
    width: 60px;
    height: 60px;
    background: url("../../img/login/headerImage.png");
    background-size: cover;
    position: relative;
    left: 60px;
    /*top: 22px;*/
  }

  .header-title {
    width: 100px;
    display: block;
    position: relative;
    left: 50px;
    top: 12px;
    font-size: 26px;
    color: black;
  }

  .header-user-header {
    margin-top: 20px;
    float: right;
  }

  .main_left_model {

  }

  .main_left_model_user {
    height: 140px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    box-shadow: 3px 3px 3px rgba(0,0,0,0.1);
  }

  .main_left_model_user_header {
    background-color: rgba(0,0,0,0.1);
  }

  .main_left_model_user_base {
    font-size: 14px;
    text-align:left;
    margin-top: 6px;
  }

  .main_left_model_user_base >>> .user_name{
    font-weight: bolder;
    font-size: 22px;
  }

  .main_left_model_user_base >>> .user_info{
    margin-top: 4px;
  }

  .main_left_model_navmenu{
    height: 50px;
    border-bottom: none;
  }
</style>
