<template>
  <div class="all">
    <el-row>
      <el-col :span="5">
        <div class="left-module">
          <el-tree class="user-tree" :data="data"   node-key="roleId" :props="defaultProps" 	>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="right-moudle">
          <el-form :inline="inline" class="search">
            <el-input class="input-keyWord" v-model="keyWord" placeholder="名称/手机号/邮箱"></el-input>
            <el-button @click="doSearch" style="margin-left: 10px">搜索</el-button>
            <el-button>导出</el-button>
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
              width="80px"
            >
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
                    <el-button size="mini" type="primary" @click="dialogVisible = true">编辑</el-button>
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
      <el-form label-width="80px" v-model="updateObj" :label-position="labelPosition">
        <el-form-item label="用户名称:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="权限:">
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            @change="handleChange" style="width: 100%">
          </el-cascader>
        </el-form-item>
        <el-form-item label="状态:">
          <el-switch
            v-model="inline"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "UserList",
    data() {
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
        defaultProps:{
          children:"children",
          label:"roleName"
        },

        selectedOptions: [],
        userList: [],
        keyWord: "",
        userRole: "",
        keyWordType: "",
        total: 0,
        pageNum: 0,
        dialogVisible: false,
        inline: true,
        labelPosition: "right",
        updateObj: null,
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }]
        }]
      }
    },
    mounted() {
      this.$axios({
        url: this.Globel.requestUrl + "/user/userListPageQuery?type=" + this.keyWordType + "&keyWord=" + this.keyWord + "&pageNum=" + this.pageNum + "&pageSize=5",
        method: "get"
      }).then(res => {
        this.userList = res.data.object.userInfoList
        this.total = res.data.object.total
      })

      this.$axios({
        url: this.Globel.requestUrl + "/role/roleListTreeQuery",
        method: "get"
      }).then(res => {
        this.data = res.data.object.roleInfos
      })
    }
    ,
    methods: {
      doSearch() {
        this.keyWordType = "keyWord"
        this.$axios({
          url: this.Globel.requestUrl + "/user/userListPageQuery?type=" + this.keyWordType + "&keyWord=" + this.keyWord + "&pageNum=" + this.pageNum + "&pageSize=5",
          method: "get"
        }).then(res => {
          console.log(res)
          this.userList = res.data.object.userInfoList
          this.total = res.data.object.total
        })
      }
      ,
      pageChange(num) {
        this.keyWordType = "keyWord"
        this.$axios({
          url: this.Globel.requestUrl + "/user/userListPageQuery?type=" + this.keyWordType + "&keyWord=" + this.keyWord + "&pageNum=" + num + "&pageSize=5",
          method: "get"
        }).then(res => {
          console.log(res)
          this.userList = res.data.object.userInfoList
          this.total = res.data.object.total
        })
      }
      ,
      delUser(userId, index) {
        console.log(index)
        this.$axios({
          url: this.Globel.requestUrl + "/user/userDel?userId=" + userId,
          method: "get"
        }).then(res => {
          console.log(res);
          if (res.data.object.status == "SUCCESS") {
            this.$message("删除成功")
            this.$axios({
              url: this.Globel.requestUrl + "/user/userListPageQuery?type=" + this.keyWordType + "&keyWord=" + this.keyWord + "&pageNum=1" + "&pageSize=5",
              method: "get"
            }).then(res => {
              console.log(res)
              this.userList = res.data.object.userInfoList
              this.total = res.data.object.total
            })
          }
        })
      }
      ,
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
      ,
      handleChange(key, keyPath) {

      }
    }
  }
</script>

<style scoped>
  .left-module {
    width: 82%;
    height: 100%;
    margin-left: 20px;
    /*border:1px solid rgba(0, 0, 0, 0.1);*/
    margin-top: 11px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  }

  .right-moudle {
    width: 100%;
    height: 100%;
    /*margin-left: 12px;*/
    /*border:1px solid rgba(0, 0, 0, 0.3);*/
  }

  .user-tree {
    /*box-shadow: 4px 4px 4px rgba(0,0,0,0.1);*/
  }

  .search {
    float: left;
    margin-bottom: 20px;
  }

  .input-keyWord {
    width: 180px;
  }


</style>
