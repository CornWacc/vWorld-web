<template>
  <el-container class="all">
    <el-table class="role-table" :data="roleListInfo" align="center">
      <el-table-column
        type="index"
        label="序列号"
        width="140">
      </el-table-column>
      <el-table-column
        prop="videoId"
        label="视频Id">
      </el-table-column>
      <el-table-column
        prop="videoName"
        label="视频名称">
      </el-table-column>
      <el-table-column
        prop="videoRemark"
        label="视频简介">
      </el-table-column>
      <el-table-column
        prop="createUser"
        label="视频创建人"
      >
      </el-table-column>
      <el-table-column
        prop="videoStatus"
        label="视频状态"
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
              <el-button size="mini" @click="delRole(scope.row.roleId ,scope.$index)" type="danger"
              >删除
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
    export default {
        name: "VideoList"
    }
</script>

<style scoped>

</style>
