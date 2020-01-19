<template>
  <div>
    <div @click="showDraw" class="show_friend_button">
      <li class="iconfont icon-huo" style="list-style: none;font-size: 24px;margin-top: 10px;margin-bottom: 4px"></li>
      V友
    </div>
    <el-drawer
      title="V友列表"
      :visible.sync="drawerIsShow"
      :direction="direction"
      :before-close="drawerHandleClose"
      size="240px"
      :modal="false"
      custom-class="vfriend_drawer"
      class="vfriend_drawer">
      <el-col>
        <div style="text-align: center">
          <el-row style="font-size: 20px;font-weight: bolder;margin-bottom: 4px">{{userForm.userName}}
            <li class="iconfont icon-huo" style="margin-left: 2px"></li>
          </el-row>
          <el-row style="font-size: 13px;margin-bottom: 10px;font-style: italic">Lv{{userForm.userLevel}}</el-row>
        </div>
        <el-row v-for="item in vfriendList" :key="item.userId" class="vfriend_list_item">
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
      :title="chatBox.title"
      :visible.sync="dialogIsShow"
      width="30%"
      :before-close="dialogHandleClose"
      class="chatbox">
      <Scroll height="500">
        <div class="chatbox_msg" v-for="item in chatBox.msgList" :key="item.mcgId">
          <div class="chatbox_msg_item left"
               :class="item.direction == 'left' ? 'chatbox_msg_left' : 'chatbox_msg_right'">
            <el-row>
              <el-col :span="3">
                <el-avatar :src="item.userAvatar">
                </el-avatar>
              </el-col>
              <el-col :span="10">
                <el-row>
                  <p style="font-size:10px">{{item.createTime}}</p>
                </el-row>
                <el-row>
                  <el-input
                    class="chatbodex_msg_content"
                    v-model="item.msgContent"
                    :disabled="true"
                    :autosize="{minRows:1,maxRows:3}"
                    type="textarea">
                  </el-input>
                </el-row>
              </el-col>
            </el-row>
            <!--            <div class="chatbodex_msg_content"></div>-->
          </div>
        </div>
      </Scroll>
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 4}"
        placeholder="请输入内容"
        v-model="chatBox.sendMsg"
        class="chatbox_text_in_model"
        @keydown.native.enter.prevent="doSend($event)">
      </el-input>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "ChatBox",
        props: ["userForm"],
        data() {
            return {
                vfriendList: [
                    {
                        userName: "1234",
                        userStatus: false,
                        userLevel: 12,
                        userId: "usyQO9QoGumadi20191108153809"
                    },
                    {
                        userName: "老张",
                        userStatus: true,
                        userLevel: 12,
                        userId: "123"
                    }
                ],
                fromUserInfo: {
                    userId: "",
                    userName: "",
                    userAvatar: ""
                },
                drawerIsShow: true,
                dialogIsShow: false,
                defaultActive: "1",
                direction: 'rtl',
                disabled: true,
                openDelay: 2000,
                placement: "left",
                socket: undefined,
                chatBox: {
                    title: "",
                    sendMsg: "",
                    toUserId: "",   //todo 这里可能是单用户id或是群聊
                    msgList: [],
                },

            }
        },
        mounted() {
            this.getSocket()
        },
        methods: {
            async getSocket() {
                const that = this
                this.socket = new WebSocket("ws://localhost:9888/ws")
                this.socket.onopen = function () {
                    console.log("连接成功")
                    that.fromUserInfo.userId = that.$route.query.userId
                    that.socket.send("WS/x/" + "INIT/x/" + JSON.stringify(that.fromUserInfo) + "/x//x/" + "connection");
                }
                this.socket.onmessage = function (data) {
                    console.log("接收到数据:",JSON.parse(data.data))
                    let getMsg = JSON.parse(data.data)
                    that.chatBox.msgList.push({
                        userName: getMsg.baseMsgUserInfo.userName,
                        userAvatar: getMsg.baseMsgUserInfo.userAvatar,
                        createTime: new Date().format("yyyy-MM-dd hh:mm:ss"),
                        msgContent: getMsg.msgContent,
                        mcgId: that.openDelay++,
                        direction: "left",
                    })
                }

                this.socket.onerror = function () {
                    console.log("webSocket连接发生错误")
                }
            },

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
                this.dialogIsShow = true;
                console.log(row);
                this.chatBox.title = row.userName;
                this.disabled = true;
                this.chatBox.toUserId = row.userId;
            },

            /**
             * 关闭用户对话框
             * */
            dialogHandleClose() {
                this.dialogIsShow = false
                this.disabled = false
            },

            load() {

            },

            /**
             * 发送消息
             * */
            doSend(event) {
                this.chatBox.msgList.push({
                    userName: this.userForm.userName,
                    userAvatar: this.userForm.userAvatar,
                    createTime: new Date().format("yyyy-MM-dd hh:mm:ss"),
                    msgContent: this.chatBox.sendMsg,
                    mcgId: this.openDelay++,
                    direction: "right",
                })

                this.fromUserInfo = {
                    userId: this.userForm.userId,
                    userName: this.userForm.userName,
                    userAvatar: this.userForm.userAvatar
                }

                this.socket.send("WS/x/" + "SINGLE/x/" + JSON.stringify(this.fromUserInfo) + "/x/" + this.chatBox.toUserId + "/x/" + this.chatBox.sendMsg);
                this.chatBox.sendMsg = ""


            }
        }
    }
</script>

<style scoped>
  .show_friend_button {
    width: 30px;
    height: 130px;
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

  .vfriend_drawer /deep/ .rtl {
    border-left: 2px solid rgba(0, 0, 0, 0.1) !important;
    border-bottom-left-radius: 16px;
    border-top-left-radius: 16px;
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

  .el-dialog__wrapper /deep/ .el-dialog__header {
    text-align: left !important;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1) !important;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  }

  .chatbox /deep/ .el-dialog__body {
    padding: 0px !important;
  }

  .chatbox_text_show_model {
    min-height: 400px;
    overflow: auto;
    border-bottom: 1px solid gray;
    margin-left: auto;
    margin-right: auto;
    border-top: 1px solid gray;
  }

  .chatbox_msg_item {
    margin-top: 20px;
    height: 80px;
  }

  .chatbox_msg_right, .chatbox_msg_left {
    width: 100%;
    min-height: 40px;
    margin-top: 20px;
  }

  .chatbox_msg_right div, .chatbox_msg_right span {
    float: right;
    margin-right: 2px;
  }

  .chatbox_msg_left div, .chatbox_msg_left span {
    float: left;
    margin-left: 2px;
  }

  .chatbodex_msg_content {
    width: 280px;
  }

  .top, .bottom {
    text-align: center;
  }

  .center {
    width: 300px;
    margin: 10px auto;
    overflow: hidden;
  }

  .center-left {
    float: left;
  }

  .center-right {
    float: right;
  }

</style>
