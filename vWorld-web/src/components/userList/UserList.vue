<template>
  <div class="all">
    <el-row>
      <el-col :span="6"><div class="left-module">
        <el-tree :data="data">

        </el-tree>
      </div></el-col>
      <el-col :span="15"><div class="right-module"></div></el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "UserList",
      data(){
          return {
            data: [
              {
                label:"管理员",
                children:[{
                  label:"销售管理员"
                },
                  {
                    label:"后台管理员"
                  }]
              },{
              label: '用户',
              children: [{
                label: '普通用户',
                children: [{
                  label: '三级 1-1-1'
                }]
              },
                {
                  label:"Vw用户"
                }]
            }]
          }
      }
    }
</script>

<style scoped>
  .left-module{
    width: 80%;
    height: 100%;
    border:1px solid red;
  }
  .right-module{
    width: 114%;
    height: 100%;
    border:1px solid blue;
  }
</style>
