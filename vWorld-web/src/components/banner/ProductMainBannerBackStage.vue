<template>
  <div class="main">
    <el-form class="search" :inline="inline">
      <el-select class="search_banner_status" clearable v-model="chooseBannerStatus"  placeholder="请选择banner状态">
        <el-option
          v-for="item in bannerStatusList"
          :key="item.code"
          :label="item.msg"
          :value="item.code">
        </el-option>
      </el-select>
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
      <el-button @click="doSearch" style="margin-left: 6px;">搜索</el-button>
      <el-button @click="dialogVisible = true" style="margin-left: 6px;margin-right: 6px">新增</el-button>
    </el-form>
    <el-table class="banner-table" :data="bannerList" :stripe="true">
      <el-table-column
        type="index"
        label="序列号"
        width="80px"
        fixed
      >
      </el-table-column>
      <el-table-column
        prop="mainBannerId"
        label="广告图片Id">
      </el-table-column>
      <el-table-column
        prop="mainBannerName"
        label="广告图片名称">
      </el-table-column>
      <el-table-column
        prop="mainBannerUrl"
        label="广告图片Url">
      </el-table-column>
      <el-table-column
        prop="skipUrl"
        label="跳转路径">
      </el-table-column>
      <el-table-column
        prop="weight"
        label="广告权重">
      </el-table-column>
      <el-table-column
        prop="uploadType"
        label="上传类型">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mainBannerStatus"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.mainBannerStatus == '开启'">{{scope.row.mainBannerStatus}}

          </el-tag>
          <el-tag v-else type="danger">{{scope.row.mainBannerStatus}}

          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="do"
        label="操作"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-row>
            <el-col>
              <el-button size="mini" @click="updateMainBanner(scope.row.roleId ,scope.$index)" type="primary"
              >编辑
              </el-button>
            </el-col>
            <el-col>
              <el-button size="mini" @click="delMainBanner(scope.row.roleId ,scope.$index)" type="danger"
                         style="margin-top: 8px"
              >删除
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增主页Banner"
      width="30%"
      :visible.sync="dialogVisible"
    >
      <el-form :model="ruleForm" label-width="80px" :label-position="labelPosition">
        <el-form-item label="图片名称:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="跳转路径:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="权重:">
          <el-input></el-input>
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
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addNewBanner">确 定</el-button>
  </span>
    </el-dialog>
  </div>


</template>

<script>
  export default {
    name: "ProductMainBannerBackStage",
    data() {
      return {
        inline: true,
        time: null,
        dialogVisible: false,
        labelPosition: "left",
        ruleForm: {},
        chooseBannerStatus: "", //选择的广告状态
        bannerList: [],
        bannerStatusList:[

          {
            code:"OPEN",
            msg:"开启"
          },
          {
            code:"CLOSE",
            msg:"关闭"
          }
        ],
        pageNum:1,
        pageSize:10
      }
    },
    mounted() {
      this.$axios({
        url: this.Globel.requestUrl + "/banner/mainBannerListPageQuery",
        method: "GET"
      }).then(res => {
        console.log(res)
        if (res.data.object.status == this.Globel.defaultRequestStatus) {
          this.bannerList = res.data.object.pageEntity.pageList
        }
      })
    },
    methods: {
      addNewBanner() {

      },
      doSearch() {
        var startTime = "";
        var endTime = "";
        if(this.time != null){
          startTime = this.time[0];
          endTime = this.time[1];
        }
        // console.log(this.chooseBannerStatus)
        this.$axios({
          url:this.Globel.requestUrl+"/banner/mainBannerListPageQuery?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&startTime="+startTime+"&endTime="+endTime+"&mainBannerStatus="+this.chooseBannerStatus,
          method:"GET"
        }).then(res =>{
          if(res.data.object.status == this.Globel.defaultRequestStatus){
            this.bannerList = res.data.object.pageEntity.pageList
          }
        })
      }
    }
  }
</script>

<style scoped>
  .search_banner_status {
    width: 180px;
    margin-right: 10px;
  }

  .search {
    float: left;
    margin-bottom: 20px;
  }
</style>
