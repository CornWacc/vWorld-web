<template>
  <div class="container">
    <el-header class="header">
      <div class="header-img">
        <p class="header-title">CornShop</p>

      </div>
    </el-header>

    <div class="model">
      <div class="left-model">
        <swiper :options="swiperOption">
          <swiper-slide v-for="item in img" :key="item" data-swiper-autoplay="9000">
            <img class="banner" :src="item">
          </swiper-slide>
          <div id="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="right-model">

        <el-form ref="form" :model="form" :rules="rules">
        <div class="login-title"><p>登&nbsp陆</p></div>
        <el-row :gutter=24 class="account">
          <el-col :span='6'><p class="account-title">账号:</p></el-col>
          <el-col :span='16'>
              <el-form-item prop="userAccount">
                <el-input v-model="form.userAccount" placeholder="请输入账号" suffix-icon="el-icon-caret-top"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter=24 class="password">
          <el-col :span="6"><p class="password-title">密码:</p></el-col>
          <el-col :span="16">
              <el-form-item prop="userPassword">
                <el-input v-model="form.userPassword" placeholder="请输入密码" suffix-icon="el-icon-caret-bottom" @keydown.native.enter="login"  show-password></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-button class="login" @click="login" round>登&nbsp陆</el-button>
        <a class="toReg">还没有账号? 去注册➡️</a>
        </el-form>
      </div>
    </div>

  </div>

</template>

<script>
  import mima from "../img/login/mima.png"
  import shop from "../img/login/shop.png"
    export default {
        name: "Login",
      data(){
          return{
            form:{
              userAccount:"",
              userPassword:"",
            },
            rules:{
              userAccount:[
                { required: true, message: '请输入登陆账号', trigger: 'blur' },
                { min: 1, message: '长度不能小于1个字', trigger: 'blur' }
              ],
              userPassword:[
                { required: true, message: '请输入登陆密码', trigger: 'blur' },
                { min: 1, message: '长度不能小于1个字', trigger: 'blur' }
              ]
            },
            img:[
              "http://attach.bbs.miui.com/forum/201804/14/115228gf92z731fl2slzvv.jpg",shop

            ],
            swiperOption: {
              speed:500,
              autoplay:true,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              pagination: {
                el: '#swiper-pagination',
                // type : 'custom',
              },

            }
          };
      },
      methods:{
        login(){
          this.$refs["form"].validate(valid =>{
            if(valid){
              this.$axios({

                method:"post",
                data:{
                  userAccount:this.account,
                  userPassword:this.password
                },
                headers:{
                  // "Access-Control-Allow-Origin":"*"
                },
                url:"http://192.168.2.3:8080/user/userLogin"
              }).then(res =>{
                console.log(res)
              })
            }
          })

        }
      }
    }
</script>

<style scoped>

  .container{
    width: 100%;
    height: 100%;
    background: url("../img/login/bkg.jpg");
    background-size: cover;
    position: relative;
  }
  .model{
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    height: 460px;
    position: relative;
    top: 80px;
  }
  .left-model{
    min-width: 60%;
    width: 64%;
    float: left;
    height: 100%;
    background-color: white;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
    /*border-radius: 4px;*/
  }
  .right-model{
    min-width: 30%;
    width: 32%;
    float: right;
    height: 100%;
    /*background-color: rgba(247, 245, 250, 0.1);*/
    background-color: white;
    box-shadow: 8px 8px 8px rgba(0,0,0,0.1);
    border-radius: 4px;
  }
  .password{
    margin-top: 30px;
    line-height: 14px;
  }
  .account{
    margin-top: 30px;
    line-height: 14px;
  }
  .login{
    width:80%;
    margin-top: 40px;
    font-weight: bolder;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.1);
    border-radius: 8px;
    background: cornflowerblue;
    color: white;
  }
  .account-title{
    text-align: right;
  }
  .password-title{
    text-align: right;
  }
  .login-title{
    font-size: 24px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    border-bottom: 2px solid gray;
    height: 40px;
    margin-top: 50px;
  }
  .header{
    width: 100%;
    height: 100px;
    /*border: 1px solid red;*/

  }
  .header-img{
    width: 50px;
    height: 50px;
    background: url("../img/login/shop.png");
    background-size: cover;
    margin-left: 42px;
    position: relative;
    top: 14px;
  }
  .header-title{
    margin-top: 0px;
    position: relative;
    left: 64px;
    top: 12px;
    font-size:24px;
  }
  .swiper-container{
    height: 100%;
  }
  .banner{
    width: 100%;
    height: 100%;
  }
  .swiper-pagination-bullet {

  }
  .toReg{
    display: block;
    margin-top: 30px;
    font-size: 14px;
    font-family: "monospace";
    font-weight: bolder;
    cursor: pointer;
  }
</style>
