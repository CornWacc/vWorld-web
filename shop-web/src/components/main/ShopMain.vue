<template>
  <div class="all">
    <el-header class="header">
      <el-row style="display: block">
        <el-col :span="15"><div class="header-img"><p class="header-title">微世界</p></div></el-col>
        <el-col :span="7"><el-input class="header-search"    prefix-icon="el-icon-search" placeholder="搜索您想看的影片"></el-input></el-col>
        <el-col :span="2"><el-dropdown type="primary" ><div class="header-user-head"></div>
        <el-dropdown-menu style="text-align: left">
          <!--<el-dropdown-item>登陆</el-dropdown-item>-->
          <el-dropdown-item>注销</el-dropdown-item>
          <el-dropdown-item>我的主页</el-dropdown-item>
          <el-dropdown-item>我的购物车</el-dropdown-item>
          <el-dropdown-item>历史订单信息</el-dropdown-item>
          <el-dropdown-item>历史观看记录</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown></el-col>
      </el-row>
    </el-header>
    <div class="main">
      <div class="video-show">
        <div class="show-title">
          <el-row>
            <el-col :span="8"><div class="show-title-icon"></div></el-col>
            <el-col :span="12"><p style="text-align: left" class="show-title-font">热播影片</p></el-col>
          </el-row>
        </div>
        <swiper class="swiper-show" :options="swiperOption">
          <swiper-slide v-for="item in img" :key="item" data-swiper-autoplay="1000">
            <img class="banner" :src="item">
          </swiper-slide>
        </swiper>
      </div>
      <div class="videos-free">
        <div class="video-list-title">
          <el-row>
            <el-col :span="8"><div class="video-list-title-icon"></div></el-col>
            <el-col :span="16"><p class="video-list-title-font">免费在线影片</p>
            </el-col>
          </el-row>
        </div>
        <div class="video-list">
          <el-row :gutter="24">
            <el-col :span="6"  v-for="(item, index) in videos" :key="index">
              <div class="video"></div>
              <p class="video-name" style="margin-top: 8px">{{item}}</p>
              <p class="video-create_time">上映日期：</p>
            </el-col>
          </el-row>
        </div>

      </div>
      <div class="videos-free">
        <div class="video-list-title">
          <el-row>
            <el-col :span="8"><div class="video-list-title-icon"></div></el-col>
            <el-col :span="11"><p class="video-list-title-font">付费影片</p>
            </el-col>
          </el-row>
        </div>
        <div class="video-list">
          <el-row :gutter="24">
            <el-col :span="6"  v-for="(item, index) in videos" :key="index">
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
    export default {
        name: "ShopMain",
      data(){
          return{
            swiperOption: {
              speed:500,
              autoplay:true,
              slidesPerView:"auto",
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              pagination: {
                el: '#swiper-pagination',
                // type : 'custom',
              }
            },
            img:[
              "http://attach.bbs.miui.com/forum/201804/14/115228gf92z731fl2slzvv.jpg",
              "http://img5.imgtn.bdimg.com/it/u=3565934373,813577224&fm=200&gp=0.jpg"

            ],
            videos:[
             "12a3","12a3"
            ]
        }
      }
    }
</script>

<style scoped>

  .header{
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    height:90px !important;
    border-bottom: 1px solid red ;
    padding: 0px !important;
    margin-bottom: 20px;
  }
  .main{
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    /*height: 100%;*/
    /*border: 1px  solid blue;*/
    /*overflow: no-display;*/
    /*display: inline-block;*/
  }
  .all{
    /*overflow: auto;*/
    height: 100%;
  }
  .video-show{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  .swiper-show{
    width: 100%;
    height: 410px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.1);
  }
  .banner{
    width: 100%;
    height: 100%;
  }
  .header-img{
    width: 60px;
    height: 60px;
    background: url("../../img/login/shop.png");
    background-size: cover;
    position: relative;
    left: 60px;
    top: 2px;
  }
  .header-title{
    width: 100px;
    display: block;
    position: relative;
    left: 56px;
    top: 12px;
    font-size: 26px;
  }
  .show-title-icon{
    width: 30px;
    height: 30px;
    border: 1px solid green;
    position: relative;
    top: 12px;
    background-size: cover;

  }
  .show-title{
    width: 130px;
    height: 0px;
  }
  .show-title-font{
    position: relative;

  }
  .videos-free{
    width: 94%;
    margin-left: auto;
    margin-right: auto;
    height: 400px;
    /*border: 1px solid yellowgreen;*/
    margin-top: 56px;
  }
  .video-list-title{
    width: 150px;
    height: 40px;
    /*border: 1px solid orange;*/
    margin-bottom: 20px;
  }
  .video-list-title-icon{
    width: 30px;
    height: 30px;
    border: 1px solid rebeccapurple;
    position: relative;
    top: 10px;
    left: 14px;
    background-size: cover;
  }
  .video-list{
    width: 100%;
    height: 80%;
    /*border: 1px solid red;*/
    display: flex;
    margin-top: -30px;
  }
  .video{
    width: 100px;
    height: 120px;
    flex: 1;
    border: 1px solid green;
    /*margin-left: 40px;*/
    /*margin-right: 40px;*/
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
  }
  .video-create_time{
    margin-top: -16px;
  }
  .el-row{
    width:100%
  }
  .header-user-head{
    width: 50px;
    height: 50px;
    border:1px solid  blue;
    position: relative;
    top: 28px;
    border-radius: 50%;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.1);
  }
  .el-dropdown-menu{
    /*left: 1120px !important;*/
    top: 68px !important;
  }
  .header-search{
    top: 38px;
    width: 200px;
  }
</style>
