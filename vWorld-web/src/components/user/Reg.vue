<template>
  <div class="all">
    <el-header class="header">
      <el-row style="display: block">
        <el-col :span="18"><div class="header-img"><p class="header-title">微世界</p></div></el-col>
        <el-col :span="6"><span class="toLogin" @click="toLogin">Return Login➡️️</span></el-col>
      </el-row>
    </el-header>
    <div class="reg-all">
      <div class="avatar"><span v-if="isChooseAvatar" class="avatar-title"></span><span v-else class="avatar-title">选择头像</span></div>
      <el-form ref="form" status-icon :model="form" :rules="rules">
      <div class="user-info">
        <el-row class="reg-input">
          <el-col :span="6"><span class="userBase-title">用户名:</span></el-col>
          <el-col :span="12"><el-form-item prop="userName"><el-input v-model="form.userName" class="userBase-input" placeholder="请输入用户名"></el-input></el-form-item></el-col>
        </el-row>

        <el-row class="reg-input">
          <el-col :span="6"><span class="userBase-title">账&nbsp&nbsp&nbsp&nbsp号:</span></el-col>
          <el-col :span="12"><el-form-item prop="userAccount"><el-input v-model="form.userAccount" class="userBase-input" placeholder="请输入登陆账号"></el-input></el-form-item></el-col>
        </el-row>
        <el-row class="reg-input">
          <el-col :span="6"><span class="userBase-title">密&nbsp&nbsp&nbsp&nbsp码:</span></el-col>
          <el-col :span="12"><el-form-item prop="userPassword"><el-input v-model="form.userPassword" class="userBase-input" placeholder="请输入登陆密码" show-password ></el-input></el-form-item></el-col>
        </el-row>
        <el-row class="reg-input">
          <el-col :span="6"><span class="userBase-title">确认密码:</span></el-col>
          <el-col :span="12"><el-form-item prop="surePassword"><el-input v-model="form.surePassword" class="userBase-input" placeholder="请确认登陆密码" show-password></el-input></el-form-item></el-col>
        </el-row>
        <el-row class="reg-input">
          <el-col :span="6"><span class="userBase-title">邮&nbsp&nbsp&nbsp&nbsp箱:</span></el-col>
          <el-col :span="12"><el-form-item prop="userEmail"><el-input v-model="form.userEmail" class="userBase-input" placeholder="请输入注册邮箱"></el-input></el-form-item></el-col>
        </el-row>
        <el-row class="reg-input">
          <el-col :span="6"><span class="userBase-title">手机号:</span></el-col>
          <el-col :span="12"><el-form-item prop="userPhone"><el-input v-model="form.userPhone" class="userBase-input" placeholder="请输入注册手机号"></el-input></el-form-item></el-col>
        </el-row>

        <el-button class="reg"  round @click="reg">注册</el-button>
      </div>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Reg",
      data(){
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.form.userPassword) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
          return {
            isChooseAvatar:false,
            form:{
              userAccount:"",
              userPassword:"",
              surePassword:"",
              userName:"",
              userEmail:"",
              userPhone:""
            },
            rules:{
              userName:[
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 1, message: '用户名长度不能小于1个字', trigger: 'blur' }
              ],
              userAccount:[
                { required: true, message: '请输入注册账号', trigger: 'blur' },
                { min: 1, message: '账号长度不能小于1个字', trigger: 'blur' }
              ],
              userPassword:[
                { required: true, message: '请输入注册密码', trigger: 'blur' },
                { min: 1, message: '密码长度不能小于1个字', trigger: 'blur' }
              ],
              surePassword:[
                { validator:validatePass, trigger: 'blur' }, //自定义校验
              ],
              userEmail:[
                { required: true, message: '请输入注册邮箱', trigger: 'blur' },
                { min: 1, message: '注册邮箱格式不正确', trigger: 'blur',type: "email" }
              ],
              userPhone:[
                { required: true, message: '请输入注册手机号', trigger: 'blur' },
                { min: 11 ,max:11, message: '注册手机字符数不正确', trigger: 'blur'},
              ]
            },

          }
      },
      methods:{
          reg(){
            this.$refs["form"].validate(valid =>{
              if(valid){
                this.$axios({
                  url:this.Globel.requestUrl+"/user/userReg",
                  data:{
                    userName:this.form.userName,
                    userAccount:this.form.userAccount,
                    userPassword:this.form.userPassword,
                    userPhone:this.form.userPhone,
                    userEmail:this.form.userEmail,
                    userAvatar:"暂无"
                  },
                  method: "post"
                }).then(res => {
                    console.log(res)
                  if(res.data.object.status == "SUCCESS"){
                    this.$alert("注册成功!","成功",{
                      confirmButtonText: '确定',
                    })
                    this.$router.push("/")
                  }else{
                    this.$alert(res.data.object.message,"错误",{
                      confirmButtonText:"确定"
                    })
                  }
                })
              }
            })
          },
        toLogin(){
          this.$router.push("/")
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
    cursor: pointer;
  }
  .reg-all{
    width: 100%;
    height: 100%;
    /*min-height: 900px;*/
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
    margin-top: 14px;
    /*margin-left: 36px;*/
  }
  .userBase-input{
    width: 330px;
  }
  .userBase-title{
    position: relative;
    top: 8px;
  }
  .reg{
    margin-top: 10px;
    width: 140px;
    box-shadow: 6px 6px 6px rgba(0,0,0,0.1);
  }
</style>
