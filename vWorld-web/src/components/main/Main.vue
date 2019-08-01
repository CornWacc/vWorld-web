<template>
  <div class="all">
    <el-header class="header">
      <el-row style="display: block">
        <el-col :span="15">
          <div class="header-img"><p class="header-title">微世界</p></div>
        </el-col>
        <el-col :span="7">
          <el-input class="header-search" prefix-icon="el-icon-search" placeholder="搜索您想看的影片"></el-input>
        </el-col>
        <el-col :span="2">
          <el-dropdown type="primary" @command="handleCommand" class="header-user-header">
            <el-avatar shape="circle" :size="60" :src="this.userForm.userAvatar" @error="errorHandler"></el-avatar>

            <el-dropdown-menu style="text-align: left">
              <!--<el-dropdown-item>登陆</el-dropdown-item>-->
              <el-dropdown-item>{{this.userForm.userName}}</el-dropdown-item>
              <el-dropdown-item divided command="logOut">注销</el-dropdown-item>
              <el-dropdown-item v-if="isAdmin" command="toBackStage">后台管理</el-dropdown-item>
              <el-dropdown-item>我的购物车</el-dropdown-item>
              <el-dropdown-item>历史订单信息</el-dropdown-item>
              <el-dropdown-item>历史观看记录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <div class="main">
      <div class="video-show">
        <div class="show-title">
          <div class="show-title-icon"></div>
          <p class="show-title-font">热播影片</p>
        </div>
        <div class="swiper-container swiper-show  ">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in mainBannerList" :key="item.mainBannerId">
              <el-image :src="item.mainBannerUrl" @click="skip(item)" :fit="fits" style="height: 100%">
              </el-image>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="videos-free">
        <div class="show-title">
          <div class="show-title-icon"></div>
          <div class="show-title-font">免费在线影片</div>
        </div>
        <div class="video-list">
          <el-row :gutter="24">
            <el-col :span="6" v-for="(item, index) in videos" :key="index">
              <div class="video"></div>
              <p class="video-name" style="margin-top: 8px">{{item}}</p>
              <p class="video-create_time">上映日期：</p>
            </el-col>
          </el-row>
        </div>

      </div>
      <div class="videos-free">
        <div class="show-title">
          <div class="show-title-icon"></div>
          <div class="show-title-font">付费影片</div>
        </div>
        <div class="video-list">
          <el-row :gutter="24">
            <el-col :span="6" v-for="(item, index) in videos" :key="index">
              <div class="video"></div>
              <p class="video-name" style="margin-top: 8px">{{item}}</p>
              <p class="video-create_time">上映日期：</p>
            </el-col>
          </el-row>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  import Swiper from 'swiper'

  export default {
    name: "ShopMain",
    data() {
      return {
        userForm: {
          userAvatar: "",
          userName: "",
          userRoleId:""
        },
        mainBannerList: [],
        videos: [
          "12a3", "12a3"
        ],
        isAdmin: false, //是否为管理员
        fits: "fit",
        that: this
      }
    },
    mounted() {

      //获取用户信息
      this.$axios({
        url: this.Globel.requestUrl + "/user/userInfoQuery?userId=" + localStorage.getItem("userId"),
        method: "get",
      }).then(res => {
        console.log(res)
        this.userForm.userAvatar = res.data.object.userAvatar
        this.userForm.userName = res.data.object.userName
        this.userForm.userRoleId = res.data.object.userRoleId

        localStorage.setItem("userRoleId",res.data.object.userRoleId)
        if (res.data.object.userRole == "超级管理员") {
          this.isAdmin = true
        }
      })

      //获取主页bannerList
      this.$axios({
        url: this.Globel.requestUrl + "/banner/mainBannerListQuery",
        method: "get"
      }).then(res => {
        if (res.data.status == this.Globel.defaultRequestStatus) {
          this.mainBannerList = res.data.object.mainBannerInfos
        }
      })
      const that = this;
      setTimeout(function () {
        var swiper = new Swiper('.swiper-container', {
          autoplay: {
            delay: 3500,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          effect: 'fade',
          loop: true,
          grabCursor: true,
          pagination: {
            el: '.swiper-pagination',
          },

        })
      }, 1000)

    },
    methods: {

      /**
       * dropdown点击绑定事件
       * */
      handleCommand(c) {
        if (c == "toBackStage") {
          this.$router.push(
            {
              path:"/backStage",
            }
          )
        }
        if (c == "logOut") {
          this.$axios({
            url: this.Globel.requestUrl + "/user/userLogOut?userId=" + localStorage.getItem("userId"),
            method: "GET"
          }).then(res => {
            if (res.data.object.status == "SUCCESS") {
              localStorage.clear()
              this.$router.push("/")
            }
          })
        }
      },
      errorHandler() {
        console.log(1)
      },

      //页面跳转
      skip(data){
        if(data.skipUrl != ""){
          window.location.href = "http://"+data.skipUrl
        }
      }
    }
  }
</script>

<style scoped>

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

  }

  .all {
    height: 100%;
  }

  .video-show {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  .swiper-show {
    width: 100%;
    height: 470px;
    margin-top: 10px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  }

  .banner {
    width: 100%;
    height: 100%;
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
  }

  .header-user-header {
    margin-top: 20px;
  }

  .show-title-icon {
    width: 30px;
    height: 30px;
    border: 1px solid green;
    display: inline-block;
    /*position: relative;*/
    /*top: 12px;*/
    background-size: cover;
    float: left;

  }

  .show-title {
    /*width: 130px;*/
    /*height: 0px;*/
    position: relative;
    /*padding-bottom: 1px;*/
    overflow: hidden;
  }

  .show-title-font {
    position: absolute;
    margin: 0px;
    left: 40px;
    bottom: 1px;
  }

  .videos-free {
    /*width: 94%;*/
    margin-left: auto;
    margin-right: auto;
    height: 400px;
    /*border: 1px solid yellowgreen;*/
    margin-top: 56px;
  }

  .video-list-title {
    width: 150px;
    height: 40px;
    /*border: 1px solid orange;*/
    margin-bottom: 20px;
  }

  .video-list-title-icon {
    width: 30px;
    height: 30px;
    border: 1px solid rebeccapurple;
    position: relative;
    /*top: 10px;*/
    left: 14px;
    background-size: cover;
  }

  .video-list {
    width: 100%;
    height: 80%;
    display: flex;
  }

  .video {
    width: 100px;
    height: 120px;
    flex: 1;
    border: 1px solid green;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
  }

  .el-col-2 {
  }

  .el-row {
    width: 100%
  }

  .el-dropdown-menu {
    top: 68px !important;
  }

  .header-search {
    top: 38px;
    width: 200px;
  }
</style>
