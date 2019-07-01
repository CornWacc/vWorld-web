<template>
  <div class="main">
    <el-form class="search" :inline="inline">
      <el-select class="search_banner_status" clearable v-model="chooseBannerStatus" placeholder="请选择banner状态">
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
      width="34%"
      :visible.sync="dialogVisible"
      @close="dialogClose"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" :label-position="labelPosition">
        <el-form-item label="图片名称:" prop="addImageName">
          <el-input v-model="ruleForm.addImageName"></el-input>
        </el-form-item>
        <el-form-item label="跳转路径:">
          <el-input v-model="ruleForm.addSkipUrl"></el-input>
        </el-form-item>
        <el-form-item label="上传类型:">
          <el-select style="width: 100%" placeholder="请选择banner上传类型" clearable v-model="ruleForm.addUploadType">
            <el-option
              v-for="item in uploadTypes"
              :key="item.code"
              :label="item.msg"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片地址:" v-if="ruleForm.addUploadType == 'OUTSIDE'" required>
          <el-input v-model="ruleForm.addImageUrl"></el-input>
        </el-form-item>
        <el-form-item label="权重:" prop="addWeight">
          <el-select style="width: 100%" placeholder="请选择banner权重" clearable v-model="ruleForm.addWeight">
            <el-option
              v-for="item in bannerWeights"
              :key="item.code"
              :label="item.msg"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="addWeight">
          <el-switch
            v-model="inline"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="statusChange">
          </el-switch>
        </el-form-item>
        <el-form-item label="图片" v-if="ruleForm.addUploadType == 'LOCAL'"
        >
          <el-upload
            :action="this.Globel.qiNiuUploadUrl"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :data="qiNiuUploadData"
            :on-success="handleUploadSuccess"
            :on-exceed="handleUploadFileOutOfBounds"
            :limit="1">
            <i class="el-icon-plus"></i>

          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="cancelNewBanner">取 消</el-button>
    <el-button type="primary" @click="addNewBanner">确 定</el-button>
  </span>
    </el-dialog>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total" style="margin-top: 30px" :page-size="5" @current-change="pageChange">
    </el-pagination>

    <el-dialog :visible.sync="uploadBannerIsShow">
      <img width="100%" :src="uploadBannerShowUrl" alt="">
    </el-dialog>

  </div>


</template>

<script>
  export default {
    name: "ProductMainBannerBackStage",
    data() {
      return {
        inline: false,
        time: null,
        dialogVisible: false,
        labelPosition: "left",
        ruleForm: {
          addImageName: "",//新增图片名称
          addSkipUrl: "",//新增跳转url
          addUploadType: "",//新增图片上传类型
          addImageUrl: "",//新增图片地址,
          addWeight: "",//权重
        },
        rules: {
          addImageName: [
            {required: true, message: '请输入Banner名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          addWeight: [
            {required: true, message: '请选择权重', trigger: 'blur'},
          ]

        },
        chooseBannerStatus: "", //选择的广告状态
        bannerList: [],
        bannerStatusList: [

          {
            code: "OPEN",
            msg: "开启"
          },
          {
            code: "CLOSE",
            msg: "关闭"
          }
        ],
        uploadTypes: [
          {
            code: "OUTSIDE",
            msg: "外链"
          },
          {
            code: "LOCAL",
            msg: "本地选择"
          }
        ],
        bannerWeights: [
          {
            code: 1,
            msg: "1"
          },
          {
            code: 2,
            msg: "2"
          },
          {
            code: 3,
            msg: "3"
          },
          {
            code: 4,
            msg: "4"
          },
          {
            code: 5,
            msg: "5"
          }
        ],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        uploadBannerIsShow: false,
        uploadBannerShowUrl: "",
        isUploadSuccess: false,
        qiNiuUploadData: {
          token: ""
        }
      }
    },
    mounted() {
      this.$axios({
        url: this.Globel.requestUrl + "/banner/mainBannerListPageQuery",
        method: "GET"
      }).then(res => {
        console.log(res)
        if (res.data.object.status == this.Globel.defaultRequestStatus) {
          this.bannerList = res.data.object.pageEntity.pageList;
          this.total = res.data.object.pageEntity.total;
        }
      })
      this.$axios({
        url: this.Globel.requestUrl + "/getQiNiuToken",
        method: "GET"
      }).then(res => {
        console.log(res);
        this.qiNiuUploadData.token = res.data.msg
      })
    },
    methods: {

      //新增banner
      addNewBanner() {

      },

      //撤销banner上传
      cancelNewBanner() {
        this.dialogVisible = false;
        this.ruleForm.addUploadType = "";
        this.uploadBannerShowUrl = "";
      },

      //点击搜索
      doSearch() {
        var startTime = "";
        var endTime = "";
        if (this.time != null) {
          startTime = this.time[0];
          endTime = this.time[1];
        }
        // console.log(this.chooseBannerStatus)
        this.$axios({
          url: this.Globel.requestUrl + "/banner/mainBannerListPageQuery?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize + "&startTime=" + startTime + "&endTime=" + endTime + "&mainBannerStatus=" + this.chooseBannerStatus,
          method: "GET"
        }).then(res => {
          if (res.data.object.status == this.Globel.defaultRequestStatus) {
            this.bannerList = res.data.object.pageEntity.pageList
            this.total = res.data.object.pageEntity.total;
          }
        })
      },

      pageChange(pageNum) {
        console.log(pageNum)
        this.pageNum = pageNum;
        var startTime = "";
        var endTime = "";
        if (this.time != null) {
          startTime = this.time[0];
          endTime = this.time[1];
        }
        // console.log(this.chooseBannerStatus)
        this.$axios({
          url: this.Globel.requestUrl + "/banner/mainBannerListPageQuery?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize + "&startTime=" + startTime + "&endTime=" + endTime + "&mainBannerStatus=" + this.chooseBannerStatus,
          method: "GET"
        }).then(res => {
          if (res.data.object.status == this.Globel.defaultRequestStatus) {
            this.bannerList = res.data.object.pageEntity.pageList
            this.total = res.data.object.pageEntity.total;
          }
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },

      //显示上传图片
      handlePictureCardPreview(file) {
        console.log(file)
        this.uploadBannerIsShow = true
        this.uploadBannerShowUrl = file.url;
      },

      //banner上传成功时
      handleUploadSuccess(file) {
        console.log(file)
      },

      //超过一张选择的banner时
      handleUploadFileOutOfBounds() {
        this.$message({
          showClose: true,
          message: '一次只能选择一张进行上传'
        });
      },

      //上传的banner状态转换
      statusChange(status) {
      },

      dialogClose() {
        this.$refs["ruleForm"].resetFields();
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
