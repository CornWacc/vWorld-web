<template>

  <div class="all">
    <el-form :inline="inline" class="search">
      <el-input class="input" v-model="byUserId" placeholder="用户id"></el-input>
      <el-input class="input" v-model="roleLevel" placeholder="权限等级" style="width: 120px"></el-input>
      <el-date-picker
        v-model="time"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-button @click="doSearch" style="margin-left: 6px;margin-right: 6px">Search</el-button>
      <div class="createNewRole">
        <el-button round @click="dialogVisible = true">新增权限</el-button>
      </div>
    </el-form>
    <el-table class="role-table" :data="roleListInfo">
      <el-table-column
        type="index"
        label="序列号"
        width="90px">
      </el-table-column>
      <el-table-column
        prop="roleId"
        label="权限id">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="权限名称">
      </el-table-column>
      <el-table-column
        prop="roleLevel"
        label="权限等级">
      </el-table-column>
      <el-table-column
        prop="roleParentId"
        label="权限父级id"
      >
      </el-table-column>
      <el-table-column
        prop="byUserName"
        label="创建用户"
        width="120px"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        prop="do"
        label="操作"
      >
        <template slot-scope="scope">
          <el-row>
            <el-col>
              <el-button size="mini" type="primary" @click="dialogVisible = true" style="margin-bottom: 4px">编辑
              </el-button>
            </el-col>
            <el-col>
              <el-button size="mini" @click="delUser(scope.row.roleId ,scope.$index)" type="danger"
              >删除
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>


    <el-pagination
      @size-change="handleSizeChange"
      :page-sizes="[5, 10, 20]"
      @current-change="handleCurrentChange"
      background
      layout="sizes, prev, pager, next"
      :total="total"
      :page-size="5">
    </el-pagination>

    <el-dialog
      title="新增权限"
      width="30%"
      :visible.sync="dialogVisible"
    >
      <el-form label-width="80px" :label-position="labelPosition">
        <el-form-item label="权限名称:">
          <el-input placeholder="请输入权限名称" v-model="createRoleName"></el-input>
        </el-form-item>
        <el-form-item label="权限等级:">
          <el-select v-model="createRoleLevel" placeholder="请选择等级" style="width: 100%">
            <el-option
              v-for="item in chooseLevelOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一级权限:" v-if="createRoleLevel != 1 && createRoleLevel != ''">
          <el-select v-model="byOneLevelRoleId" placeholder="请选择所属一级权限" style="width: 100%" @change="selectChange">
            <el-option
              v-for="item in oneLevelOption"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级权限:" v-if="createRoleLevel != 1 && createRoleLevel == 3 && byOneLevelRoleId != ''">
          <el-select v-model="byTwoLevelRoleId" placeholder="请选择所属二级权限" style="width: 100%">
            <el-option
              v-for="item in twoLevelOption"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addNewRole">确 定</el-button>
  </span>
    </el-dialog>
  </div>


</template>

