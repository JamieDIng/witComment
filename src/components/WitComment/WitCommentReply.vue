<template>
  <div>
    <div
      class="wit-comment-reply"
      v-bind:class="{ 'reply-active': replyActive }"
    >
      <div class="commentInput">
        <el-input
          class="commentTextarea"
          type="textarea"
          autosize
          :placeholder="placeholder"
          :data-replyid="dataReplyid"
          resize="none"
          v-model="message"
          ref="onFocus"
          @input="inputMessage"
          @blur="blurMessage"
          @focus="focusMessage"
        >
        </el-input>
        <div class="commentSmile">
          <el-tooltip
            class="item"
            data-type="image"
            effect="dark"
            :open-delay="300"
            content="插入图片"
            placement="bottom"
          >
            <el-button
              class="iconButton"
              type="text"
              icon="el-icon-picture-outline-round"
              @mousedown.native="inputTools($event)"
            ></el-button>
          </el-tooltip>

          <el-popover placement="top" width="298" trigger="click">
            <comment-smile></comment-smile>
            <el-tooltip
              class="item"
              :open-delay="300"
              effect="dark"
              content="插入表情"
              placement="bottom"
              slot="reference"
            >
              <el-button
                data-type="smile"
                class="iconButton"
                @mousedown.native="inputTools($event)"
                type="text"
                icon="el-icon-s-help"
              ></el-button>
            </el-tooltip>
          </el-popover>
        </div>
      </div>

      <el-button
        :class="['commentButton', isInput ? 'self-end' : '']"
        type="primary"
        :disabled="onButton"
        :data-replyid="dataReplyid"
        size="small"
        @mousedown.native="commentPublish($event)"
        >发布</el-button
      >
    </div>

    <div class="commentInfo">
      按下键盘 s 快速进入回复 / Enter 换行，支持Emoji表情
    </div>
  </div>
</template>
<script>
import commentSmile from "./WitCommentSmilies.vue";
import eventBus from "../../common/js/eventBus";
import axios from "axios";
export default {
  name: "Reply",
  props: ["placeholder","data-replyid"],
  data() {
    return {
      message: "",
      onButton: true,
      showButton: false,
      isInput: false,
      replyActive: false,
      toolTipShow: false,
    };
  },
  components: {
    commentSmile,
  },
  methods: {
    smileCallBack() {
      let _this = this;
      eventBus.$on("onSmile", function (event) {
        // console.log("onSmile", event);
        _this.message += event;
        _this.$nextTick(() => {
          _this.$refs.onFocus.focus();
        });
      });
    },
    inputTools(event) {
      event.preventDefault();
      let toolTip = document.querySelectorAll("div[id^=el-tooltip-]");
      let type = event.target.parentElement.dataset["type"];
      toolTip.forEach((element) => {
        element.remove();
      });

      if (type == "smile") {
        // let html = document.createElement('div');
        // console.log("打开表情");
        // event.target.appnode
        // event.target.parentElement.innerHTML = html;
      } else if (type == "image") {
        // console.log("上传图片");
      }
    },
    inputMessage(e) {
      if (e.indexOf("\n") >= 0) {
        this.isInput = true;
      } else {
        this.isInput = false;
      }
      if (e.length !== 0) {
        this.onButton = false;
      } else {
        this.onButton = true;
      }
    },
    blurMessage() {
      //隐藏
      if (!this.message.length) {
        this.showButton = false;
        this.showButton = false;
        this.replyActive = false;
      }

      // console.log("blur", this.message, this.isInput);
    },
    focusMessage() {
      //显示
      this.replyActive = this.showButton = true;
      this.message.length > 0
        ? (this.onButton = false)
        : (this.onButton = true);
      // console.log("显示", this.message.length);
    },
    commentPublish(event) {
      event.preventDefault();
      // console.log(event.currentTarget.parentElement.querySelector('textarea').dataset['replyid'])
      let that = this;
      if (this.message.length < 3) {
        this.$message({
          showClose: true,
          message: "内容不能为空，且大于3个字符",
          type: "error",
        });
        return;
      }
      axios
        .post("/reply", {
          //模拟个登录用户
          params: {
            total: this.message.length,
            userId: 1,
            userName: "DIng",
            isAuthor: true,
            message: this.message,
            "replyPostId": event.currentTarget.dataset.replyid, //被回复回复ID
            "replyUserId": 21404, // 被回复用户
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            console.log('response',response);
            eventBus.$emit("commentButton", response.data.data[0]);
            that.showButton = false;
            that.message = "";
            that.showButton = false;
            that.replyActive = false;
          }
          console.log('error',response.data.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    conmmentS() {
      let that = this;
      document.addEventListener("keyup", function (e) {
        if (e.keyCode === 83) {
          if(!that.$nextTick) return;
          that.$nextTick(function () {
            that.$refs["onFocus"].focus();
            // document.querySelector(".el-textarea__inner").focus();
          });
        }
      });
    },
  },
  mounted() {
    let iconButton = document.querySelectorAll(".iconButton");
    iconButton.forEach((item, index) => {
      item.onclick = function () {
        console.log("插入表情", index);
      };
    });
    this.conmmentS();
    this.smileCallBack();
  },
  beforeDestroy() {
    eventBus.$off("commentButton");
    eventBus.$off("onSmile");
  },
  computed: {
    // changeValue () {
    //   return console.log(this.message)
    // }
  },
  watch: {
    message() {
      // this.replyActive = true;
      // return console.log(this.message.length)
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/main.scss";
.commentInfo {
  width: 100%;
  display: block;
  font-size: 14px;
  color: rgb(160, 160, 160);
  padding-top: $ms;
}
.wit-comment-reply {
  position: relative;
  // display: flex;
  .commentInput {
    display: flex;
    flex: 1;
    margin-right: 0px;
    transition: padding-right 0.3s ease;
    ::v-deep .el-textarea__inner {
      margin: 0;
      padding: 5px 60px 5px 15px;
    }
    .commentSmile {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 1px 0 1px -61px;
      z-index: 9;
      border-radius: 0px 4px 4px 0px;
      background-color: #f6f6f6;
      padding: 0 6px;
      .el-button--text {
        color: #8590a6;
        font-size: 16px;
        padding: 0 4px;
      }
      .iconButton {
        margin: 0;
        border: 0;
      }
    }
  }

  .commentButton {
    height: 100%;
    right: 0;
    bottom: 0;
    background-color: rgb(0, 102, 255);
    border-color: rgb(0, 102, 255);
    position: absolute;
    margin-left: $ml;
    transform: scale(0);
    transition: opacity 0.3s ease, transform 0.3s ease,
      -webkit-transform 0.3s ease;
    &.self-end {
      height: auto !important;
    }
    &:disabled {
      opacity: 0.5;
      cursor: auto;
      &:hover {
        background-color: rgb(0, 102, 255);
        border-color: rgb(0, 102, 255);
      }
    }
  }

  &.reply-active {
    display: flex;
    .commentInput {
      flex: 1 1;
      padding-right: (56 + $ml);
      .commentSmile {
        background-color: transparent;
        border-color: #eee;
      }
    }
    .commentButton {
      transform: scale(1);
    }
  }
}
</style>