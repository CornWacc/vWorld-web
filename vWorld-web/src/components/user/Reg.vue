<template>
  <div class="all">
    <el-header class="header">
      <el-row style="display: block">
        <el-col :span="18"><div class="header-img"><p class="header-title">微世界</p></div></el-col>
        <el-col :span="6"><span class="toLogin" @click="toLogin">Return Login➡️️</span></el-col>
      </el-row>
    </el-header>
    <div class="reg-all">
      <el-form ref="form" status-icon :model="form" :rules="rules">
      <div class="user-info">
        <el-upload
          class="avatar-uploader"
          :action="this.Globel.qiNiuUploadUrl"
          :show-file-list="false"
          :data="this.qiNiuUploadData"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="showAvatar" :src="showAvatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

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
            showAvatar:"",//展示的头像地址
            form:{
              userAccount:"",
              userPassword:"",
              surePassword:"",
              userName:"",
              userEmail:"",
              userPhone:"",
              userAvatar:""
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

            qiNiuUploadData:{
              token:""
            }
          }
      },
      mounted(){
        this.$axios({
          url: this.Globel.requestUrl + "/getQiNiuToken",
          method: "GET"
        }).then(res => {
          this.qiNiuUploadData.token = res.data.msg
        })
      },
      methods:{
          reg(){
            this.$refs["form"].validate(valid =>{
              if(valid){
                this.$axios({
                  url:this.Globel.requestUrl+"/user/userReg",
                  data:this.form
                    // userName:this.form.userName,
                    // userAccount:this.form.userAccount,
                    // userPassword:this.form.userPassword,
                    // userPhone:this.form.userPhone,
                    // userEmail:this.form.userEmail,
                    // userAvatar:"暂无"
                  ,
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
        },
        handleAvatarSuccess(res, file) {
          console.log(res,file)
          this.form.userAvatar = res.hash
          this.showAvatar = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      }
    }
</script>

<style scoped>

  .all{
    margin-left: auto;
    margin-right: auto;
    width:40%;
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
    display: block;
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
    cursor: pointer !important;
  }

  .user-info{
    width: 100%;
    margin-top: 20px;
    display: inline-block;
  }
  .reg-input{
    margin-top: 14px;
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
    margin-bottom: 10px;
  }

  .user-info >>> .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }
</style>
