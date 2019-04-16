<template>
  <div class="all">
    <el-header class="header">
      <el-row style="display: block">
        <el-col :span="18"><div class="header-img"><p class="header-title">微世界</p></div></el-col>
        <el-col :span="6"><span class="toLogin">Return Login➡️️</span></el-col>
      </el-row>
    </el-header>
    <div class="reg-all">
      <div class="avatar"><span v-if="isChooseAvatar" class="avatar-title"></span><span v-else class="avatar-title">选择头像</span></div>
      <div class="user-info">
        <el-row class="reg-input">
          <el-col :span="4"><span class="userBase-title">用户名:</span></el-col>
          <el-col :span="12"><el-input class="userBase-input" placeholder="请输入用户名"></el-input></el-col>
        </el-row>

        <el-row class="reg-input">
          <el-col :span="4"><span class="userBase-title">账&nbsp&nbsp&nbsp&nbsp号:</span></el-col>
          <el-col :span="12"><el-input class="userBase-input" placeholder="请输入登陆账号"></el-input></el-col>
        </el-row>
        <el-row class="reg-input">
          <el-col :span="4"><span class="userBase-title">密&nbsp&nbsp&nbsp&nbsp码:</span></el-col>
          <el-col :span="12"><el-input class="userBase-input" placeholder="请输入登陆密码"></el-input></el-col>
        </el-row>
        <el-row class="reg-input">
          <el-col :span="4"><span class="userBase-title">邮&nbsp&nbsp&nbsp&nbsp箱:</span></el-col>
          <el-col :span="12"><el-input class="userBase-input" placeholder="请输入注册邮箱"></el-input></el-col>
        </el-row>
        <el-row class="reg-input">
          <el-col :span="4"><span class="userBase-title">手机号:</span></el-col>
          <el-col :span="12"><el-input class="userBase-input" placeholder="请输入注册手机号"></el-input></el-col>
        </el-row>

        <el-button class="reg"  round>注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Reg",
      data(){
          return {
            isChooseAvatar:false
          }
      }
    }
</script>

<style scoped>

  .all{
    margin-left: auto;
    margin-right: auto;
    width:40%;
    height: 100%;
    border:1px solid rgba(0,0,0,0.1);
    box-shadow: 4px 4px 4px rgba(0,0,0,0.1);
  }

  .header{
    border-bottom: 1px solid yellow;
  }

  .header-img{
    width: 40px;
    height: 40px;
    background: url("../../img/login/shop.png");
    background-size: cover;
    position: relative;
    left: 10px;
    top: -10px;
  }
  .header-title{
    width: 100px;
    display: block;
    position: relative;
    left: 25px;
    top: 8px;
    font-size: 20px;
  }
  .toLogin{
    position: relative;
    top: 20px;
  }
  .reg-all{
    width: 100%;
  }
  .avatar{
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    border:1px solid rgba(0,0,0,0.1);
    width: 90px;
    height: 90px;
    box-shadow: 6px 6px 6px rgba(0,0,0,0.1);
    margin-top: 18px;
    line-height: 90px;
  }
  .avatar-title{
    font-size: 14px;
    cursor:pointer;
  }
  .user-info{
    width: 100%;
    /*border: 1px solid green;*/
    margin-top: 20px;
  }
  .reg-input{
    margin-top: 30px;
    margin-left: 36px;
  }
  .userBase-input{
    width: 330px;
  }
  .userBase-title{
    position: relative;
    top: 8px;
  }
  .reg{
    margin-top: 40px;
    width: 140px;
    box-shadow: 6px 6px 6px rgba(0,0,0,0.1);
  }
</style>
