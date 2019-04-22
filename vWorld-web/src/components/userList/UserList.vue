<template>
  <div class="all">
    <el-row>
      <el-col :span="6"><div class="left-module">
        <el-tree class="user-tree" :data="data" :default-expanded-keys="[1,2]" node-key="id">
        </el-tree>
      </div></el-col>
      <el-col :span="15">
        <div class="right-mdule">
          <el-row :gutter="32" class="search">
            <el-col :span="9"><el-input class="input-keyWord" v-model="keyWord" placeholder="名称/手机号/邮箱"></el-input></el-col>
            <el-col :span="5" class="doSearch" style="padding-left: 12px" ><el-button @click="doSearch">Search</el-button></el-col>
            <el-col :span="4" class="doExport" style="padding-left: 0px"><el-button>Export</el-button></el-col>
          </el-row>
          <el-table :data="userList" style="width: 100%;max-width: none">
            <el-table-column
            prop="userId"
            label="用户id"
            width="140">
          </el-table-column>
            <el-table-column
              prop="userName"
              label="用户名称"
              width="110">
            </el-table-column>
            <el-table-column
              prop="userRole"
              label="用户权限"
              width="100">
            </el-table-column>
            <el-table-column
              prop="userEmail"
              label="用户邮箱"
              width="160">
            </el-table-column>
            <el-table-column
              prop="userPhone"
              label="用户手机号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="注册时间"
            width="160">
            </el-table-column>
            <el-table-column
              prop="do"
              label="操作">
              <template slot-scope="scope">
                <el-row>
                  <el-col><el-button size="mini" type="danger" style="margin-bottom: 4px">删除</el-button></el-col>
                  <el-col><el-button size="mini" type="primary">编辑</el-button></el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total" style="margin-top: 30px" :page-size="5" @current-change="pageChange">
          </el-pagination>
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
            data:
              [
              {
                id: 1,
                label: "管理员",
                children: [{
                  label: "销售管理员"
                }, {
                  label: "视频管理员"
                }, {
                  label: "广告管理员"
                },
                  {
                    label: "超级管理员"
                  }]
              }, {
                label: '用户',
                id: 2,
                children: [{
                  label: '普通用户',
                },
                  {
                    label: "Vw用户"
                  }]
              }],
            userList:[],
            keyWord:"",
            userRole:"",
            keyWordType:"",
            total:0,
            pageNum:0
          }
      },
      mounted(){
        this.$axios({
          url:this.Globel.requestUrl+"/user/userListPageQuery?type="+this.keyWordType+"&keyWord="+this.keyWord+"&pageNum="+this.pageNum+"&pageSize=5",
          method:"get"
        }).then(res =>{
          console.log(res)
          this.userList = res.data.object.userInfoList
          this.total = res.data.object.total
          console.log(this.pages)
        })
      },
      methods:{
        doSearch(){
          this.keyWordType = "keyWord"
          this.$axios({
            url:this.Globel.requestUrl+"/user/userListPageQuery?type="+this.keyWordType+"&keyWord="+this.keyWord+"&pageNum="+this.pageNum+"&pageSize=5",
            method:"get"
          }).then(res =>{
            console.log(res)
            this.userList = res.data.object.userInfoList
            this.total = res.data.object.total
          })
        },
        pageChange(num){
          this.keyWordType = "keyWord"
          this.$axios({
            url:this.Globel.requestUrl+"/user/userListPageQuery?type="+this.keyWordType+"&keyWord="+this.keyWord+"&pageNum="+num+"&pageSize=5",
            method:"get"
          }).then(res =>{
            console.log(res)
            this.userList = res.data.object.userInfoList
            this.total = res.data.object.total
          })
        }
      }
    }
</script>

<style scoped>
  .left-module{
    width: 80%;
    height: 100%;
    margin-left: 20px;
    border:1px solid rgba(0, 0, 0, 0.1);
    margin-top: 11px;
  }
  .right-module{
    width: 120%;
    height: 100%;
    margin-left: 12px;
    border:1px solid rgba(0, 0, 0, 0.3);
  }
  .user-tree{
    /*box-shadow: 4px 4px 4px rgba(0,0,0,0.1);*/
  }

  .search{
    width:70%;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .input-keyWord{
    width: 180px;
  }


  .doSearch{

  }

</style>
