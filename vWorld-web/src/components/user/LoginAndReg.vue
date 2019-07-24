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
            <div class="swiper-slide" v-for="item in bannerList" :key="item.loginBannerId">
              <el-image @click="skip(item)" :src="item.loginBannerUrl" :alt="item.loginBannerName" style="height: 100%" :fit="fit"></el-image>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="right-model">

        <el-form ref="form" :model="loginForm" :rules="rules" v-if="isLoginModel">
          <el-row class="login-title" type="flex" :gutter=24 justify="center">
            <el-col :md="6" :xl="5"><p style="cursor: pointer" @click="toLogin">登&nbsp录</p></el-col>
            <el-col :span="2"><p>·</p></el-col>
            <el-col :md="5" :xl="5"><p style="cursor: pointer" @click="toReg">注&nbsp册</p></el-col>
          </el-row>
          <el-row :gutter=24 class="account" style="margin-top: 60px">
            <el-col :span='6'><p class="title">账号:</p></el-col>
            <el-col :span='15'>
              <el-form-item prop="userAccount">
                <el-input v-model="loginForm.userAccount" @keydown.native.enter="login" placeholder="请输入登录账号"
                          suffix-icon="el-icon-caret-top"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter=24 class="password" style="margin-top: 30px">
            <el-col :span="6"><p class="title">密码:</p></el-col>
            <el-col :span="15">
              <el-form-item prop="userPassword">
                <el-input v-model="loginForm.userPassword" placeholder="请输入登录密码" suffix-icon="el-icon-caret-bottom"
                          @keydown.native.enter="login" show-password></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter=24 class="imageCode" style="margin-top: 30px">
            <el-col :span="9" :offset="6">
              <el-form-item prop="imageCode">
                <el-input v-model="loginForm.imageCode" placeholder="请输入验证码" suffix-icon="el-icon-caret-bottom"
                          @keydown.native.enter="login"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-image @click="reloadImageCode" style="width: 100px;height: 40px" :src="imageCode.src"></el-image>
            </el-col>
          </el-row>
          <el-button class="login" @click="login" round>登&nbsp录</el-button>
        </el-form>
        <el-form ref="regForm" :model="regForm" :rules="rules" v-else>
          <el-row class="login-title" type="flex" :gutter=24 justify="center">
            <el-col :md="6" :xl="5"><p style="cursor: pointer" @click="toLogin">登&nbsp录</p></el-col>
            <el-col :span="2"><p>·</p></el-col>
            <el-col :md="5" :xl="5"><p style="cursor: pointer" @click="toReg">注&nbsp册</p></el-col>
          </el-row>
          <el-row :gutter=24 class="account">
            <el-col :span='6'><p class="title">账号:</p></el-col>
            <el-col :span='15'>
              <el-form-item prop="regUserAccount">
                <el-input v-model="regForm.regUserAccount" placeholder="请输入注册账号"
                          suffix-icon="el-icon-caret-top"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter=24 class="password" style="margin-top: 10px">
            <el-col :span="6"><p class="title">密码:</p></el-col>
            <el-col :span="15">
              <el-form-item prop="regUserPassword">
                <el-input v-model="regForm.regUserPassword" placeholder="请输入注册密码" suffix-icon="el-icon-caret-bottom"
                          @keydown.native.enter="reg" show-password></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter=24 class="rePassword" style="margin-top: 10px">
            <el-col :span="6"><p class="title">确认密码:</p></el-col>
            <el-col :span="15">
              <el-form-item prop="rePassword">
                <el-input v-model="regForm.rePassword" placeholder="请再次确认密码" suffix-icon="el-icon-caret-bottom"
                          @keydown.native.enter="reg" show-password></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter=24 class="email" style="margin-top: 10px">
            <el-col :span="6"><p class="title">Email:</p></el-col>
            <el-col :span="15">
              <el-form-item prop="email">
                <el-input v-model="regForm.email" placeholder="请输入注册邮箱" suffix-icon="el-icon-caret-bottom"
                          @keydown.native.enter="reg"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button class="reg" @click="reg" round>注&nbsp册</el-button>
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
      const checkPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码!'));
        } else if (value !== this.regForm.regUserPassword) {
          callback(new Error("两次密码输入不一致!"));
        } else {
          callback();
        }
      };
      var checkEmail = (rule, value, callback) => {
        var regEmail = /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,5}$/;
        if (!value) {
          return callback(new Error('注册邮箱不能为空!'))
        } else if (!regEmail.test(value)) {
          return callback(new Error("邮箱格式不正确!"))
        } else {
          return callback();
        }
      };
      const checkImageCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("验证码不能为空"))
        } else if (value !== this.imageCode.code) {
          return callback(new Error("验证码输入错误"))
        } else {
          return callback();
        }
      }
      return {
        imageCode: {
          src: "",
          code: ""
        },
        loginForm: {
          userAccount: "", //用户登录账号
          userPassword: "", //用户登陆密码
          imageCode: ""
        },
        regForm: {
          regUserAccount: "", //用户注册账号
          regUserPassword: "", //用户注册密码
          rePassword: "",
          email: ""
        },
        rules: {
          userAccount: [
            {required: true, message: '请输入登陆账号', trigger: 'blur'},
            {min: 1, message: '长度不能小于1个字', trigger: 'blur'}
          ],
          userPassword: [
            {required: true, message: '请输入登陆密码', trigger: 'blur'},
            {min: 1, message: '长度不能小于1个字', trigger: 'blur'}
          ],
          regUserAccount: [
            {required: true, message: '请输入注册账号', trigger: 'blur'},
            {min: 1, message: '长度不能小于1个字', trigger: 'blur'}
          ],
          regUserPassword: [
            {required: true, message: '请输入注册密码', trigger: 'blur'},
            {min: 1, message: '长度不能小于1个字', trigger: 'blur'}
          ],
          rePassword: [
            {validator: checkPassword, trigger: 'blur'}
          ],
          email: [{validator: checkEmail, trigger: 'blur'}],
          imageCode: [{validator: checkImageCode, trigger: 'blur'}]
        },
        bannerList: [],
        fit: "cover",
        isLoginModel: true //是否为登录框
      };
    },
    mounted() {
      setTimeout(function () {
        var swiper = new Swiper('.swiper-container', {
          autoplay: {
            delay: 100000,
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
      },500)
      this.getImage()
      this.getBanner()
    },
    methods: {
      getImage() {
        this.$axios({
          method: "get",
          url: this.Globel.requestUrl + "/api/imageCode",
          data: {}
        }).then(res => {
          this.imageCode.src = "data:image/jpeg;base64," + res.data.msg
          this.imageCode.code = res.data.object.code
        })
      },
      getBanner() {
        this.$axios({
          url: this.Globel.requestUrl + "/banner/loginBannerListPageQuery?mainBannerStatus=OPEN&pageNum=0&pageSize=0",
          method: "GET",
        }).then(res => {
          console.log(res)
          if (res.data.status == this.Globel.defaultRequestStatus) {
            this.bannerList = res.data.object.pageEntity.pageList;
          }
        })
      },
      login() {

        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$axios({

              method: "post",
              data: {
                userAccount: this.loginForm.userAccount, //用户登陆账号
                userPassword: this.loginForm.userPassword, //用户登陆密码
                imageCode: this.loginForm.imageCode
              },
              url: this.Globel.requestUrl + "/user/userLogin"

            }).then(res => {
              console.log(res)
              if (res.data.status == this.Globel.defaultRequestStatus) {
                //登陆成功后设置token
                localStorage.setItem("userToken", res.data.object.userToken)
                //设置UserId
                localStorage.setItem("userId", res.data.object.userId)
                //登陆成功跳转主页
                this.$router.push("/main")

              } else {
                this.$alert(res.data.msg, "错误", {
                  confirmButtonText: '确定',
                })
              }
            })
          }
        })
      },

      toReg() {
        this.isLoginModel = false
      },
      toLogin() {
        this.isLoginModel = true
      },
      reg() {
        this.$refs["regForm"].validate(valid => {
          if (valid) {
            this.$axios({
              url: this.Globel.requestUrl + "/user/userReg",
              data: {
                userAccount: this.regForm.regUserAccount,
                userPassword: this.regForm.regUserPassword,
                userEmail: this.regForm.email,
              },
              method: "post"
            }).then(res => {
              console.log(res)
              if (res.data.status == this.Globel.defaultRequestStatus) {
                this.isLoginModel = true
              }
              this.$message(res.data.msg)
            })
          }
        })
      },
      //刷新验证码
      reloadImageCode() {
        this.$axios({
          url: this.Globel.requestUrl + "/api/imageCode?oldImageCode=" + this.imageCode.code,
          method: "get"
        }).then(res => {
          this.imageCode.src = "data:image/jpeg;base64," + res.data.msg
          this.imageCode.code = res.data.object.code
        })

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
    height: 500px;
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
    line-height: 14px;
  }

  .account {
    margin-top: 40px;
    line-height: 14px;
  }

  .login, .reg {
    width: 80%;
    margin-top: 40px;
    font-weight: bolder;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: cornflowerblue;
    color: white;
  }

  .reg {
    margin-top: 10px;
  }

  .login {
    margin-top: 20px
  }

  .title {
    text-align: right;
  }

  .login-title {
    font-size: 24px;
    width: 80%;
    margin-left: auto !important;
    margin-right: auto !important;
    border-bottom: 2px solid gray;
    margin-top: 25px;
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
