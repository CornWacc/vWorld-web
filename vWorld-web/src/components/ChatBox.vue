<template>
  <div>
    <div @click="showDraw" class="show_friend_button">
      <li class="iconfont icon-huo" style="list-style: none;font-size: 24px;margin-top: 10px;margin-bottom: 10px"></li>
      V友
    </div>
    <el-drawer
      title="V友列表"
      :visible.sync="drawerIsShow"
      :direction="direction"
      :before-close="drawerHandleClose"
      size="200px"
      :modal="false"
      class="vfriend_drawer">
      <el-col>
        <div style="text-align: center">
          <el-row style="font-size: 20px;font-weight: bolder;margin-bottom: 4px">CornWacc
            <li class="iconfont icon-huo" style="margin-left: 2px"></li>
          </el-row>
          <el-row style="font-size: 13px;margin-bottom: 10px;font-style: italic">Lv24</el-row>
        </div>
        <el-row v-for="item in vfriendList" class="vfriend_list_item">
          <div @click="showChatBox(item)">
            <li class="vfriend_list_name">
              {{item.userName}}
            </li>
            <li class="vfriend_list_level">
              Lv:{{item.userLevel}}
            </li>
            <el-tag class="vfriend_list_status" :type="item.userStatus ? 'success' : 'info'" size="mini">
              {{item.userStatus ? '在线' : '离线'}}
            </el-tag>
          </div>
        </el-row>
      </el-col>
    </el-drawer>

    <el-dialog
      :modal="false"
      :title="chatBox.tital"
      :visible.sync="dialogIsShow"
      width="30%"
      :before-close="dialogHandleClose"
      class="chatbox">
      <div class="chatbox_text_show_model">
        <div class="chatbox_msg" v-for="item in chatBox.msgList">
          <div class="chatbox_msg_item" :class="item.direction == 'left' ? 'chatbox_msg_left' : 'chatbox_msg_right'">
            <el-avatar>
            </el-avatar>
            <div class="chatbodex_msg_content" style="display: inline-block">123</div>
          </div>
        </div>
      </div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 4}"
        placeholder="请输入内容"
        v-model="chatBox.sendMsg"
        class="chatbox_text_in_model"
        @keyup.native.enter="doSend">
      </el-input>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "ChatBox",
        data() {
            return {
                vfriendList: [
                    {
                        userName: "TTTTTTTT",
                        userStatus: false,
                        userLevel: 12
                    },
                    {
                        userName: "TTTTTTTT",
                        userStatus: true,
                        userLevel: 12
                    }
                ],
                chatBox: {
                    tital: "",
                    sendMsg: "",
                    msgList: [
                        {
                            userName: "",
                            createTime: "",
                            msgContent: "",
                            mcgId: "",
                            direction: "left",
                        },
                        {
                            userName: "",
                            createTime: "",
                            msgContent: "",
                            mcgId: "",
                            direction: "right",
                        }
                    ],
                },
                drawerIsShow: true,
                dialogIsShow: false,
                defaultActive: "1",
                direction: 'rtl',

            }
        },
        methods: {

            errorHandler() {
            },

            /**
             * 显示好友列表
             * */
            showDraw() {
                this.drawerIsShow = true
            },
            drawerHandleClose() {
                this.drawerIsShow = false
            },

            /**
             * 显示用户对话框
             * */
            showChatBox(row) {
                console.log(1)
                this.dialogIsShow = true
                console.log(row)
                this.chatBox.tital = row.userName;
            },

            /**
             * 关闭用户对话框
             * */
            dialogHandleClose() {
                this.dialogIsShow = false
            },
            doSend() {

            }

        }
    }
</script>

<style scoped>
  .show_friend_button {
    width: 30px;
    height: 110px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: fixed;
    right: 0px;
    top: 50%;
    margin-top: -120px;
    font-size: 20px;
    font-weight: bolder;
    border-radius: 16px;
    padding: 2px;
    margin-right: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    text-align: center;
  }

  .vfriend_drawer >>> li {
    display: inline;
  }

  .vfriend_list_item {
    text-align: left;
    background-color: rgba(0, 0, 0, 0.03);
    margin-top: 10px;
    padding: 8px;
    cursor: pointer;
  }

  .vfriend_list_name {
    display: inline-block;
    font-size: 16px;
  }

  .vfriend_list_status {
    display: block;
    width: 36px;
  }

  .vfriend_list_level {
    position: fixed;
    right: 8px;
    font-size: 12px;
  }

  li {
    list-style: none;
    /*display: inline;*/
  }

  .el-dialog >>> .el-dialog__header {
    text-align: left !important;
  }

  .chatbox /deep/ .el-dialog__body {
    padding: 0px !important;
  }

  .chatbox_text_show_model {
    min-height: 400px;
    border-bottom: 1px solid gray;
    margin-left: auto;
    margin-right: auto;
    border-top: 1px solid gray;
  }

  .chatbox_msg_right, .chatbox_msg_left {
    width: 100%;
    min-height: 40px;
    margin-top: 20px;
  }

  .chatbox_msg_right div, .chatbox_msg_right span {
    float: right;
    margin-right: 4px;
    line-height: 40px;
  }

  .chatbox_msg_left div, .chatbox_msg_left span {
    float: left;
    margin-left: 4px;
    line-height: 40px;
  }

  .chatbox_msg_right .chatbodex_msg_content{
  }

  .chatbodex_msg_content{
    font-size: 20px;
  }
</style>
