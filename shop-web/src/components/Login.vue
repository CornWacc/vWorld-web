<template>

  <div class="container">

    <div class="model">
      <div class="left-model"></div>
      <div class="right-model">

        <div class="login-title"><p>登陆</p></div>
        <el-row :gutter=24 class="account">
          <el-col :span='6'><p class="account-title">账号:</p></el-col>
          <el-col :span='16'><el-input placeholder="请输入账号"></el-input></el-col>
        </el-row>
        <el-row :gutter=24 class="password">
          <el-col :span="6"><p class="password-title">密码:</p></el-col>
          <el-col :span="16"><el-input placeholder="请输入密码"></el-input></el-col>
        </el-row>
        <el-button class="login" @click="login" round>登陆</el-button>
      </div>
    </div>

  </div>

</template>

<script>
    export default {
        name: "Login",
      data(){
          return{

          };
      },
      methods:{
        login(){

        }
      }
    }
</script>

<style scoped>

  .container{
    width: 100%;
    height: 100%;
    background-color: darkgray;
    position: relative;
  }
  .model{
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    height: 460px;
    position: relative;
    top: 100px;
  }
  .left-model{
    width: 66%;
    float: left;
    height: 100%;
    background-color: white;
    border-radius: 4px;
  }
  .right-model{
    width: 32%;
    border: 1px solid gray;
    float: right;
    height: 100%;
    background-color: rgba(247, 245, 250, 0.1);
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
    width: 120px;
    margin-top: 40px;
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
    border-bottom: 1px solid gray;
    height: 40px;
    margin-top: 50px;
  }
</style>
