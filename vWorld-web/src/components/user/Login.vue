<template>
  <div class="container">
    <el-header class="header">
      <div class="header-img">
        <p class="header-title">微世界</p>

      </div>
    </el-header>

    <div class="model">
      <div class="left-model">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in img" :key="item">
              <el-image :src="item" style="height: 100%" :fit="fit" ></el-image>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
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
                <el-input v-model="form.userPassword" placeholder="请输入密码" suffix-icon="el-icon-caret-bottom"
                          @keydown.native.enter="login" show-password></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button class="login" @click="login" round>登&nbsp陆</el-button>
          <a class="toReg" @click="toReg">还没有账号? 去注册➡️</a>
        </el-form>
      </div>
    </div>

  </div>

</template>

<script>
  import Swiper from 'swiper'

  export default {
    name: "Login",
    data() {
      return {
        form: {
          userAccount: "", //用户登录账号
          userPassword: "", //用户登陆密码
        },
        rules: {
          userAccount: [
            {required: true, message: '请输入登陆账号', trigger: 'blur'},
            {min: 1, message: '长度不能小于1个字', trigger: 'blur'}
          ],
          userPassword: [
            {required: true, message: '请输入登陆密码', trigger: 'blur'},
            {min: 1, message: '长度不能小于1个字', trigger: 'blur'}
          ]
        },
        img: [
          "http://upload.vworld.top/FignPvXpin0lbzf4y4zWwUbKvQFe", "http://upload.vworld.top/Fl6LxBp4HgjQgPFLPd0E0KNyFPGu"

        ],
        fit:"cover"
      };
    },
    mounted(){
      var swiper = new Swiper('.swiper-container', {
        autoplay: {
          delay: 3500,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        effect: 'fade',
        // loop: true,
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination',
        },

      })
    },
    methods: {

      login() {

        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$axios({

              method: "post",
              data: {
                userAccount: this.form.userAccount, //用户登陆账号
                userPassword: this.form.userPassword //用户登陆密码
              },
              url: this.Globel.requestUrl + "/user/userLogin"

            }).then(res => {
              console.log(res)
              if (res.data.object.status == this.Globel.defaultRequestStatus) {
                //登陆成功后设置token
                localStorage.setItem("userToken", res.data.object.userToken)
                //设置UserId
                localStorage.setItem("userId", res.data.object.userId)
                //登陆成功跳转主页
                this.$router.push("/main")

              } else {
                this.$alert(res.data.object.message, "错误", {
                  confirmButtonText: '确定',
                })
              }
            })
          }
        })
      },

      toReg() {
        this.$router.push("/reg")
      }
    }
  }
</script>

<style scoped>

  .container {
    width: 100%;
    height: 100%;
    background: url("../../img/login/bkg.jpg");
    background-size: cover;
    position: relative;
  }

  .model {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    height: 460px;
    position: relative;
    top: 80px;
  }

  .left-model {
    min-width: 60%;
    width: 64%;
    float: left;
    height: 100%;
    background-color: white;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    /*border-radius: 4px;*/
  }

  .right-model {
    min-width: 30%;
    width: 32%;
    float: right;
    height: 100%;
    /*background-color: rgba(247, 245, 250, 0.1);*/
    background-color: white;
    box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  .password {
    margin-top: 30px;
    line-height: 14px;
  }

  .account {
    margin-top: 30px;
    line-height: 14px;
  }

  .login {
    width: 80%;
    margin-top: 40px;
    font-weight: bolder;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: cornflowerblue;
    color: white;
  }

  .account-title {
    text-align: right;
  }

  .password-title {
    text-align: right;
  }

  .login-title {
    font-size: 24px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    border-bottom: 2px solid gray;
    height: 40px;
    margin-top: 50px;
  }

  .header {
    width: 100%;
    height: 100px;
    /*border: 1px solid red;*/

  }

  .header-img {
    width: 50px;
    height: 50px;
    background: url("../../img/login/shop.png");
    background-size: cover;
    margin-left: 42px;
    position: relative;
    top: 14px;
  }

  .header-title {
    margin-top: 0px;
    width: 80px;
    position: relative;
    left: 56px;
    top: 10px;
    font-size: 24px;
  }

  .swiper-container {
    height: 100%;
  }

  .banner {
    width: 100%;
    height: 100%;
  }

  .swiper-pagination-bullet {

  }

  .toReg {
    display: block;
    margin-top: 30px;
    font-size: 14px;
    font-family: "monospace";
    font-weight: bolder;
    cursor: pointer;
  }
</style>