<script>
  export default {
    name: "RoleList",
    data() {
      return {
        roleListInfo: [],
        byUserId: "",
        time: "",
        roleLevel: "",
        inline: true,
        total: 0,
        pageNum: "1",
        pageSize: "5",
        dialogVisible: false,
        createRoleName: "",
        createRoleLevel: "",
        createParentId: "",
        byOneLevelRoleId: "",
        byTwoLevelRoleId: "",
        chooseLevelOption: [{
          value: '1',
          label: '等级1'
        }, {
          value: '2',
          label: '等级2'
        }, {
          value: '3',
          label: '等级3'
        }],
        oneLevelOption: [],
        twoLevelOption: [],
        labelPosition: "left"
      }
    },
    mounted() {
      this.$axios({
        url: this.Globel.requestUrl + "/role/roleListQuery?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize,
        method: "get"
      }).then(res => {
        if (res.data.object.status == "SUCCESS") {
          this.roleListInfo = res.data.object.roleInfosList
          this.total = res.data.object.total
        }
      })
      this.$axios({
        url: this.Globel.requestUrl + "/role/roleListQueryByLevel?roleLevel=3",
        method: "get"
      }).then(res => {
        if (res.data.object.status == "SUCCESS") {
          console.log(res.data.object)
          this.oneLevelOption = res.data.object.levelOneRoleList
          this.twoLevelOption = res.data.object.levelTwoRoleList
        }
      })
    },
    methods: {
      doSearch() {
        console.log(this.time)
        var startTime;
        var endTime;
        if (null != this.time && '' != this.time) {
          startTime = this.time[0];
          endTime = this.time[1];
        } else {
          startTime = "";
          endTime = ""
        }
        this.$axios({
          url: this.Globel.requestUrl + "/role/roleListQuery?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize + "&byUserId=" + this.byUserId + "&roleLevel=" + this.roleLevel + "&createTime=" + startTime + "&endTime=" + endTime,
          method: "get"
        }).then(res => {
          if (res.data.object.status == "SUCCESS") {
            this.roleListInfo = res.data.object.roleInfosList
            this.total = res.data.object.total
          } else {
            this.roleListInfo = []
          }
        })
      },
      handleSizeChange(val) {
        var startTime;
        var endTime;
        if (null != this.time && '' != this.time) {
          startTime = this.time[0];
          endTime = this.time[1];
        } else {
          startTime = "";
          endTime = ""
        }
        this.pageSize = val;
        this.$axios({
          url: this.Globel.requestUrl + "/role/roleListQuery?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize + "&byUserId=" + this.byUserId + "&roleLevel=" + this.roleLevel + "&createTime=" + startTime + "&endTime=" + endTime,
          method: "get"
        }).then(res => {
          if (res.data.object.status == "SUCCESS") {
            this.roleListInfo = res.data.object.roleInfosList
            this.total = res.data.object.total
          }
        })

      },
      handleCurrentChange(val) {
        var startTime;
        var endTime;
        if (null != this.time && '' != this.time) {
          startTime = this.time[0];
          endTime = this.time[1];
        } else {
          startTime = "";
          endTime = ""
        }
        this.pageNum = val;
        this.$axios({
          url: this.Globel.requestUrl + "/role/roleListQuery?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize + "&byUserId=" + this.byUserId + "&roleLevel=" + this.roleLevel + "&createTime=" + startTime + "&endTime=" + endTime,
          method: "get"
        }).then(res => {
          if (res.data.object.status == "SUCCESS") {
            this.roleListInfo = res.data.object.roleInfosList
            this.total = res.data.object.total
          }
        })
      },
      selectChange(r) {
        this.byTwoLevelRoleId = ""
        console.log(r)
        this.$axios({
          url: this.Globel.requestUrl + "/role/roleListQueryBySuperiorId?roleParentId=" + r,
          method: "get"
        }).then(res => {
          console.log(res)
          if (res.data.object.status == "SUCCESS") {
            this.twoLevelOption = res.data.object.roleInfosList
          }
        })
      },
      addNewRole() {
        var parentId = "1"
        if (this.byOneLevelRoleId != '' && this.byOneLevelRoleId != null) {
          parentId = this.byOneLevelRoleId
        }
        if (this.byTwoLevelRoleId != '' && this.byTwoLevelRoleId != null) {
          parentId = this.byTwoLevelRoleId
        }
        this.$axios({
          url: this.Globel.requestUrl + "/role/roleAdd",
          data: {
            roleName: this.createRoleName,
            roleLevel: this.createRoleLevel,
            roleParentId: parentId,
            // byUserId:localStorage.getItem("userId")
            byUserId: "usB6j0MLF6FikEwi"
          },

          method: "post"
        }).then(res => {
          console.log(res)
          if (res.data.object.status == "SUCCESS") {
            this.dialogVisible = false
            this.createRoleName = ""
            this.createRoleLevel = ""
            this.createParentId = ""
            this.byOneLevelRoleId = ""
            this.byTwoLevelRoleId = ""
            this.$axios({
              url: this.Globel.requestUrl + "/role/roleListQueryByLevel?roleLevel=3",
              method: "get"
            }).then(res => {
              if (res.data.object.status == "SUCCESS") {
                console.log(res.data.object)
                this.oneLevelOption = res.data.object.levelOneRoleList
                this.twoLevelOption = res.data.object.levelTwoRoleList
              }
            })
          }
        })

        this.$axios({
          url: this.Globel.requestUrl + "/role/roleListQuery?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize,
          method: "get"
        }).then(res => {
          if (res.data.object.status == "SUCCESS") {
            this.roleListInfo = res.data.object.roleInfosList
            this.total = res.data.object.total
          }
        })
      }
    }
  }
</script>

<style scoped>
  .createNewRole {
    float: right;
    /*margin-top: 20px;*/
  }

  .el-button {
    width: 100px;
    font-size: 8px;
    /*text-align: center;*/

  }

  .input {
    width: 180px;
  }

  .search {
    float: left;
  }

  .el-pagination {
    margin-top: 10px;
  }
</style>
