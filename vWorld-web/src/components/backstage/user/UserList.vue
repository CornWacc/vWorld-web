<template>
  <div class="all">
    <el-row>
      <el-col :span="5">
        <div class="left-module">
          <el-tree class="user-tree" @node-click="searchUserByUserRole" :data="data" node-key="roleId"
                   :props="defaultProps">
          </el-tree>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="right-moudle">
          <el-form :inline="inline" class="search">
            <el-input class="input-keyWord" v-model="keyWord" placeholder="名称/手机号/邮箱"></el-input>
            <el-button @click="doSearch" style="margin-left: 10px">搜索</el-button>
            <el-button type="primary">导出</el-button>
          </el-form>
          <el-table :data="userList" style="width: 100%;max-width: none">
            <el-table-column
              prop="userId"
              label="用户id"
              width="160">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户名称">
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
              label="注册时间"
              width="150px">
            </el-table-column>
            <el-table-column
              prop="userStatus"
              label="状态"
              width="80px">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.userStatus == '开启'">{{scope.row.userStatus}}</el-tag>
                <el-tag v-else type="danger">{{scope.row.userStatus}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="do"
              label="操作">
              <template slot-scope="scope">
                <el-row>
                  <el-col>
                    <el-button size="mini" type="primary" @click="updateUser(scope.row)">编辑</el-button>
                  </el-col>
                  <el-col>
                    <el-button size="mini" @click="delUser(scope.row.userId,scope.$index)" type="danger"
                               style="margin-top: 8px">删除
                    </el-button>
                  </el-col>
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
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form label-width="80px" :label-position="labelPosition">
        <el-form-item label="用户名称:">
          <el-input v-model="compileUser.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱:">
          <el-input v-model="compileUser.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="compileUser.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="权限:">
          <el-cascader
            :clearable="true"
            :options="options"
            v-model="compileUser.userRoleData"
            @change="handleChange" style="width: 100%"
            :props="propsData"
            :show-all-levels="false">
          </el-cascader>
        </el-form-item>
        <el-form-item label="状态:">
          <el-switch
            v-model="compileUser.userStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="OPEN"
            inactive-value="CLOSE"
            @change="userStatusChange">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="sureUpdateUser" size="mini">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "UserList",
        data() {
            return {
                data: [],
                defaultProps: {
                    children: "children",
                    label: "roleName"
                },
                selectedOptions: [],
                userList: [],
                keyWord: "", //查询关键词
                userRole: "", //用户权限
                keyWordType: "", //查询类型
                total: 0,
                pageNum: 0,
                dialogVisible: false, //对话框是否现实
                inline: true,
                labelPosition: "right", //form表单对其方式
                updateObj: null,
                options: [],

                propsData: {
                    value: "roleId",
                    label: "roleName",
                    checkStrictly: true
                },
                compileUser: {
                    userName: "",
                    userEmail: "",
                    userPhone: "",
                    userStatus: "",
                    userRoleData: [],
                    userId: ""
                }
            }
        },
        mounted() {
            this.$axios({
                url: this.Globel.requestUrl + "/user/userListPageQuery?type=" + this.keyWordType + "&keyWord=" + this.keyWord + "&pageNum=" + this.pageNum + "&pageSize=5",
                method: "get"
            }).then(res => {
                this.userList = res.data.data.userInfoList
                this.total = res.data.data.total
            })

            this.$axios({
                url: this.Globel.requestUrl + "/role/roleListTreeQuery",
                method: "get"
            }).then(res => {
                if(res.data.success){
                    console.log(res)
                    this.data = res.data.data.roleInfos
                    this.options = res.data.data.roleInfos
                }else{
                  this.$message.error("权限数列表查询失败！");
                }
            })
        }
        ,
        methods: {
            doSearch() {
                this.keyWordType = "keyWord"
                this.pageQueryUserList(this.pageNum)
            }
            ,
            pageChange(num) {
                this.keyWordType = "keyWord"
                this.pageQueryUserList(num)
            }
            ,
            delUser(userId, index) {
                this.$axios({
                    url: this.Globel.requestUrl + "/user/userDel?userId=" + userId,
                    method: "get"
                }).then(res => {
                    if (res.data.success) {
                        this.$message("删除成功")
                        this.pageQueryUserList(1)
                    }
                })
            },

            /**
             * 分页查询用户列表
             * */
            pageQueryUserList(num) {
                this.$axios({
                    url: this.Globel.requestUrl + "/user/userListPageQuery?type=" + this.keyWordType + "&keyWord=" + this.keyWord + "&pageNum=" + num + "&pageSize=10",
                    method: "get"
                }).then(res => {
                    this.userList = res.data.data.userInfoList
                    this.total = res.data.data.total
                })
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            }
            ,
            handleChange(data, keyPath) {
                this.compileUser.userRoleData = data
            },

            /**
             * 查询用户通过用户权限
             * */
            searchUserByUserRole(role) {
                this.$axios({
                    url: this.Globel.requestUrl + "/user/userListPageQuery?type=userRole" + "&keyWord=" + role.roleId + "&pageNum=" + this.pageNum + "&pageSize=10",
                    method: "get"
                }).then(res => {
                    console.log(res)
                    if(res.data.success){
                        this.userList = res.data.data.userInfoList
                        this.total = res.data.data.total
                    }
                })
            },

            /**
             * 显示用户之前的参数
             * */
            updateUser(user) {
                this.dialogVisible = true
                this.compileUser.userId = user.userId
                this.compileUser.userName = user.userName
                this.compileUser.userEmail = user.userEmail
                this.compileUser.userPhone = user.userPhone
                this.compileUser.userStatus = user.userStatus === "开启" ? "OPEN" : "CLOSE"
                this.compileUser.userRoleData = [user.userRoleId]
            },
            /**
             * 确认更新
             * */
            sureUpdateUser() {
                var userRoleId = ""
                if (this.compileUser.userRoleData.length > 1) {
                    userRoleId = this.compileUser.userRoleData[this.compileUser.userRoleData.length - 1]
                } else {
                    userRoleId = this.compileUser.userRoleData[0]
                }
                var data = {
                    userId: this.compileUser.userId,
                    userName: this.compileUser.userName,
                    updateUserId: localStorage.getItem("userId"),
                    updateUserRoleId: localStorage.getItem("userRoleId"),
                    userEmail: this.compileUser.userEmail,
                    userPhone: this.compileUser.userPhone,
                    userStatus: this.compileUser.userStatus,
                    userRoleId: userRoleId
                }
                this.$axios({
                    url: this.Globel.requestUrl + "/user/userUpdate",
                    data: data,
                    method: "POST"
                }).then(res => {
                    if (res.data.success) {
                        this.dialogVisible = false
                        this.pageQueryUserList(1)
                    }
                    this.$message(res.data.msg)
                })
            },
            /**
             * 用户状态的切换
             * */
            userStatusChange(status) {
                this.compileUser.userStatus = status;
            }
        }


    }
</script>

<style scoped>
  .left-module {
    width: 82%;
    height: 100%;
    margin-left: 20px;
    margin-top: 11px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  }

  .right-moudle {
    width: 100%;
    height: 100%;
  }

  .search {
    float: left;
    margin-bottom: 20px;
  }

  .input-keyWord {
    width: 180px;
  }


</style>
