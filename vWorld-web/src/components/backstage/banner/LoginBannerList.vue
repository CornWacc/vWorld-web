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
        v-model="searchTime"
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
        width="70px"
        fixed
      >
      </el-table-column>
      <el-table-column
        prop="loginBannerId"
        label="广告图片Id"
      >
      </el-table-column>
      <el-table-column
        prop="loginBannerName"
        label="广告图片名称"
      >
      </el-table-column>
      <el-table-column
        prop="skipUrl"
        label="跳转路径">
      </el-table-column>
      <el-table-column
        prop="uploadType"
        label="上传类型">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        prop="loginBannerUrl"
        label="查看"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="bottom" width="300">
            <el-image :src="scope.row.loginBannerUrl"></el-image>
            <p>{{scope.row.loginBannerUrl}}</p>
            <el-button type="primary" slot="reference" plain>查看</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="loginBannerStatus"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.loginBannerStatus == '开启'">{{scope.row.loginBannerStatus}}
          </el-tag>
          <el-tag v-else type="danger">{{scope.row.loginBannerStatus}}
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
              <el-button size="mini" @click="delMainBanner(scope.row.loginBannerId ,scope.$index)" type="danger"
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
        <el-form-item label="图片名称:" prop="loginBannerName">
          <el-input v-model="ruleForm.loginBannerName"></el-input>
        </el-form-item>
        <el-form-item label="跳转路径:">
          <el-input v-model="ruleForm.skipUrl"></el-input>
        </el-form-item>
        <el-form-item label="上传类型:" prop="uploadType">
          <el-select style="width: 100%" placeholder="请选择banner上传类型" clearable v-model="ruleForm.uploadType">
            <el-option
              v-for="item in uploadTypes"
              :key="item.code"
              :label="item.msg"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片地址:" v-if="ruleForm.uploadType == 'OUTSIDE'" required>
          <el-input v-model="ruleForm.loginBannerUrl"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="loginBannerStatus">
          <el-switch
            v-model="ruleForm.loginBannerStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="statusChange"
            active-value="OPEN"
            inactive-value="CLOSE">
          </el-switch>
        </el-form-item>
        <el-form-item label="图片" v-if="ruleForm.uploadType == 'LOCAL'"
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
      :total="total" style="margin-top: 30px" :page-size="10" @current-change="pageChange">
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
                searchTime: null,
                dialogVisible: false,
                labelPosition: "left",
                ruleForm: {
                    loginBannerName: "", //新增图片名称
                    skipUrl: "", //新增跳转url
                    uploadType: "", //新增图片上传类型
                    loginBannerUrl: "", //新增图片地址,
                    qiNiuUploadCallBack: "", //七牛回调hash值
                    loginBannerStatus: "CLOSE" //banner状态
                },
                rules: {
                    loginBannerName: [
                        {required: true, message: '请输入Banner名称', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    uploadType: [{
                        required: true, message: "请选择上传类型"
                    }]
                },
                chooseBannerStatus: "", //选择的广告状态
                bannerList: [], //banner列表
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
                pageNum: 1, //页码
                pageSize: 10, //每页大小
                total: 0, //总条数
                uploadBannerIsShow: false,  //上传部件是否显示
                uploadBannerShowUrl: "",
                qiNiuUploadData: {
                    token: "",
                    callBackHash: ""
                }
            }
        },
        mounted() {
            this.$axios({
                url: this.Globel.requestUrl + "/banner/loginBannerListPageQuery?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize,
                method: "GET",

            }).then(res => {
                if (res.data.success) {
                    this.bannerList = res.data.data.pageEntity.pageList;
                    this.total = res.data.data.pageEntity.total;
                }
            })
            this.$axios({
                url: this.Globel.requestUrl + "/getQiNiuToken",
                method: "GET"
            }).then(res => {
                this.qiNiuUploadData.token = res.data.data
            })
        },
        methods: {

            //新增banner
            addNewBanner() {

                console.log(this.ruleForm)
                this.$axios({
                    url: this.Globel.requestUrl + "/banner/loginBannerAdd",
                    method: "post",
                    data: this.ruleForm
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        this.dialogVisible = false;

                        //清空输入框
                        this.ruleForm.uploadType = "";
                        this.ruleForm.loginBannerUrl = "";
                        this.ruleForm.loginBannerName = "";
                        this.ruleForm.skipUrl = "";

                        //reload
                        this.$axios({
                            url: this.Globel.requestUrl + "/banner/loginBannerListPageQuery?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize,
                            method: "GET"
                        }).then(res => {
                            if (res.data.success) {
                                this.bannerList = res.data.data.pageEntity.pageList;
                                this.total = res.data.data.pageEntity.total;
                            }
                        })
                    } else {
                        this.$message(res.data.msg)
                    }
                })
            },

            //撤销banner上传
            cancelNewBanner() {
                this.dialogVisible = false;
                this.ruleForm.addUploadType = "";
                this.uploadBannerShowUrl = "";
            },

            //点击搜索
            doSearch() {
                this.queryMainBannerList()
            },

            pageChange(pageNum) {
                console.log(pageNum)
                this.pageNum = pageNum;
                this.queryMainBannerList()
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
                this.ruleForm.qiNiuUploadCallBack = file.hash
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
                console.log(status)
                this.ruleForm.mainBannerStatus = status
            },

            //对话框关闭
            dialogClose() {
                this.$refs["ruleForm"].resetFields();
            },

            /**
             * @param mainBannerId 主页id
             * @param index 下标
             * */
            delMainBanner(mainBannerId, index) {
                this.$axios({
                    url: this.Globel.requestUrl + "/banner/mainBannerDel",
                    method: "post",
                    data: {
                        mainBannerId: mainBannerId
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.queryMainBannerList()
                    } else {
                        this.$message(res.data.msg)
                    }
                })
            },

            /**
             * 查询登陆广告列表
             * */
            queryMainBannerList() {
                var startTime = "";
                var endTime = "";
                if (this.searchTime != null) {
                    startTime = this.searchTime[0];
                    endTime = this.searchTime[1];
                }
                this.$axios({
                    url: this.Globel.requestUrl + "/banner/loginBannerListPageQuery?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize + "&startTime=" + startTime + "&endTime=" + endTime + "&mainBannerStatus=" + this.chooseBannerStatus,
                    method: "GET"
                }).then(res => {
                    if (res.data.success) {
                        this.bannerList = res.data.data.pageEntity.pageList
                        this.total = res.data.data.pageEntity.total;
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
