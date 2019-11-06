<template>
  <el-container class="all">
    <el-header class="header">
      <el-row style="display: block;margin-left: auto;margin-right: auto;width: 80%">
        <el-col :span="14">
          <div class="header-img" @click="toMain"><p class="header-title">世界</p></div>
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
        <el-col :lg="{span:14,offset:1}" :xl="{span:12,offset:3}" class="main_left_model">
          <div class="main_left_model_user">
            <el-row style="margin-top: 10px;margin-left: 20px">
              <el-col :span="2">
                <el-avatar :size="80" :src="this.userForm.userAvatar" class="main_left_model_user_header"></el-avatar>
              </el-col>
              <el-col :lg="{span:12,offset:2}" :xl="{span:10,offset:2}" class="main_left_model_user_base">
                <el-row><p style="display: inline;" class="user_name">{{this.userForm.userName}}</p>
                  <li style="margin-left: 12px;font-size: 16px">{{this.userForm.userSex}}</li>
                  <p class="user_level" style="display: inline;">Lv{{this.userForm.userLevel}}</p></el-row>
                <el-row class="user_info">关注|粉丝|视频数|点赞|</el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-menu class="main_left_model_navmenu" :default-active="defaultActive" mode="horizontal"
                       @select="handleSelect">
                <el-menu-item index="1">
                  <template slot="title">
                    <i class="el-icon-location" style="margin-right: 0px;font-size: 20px"></i>
                    <span>我的视频</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="2">
                  <template slot="title">
                    <i class="el-icon-location" style="margin-right: 0px;font-size: 20px"></i>
                    <span>我的关注</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="3">
                  <template slot="title">
                    <i class="el-icon-location" style="margin-right: 0px;font-size: 20px"></i>
                    <span>最新评论</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="4">
                  <template slot="title">
                    <i class="el-icon-location" style="margin-right: 0px;font-size: 20px"></i>
                    <span>我的V社</span>
                  </template>
                </el-menu-item>
              </el-menu>
            </el-row>
          </div>
          <div class="main_left_model_show">

          </div>
        </el-col>
        <el-col :xl="{span:6}" :lg="{span:7}" class="main_right_model">
          <div class="main_right_model_search">
            <el-input
              placeholder="请输入希望查询的用户"
              prefix-icon="el-icon-search"
              v-model="searchUserInput">
            </el-input>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <!--    <el-footer></el-footer>-->
    <chat-box :userForm="userForm"></chat-box>
  </el-container>
</template>

<script>
    import ChatBox from "../ChatBox";

    export default {
        name: "PersonalData",
        components: {
            ChatBox
        },
        data() {
            return {
                userForm: {
                    userAvatar: "",
                    userName: "",
                    userRoleId: "",
                    isAdmin: false,
                    userRole: "",
                    userSex: "",
                    userLevel: 0,
                    userId: ""
                },
                searchUserInput: "",
                drawerIsShow: true,
                dialogIsShow: false,
                defaultActive: "1",
                direction: 'rtl',

            }
        },
        created() {
            console.log(this.$route.params)
            this.getUser()
        },
        methods: {
            async getUser(){
                await this.$axios({
                    url: this.Globel.requestUrl + "/user/userInfoQuery?userId=" + this.$route.query.userId
                }).then(res => {
                    if (res.data.success) {
                        this.userForm = res.data.data
                        this.userForm.isAdmin = res.data.data.userRole == "ADMIN" ? true : false
                        console.log(this.userForm)
                    }
                })
            },

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
            },

            handleSelect(key, keyPath) {

            },

            /**
             * 回到主页
             * */
            toMain() {
                this.$router.push("/main")
            }


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
    margin-bottom: 20px;
  }

  .main >>> li {
    display: inline;
  }

  .header-img {
    width: 60px;
    height: 60px;
    background: url("../../img/login/headerImage.png");
    background-size: cover;
    position: relative;
    left: 60px;
    top: 25px;
    cursor: pointer;
  }

  .header-title {
    width: 100px;
    display: block;
    position: relative;
    left: 60px;
    top: 12px;
    font-size: 26px;
    color: black;
  }

  .header-user-header {
    margin-top: 20px;
    float: right;
  }

  .main_left_model {
    height: 100%;
  }

  .main_left_model_user {
    height: 140px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
  }

  .main_left_model_user_header {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .main_left_model_user_base {
    font-size: 14px;
    text-align: left;
    margin-top: 6px;
  }

  .main_left_model_user_base /deep/ .user_name {
    font-weight: bolder;
    font-size: 22px;
  }

  .main_left_model_user_base >>> .user_info {
    margin-top: 4px;
  }

  .user_level {
    margin-left: 12px;
    font-size: 15px;
  }

  .main_left_model_navmenu {
    height: 50px;
    border-bottom: none;
    margin-left: 24px;
    font-weight: bolder;
  }

  .el-menu--horizontal >>> .el-menu-item.is-active {
    border-bottom: darkslategray !important;
  }

  .main_left_model_show {
    margin-top: 18px;
    width: 100%;
    /*min-height: 600px;*/
    /*border: 1px solid rgba(0,0,0,0.1);*/
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.03);
  }

  .main_right_model_search {
    width: 100%;
    margin-left: 30px;
  }

  .main_right_model_search >>> .el-input__inner {
    border-radius: 16px;
  }


</style>
