<template>

  <div class="all">
    <el-table class="role-table">
      <el-table-column
        type="index"
        width="120"
      label="序列号">
      </el-table-column>
      <el-table-column
        prop="roleId"
        label="权限id"
        width="160">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="权限名称"
        width="160">
      </el-table-column>
      <el-table-column
        prop="roleLevel"
        label="权限等级"
        width="140">
      </el-table-column>
      <el-table-column
        prop="roleParentId"
        label="权限父级id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createUserName"
        label="创建用户"
        width="160">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="do"
        label="操作"
        width="140">
      </el-table-column>
    </el-table>

    <div class="createNewRole"><el-button round>新增权限</el-button></div>

  </div>

</template>

<script>
    export default {
        name: "RoleList"
    }
</script>

<style scoped>
  .createNewRole{
    float: right;
    margin-top: 20px;
  }
  .el-button{
    width: 100px;
    font-size: 8px;
    /*text-align: center;*/

  }
</style>
