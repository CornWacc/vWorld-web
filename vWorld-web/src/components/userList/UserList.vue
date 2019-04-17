<template>
  <div class="all">
    <el-row>
      <el-col :span="6"><div class="left-module">
        <el-tree class="user-tree" :data="data" :default-expanded-keys="[1,2]" node-key="id">
        </el-tree>
      </div></el-col>
      <el-col :span="15">
        <div class="right-module">
          <el-table><el-table-column
            prop="userId"
            label="用户id"
            width="180">
          </el-table-column>
            <el-table-column
              prop="userName"
              label="用户名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="userRole"
              label="用户权限">
            </el-table-column>
            <el-table-column
              prop="userEmail"
              label="用户邮箱">
            </el-table-column>
            <el-table-column
              prop="userPhone"
              label="用户手机号">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="注册时间">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
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
                id:1,
                label:"管理员",
                children:[{
                  label:"销售管理员"
                },{
                  label:"视频管理员"
                },{
                  label:"广告管理员"
                },
                  {
                    label:"超级管理员"
                  }]
              },{
              label: '用户',
              id:2,
              children: [{
                label: '普通用户',
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
    border:1px solid rgba(0, 0, 0, 0.1);
  }
  .right-module{
    width: 114%;
    height: 100%;
    border:1px solid rgba(0, 0, 0, 0.3);
  }
  .user-tree{
    box-shadow: 4px 4px 4px rgba(0,0,0,0.1);
  }
</style>
