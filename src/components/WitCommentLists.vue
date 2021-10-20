<template>
  <div>
    <div v-if="type === 'hots'" class="wit-comment-items">
      <div class="comment-title">精彩评论 ( 4 )</div>

      <!-- 热评 -->
    </div>
    <div v-else class="wit-comment-items">
      <div class="comment-title">评论 ( {{ commentData.length }} )</div>
      <el-pagination
        v-if="commentPlacement == 'top'"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        class="pagination"
        layout="sizes, prev, pager, next"
        :total="commentData.length"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="limit"
      >
      </el-pagination>
      <div
        v-for="(item, index) in commentDatas"
        :key="item.id"
        :data-id="item.id"
        class="wit-comment-item"
      >
        <div class="wit-comment-inner">
          <div class="wit-comment-header">
            <el-popover
              :open-delay="300"
              :visible-arrow="false"
              placement="bottom-start"
              popper-class="popperUserCard"
              transition="fade-in-linear"
              trigger="hover"
              width="360"
            >
              <!-- 会员卡片 -->
              <div class="userCard">
                <!-- 骨架 -->
                <el-skeleton :loading="loading" :throttle="500" animated>
                  <template slot="template">
                    <el-skeleton-item
                      style="width: 240px; height: 240px"
                      variant="image"
                    />
                    <div style="padding: 14px">
                      <el-skeleton-item style="width: 50%" variant="h3" />
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          justify-items: space-between;
                          margin-top: 16px;
                          height: 16px;
                        "
                      >
                        <el-skeleton-item
                          style="margin-right: 16px"
                          variant="text"
                        />
                        <el-skeleton-item style="width: 30%" variant="text" />
                      </div>
                    </div>
                  </template>
                  <template>
                    <div class="userCard-cover"></div>
                    <el-avatar
                      :size="70"
                      class="userCard-avatar"
                      shape="square"
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    ></el-avatar>
                    <div class="userCard-info">
                      <div class="infoHeader">
                        姓名 <i class="el-icon-platform-eleme verify-icon"></i>
                      </div>
                      <div class="infoBody">一群不安分的实验室检测工程师</div>
                      <div class="infoVerify">
                        <i class="el-icon-platform-eleme verify-icon"></i>
                        已认证的官方帐号
                      </div>
                      <div class="infoFooter">
                        <div class="infoCount">
                          <div class="number">
                            <div class="numberName">回复</div>
                            <div class="numberValue">
                              {{ 2363 | numberKibt }}
                            </div>
                          </div>
                          <div class="number">
                            <div class="numberName">文章</div>
                            <div class="numberValue">{{ 63 | numberKibt }}</div>
                          </div>
                          <div class="number">
                            <div class="numberName">关注者</div>
                            <div class="numberValue">
                              {{ 12345678 | numberKibt }}
                            </div>
                          </div>
                        </div>
                        <div class="infoButton">
                          <el-button type="primary" size="mini">关注</el-button>
                          <el-button size="mini">查看</el-button>
                        </div>
                      </div>
                    </div>
                  </template>
                </el-skeleton>
                <!-- 骨架 -->
              </div>

              <div slot="reference" class="wit-comment-avatar">
                <el-avatar
                  :size="avatarSize"
                  :src="item.avatar"
                  class="avatar"
                  shape="square"
                ></el-avatar>
              </div>
            </el-popover>

            <div class="wit-comment-author">
              {{ item.userName }}
              <span v-if="item.isAuthor">(作者)</span>
            </div>
            <div
              class="wit-comment-time"
              data-clipboard-action="copy"
              data-clipboard-text="网址"
              @click="copyFloor(index)"
            >
              {{ item.createdTime }}
              {{ index + 1 == 1 ? "沙发" : index + 1 + "楼" }}
            </div>
          </div>
          <div class="wit-comment-content">
            <div
              class="commentText"
              v-html="$options.filters.EmoticonDecode(item.content)"
            >
              {{ item.content | EmoticonDecode }}
            </div>
          </div>
          <div class="wit-comment-meta">
            <button
              class="metaButton"
              @click="onLikeThis(index, item.id, $event)"
            >
              <i class="el-icon-caret-top"></i
              ><span class="buttonText">点赞</span>
              <span>{{ item.likeCount | numberKibt }}</span>
            </button>
            <button class="metaButton">
              <i class="el-icon-chat-line-square"></i> 查看回复
            </button>
            <button class="metaButton" @click="reply(item.id, $event)">
              <i class="el-icon-chat-dot-square"></i>回复
              {{ item.replyCount | numberKibt }}
            </button>
            <button
              class="metaButton"
              @click="unLikeThis(index, item.id, $event)"
            >
              <i class="el-icon-caret-bottom"></i
              ><span class="buttonText">踩</span>
            </button>
            <button class="metaButton">
              <i class="el-icon-s-flag"></i> 举报
            </button>
            <button class="metaButton" @click="deleteReply(index, item.id)">
              <i class="el-icon-delete"></i>删除
            </button>
          </div>
        </div>
      </div>

      <el-pagination
        v-if="commentPlacement == 'bottom'"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        class="pagination"
        layout="sizes, prev, pager, next"
        :total="commentData.length"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="limit"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line
import mock from "../api/mock";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import axios from "axios";
import eventBus from "../common/js/eventBus";
// eslint-disable-next-line
// import filters from "../common/js/filters";

export default {
  name: "CommentList",
  data() {
    return {
      page: 1,
      total: 100,
      limit: 10,
      loading: false,
      currentDate: "2021-06-01",
      // avatarUrl: require(`@/assets/avatar${Math.floor(Math.random() * (6 - 0 + 1)) + 0}.jpg`),
      avatarSize: "small",
      // commentData: [
      //   {
      //     id: 20,
      //     userId: 1,
      //     userName: "DIng",
      //     avatar: require(`@/assets/avatar0.jpg`),
      //     content:
      //       "处理器对比，二者性能都很强再来看看处理器方面，iPhone 13系列此次选用了全新的A15处理器，性能实力达到了业内顶尖级别。而iQOO 8系列采用的也是行业顶尖的处理器，比如iQOO 8 Pro用的就是骁龙888 Plus，作为当前安卓阵营最强的处理器，骁龙888 Plus能让手机在高负载场景中保持流畅运行。👍",
      //     createdTime: "30 秒前",
      //     replyCount: 121,
      //     likeCount: 3321,
      //   },
      //   {
      //     id: 30,
      //     userId: 2,
      //     userName: "神一样的对手",
      //     avatar: require(`@/assets/avatar4.jpg`),
      //     content:
      //       "目前刚上班，觉得有一个技能真蛮重要的，即使不赚钱，当成一份以后职场能力去学习也值了",
      //     createdTime: "3 分钟前",
      //     replyCount: 3,
      //     likeCount: 45,
      //   },
      //   {
      //     id: 31,
      //     userId: 3,
      //     userName: "暖暖的阳光",
      //     avatar: require(`@/assets/avatar1.jpg`),
      //     content: "解锁方式，快充，游戏体验爱酷比苹果领先的多、",
      //     createdTime: "18 小时前",
      //     replyCount: 2,
      //     likeCount: 456,
      //   },
      //   {
      //     id: 32,
      //     userId: 4,
      //     userName: "进击的土豆",
      //     avatar: require(`@/assets/avatar2.jpg`),
      //     content:
      //       " 说的很好，手机不过是我们生活中的一部分。它也只是一个消耗品而已，没必要老是纠结自己买的价格到底香不香。只有自己用着舒服才是最好的产品，生活也是一样活在当下吧！ ",
      //     createdTime: "1 天前",
      //     replyCount: 4,
      //     likeCount: 73,
      //   },
      //   {
      //     id: 33,
      //     userId: 5,
      //     userName: "無待丶少遊",
      //     avatar: require(`@/assets/avatar3.jpg`),
      //     content:
      //       "所谓搞关系就是同流合污，就是一起吃喝玩乐，只有跟上级同流合污，他们才敢用你，放心你。[赞][赞]",
      //     createdTime: "08-13",
      //     replyCount: 3,
      //     likeCount: 11,
      //   },
      // ],
      commentData: [],
      smile: [{}],
      HotCommentCount: 1,
      ListCommentCount: 10,
      liked: false,
      type: this.dataType,
    };
  },
  components: {},
  props: ["dataType", "commentPlacement"],
  mounted() {
    this.replyCallBack();
  },
  beforeDestroy() {
    eventBus.$off("commentButton");
  },
  created() {
    //静态数据
    // let edata = this.commentData;
    // let newData = [];
    // if (edata.length < 10) {
    //   for (let i = 0; i < 100; i++) {
    //     newData.push({
    //       ...edata[Math.floor(Math.random() * edata.length)],
    //       id: 100 + i,
    //     });
    //   }
    // }
    // this.commentData = newData;

    axios
      .post("/comments", {
        _page: this.page,
        _limit: this.limit,
      })
      .then((response) => {
        if (response.status === 200) {
          this.commentData = response.data.data;
          NProgress.done();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onLikeThis(index, id, event) {
      let likeText = event.currentTarget.querySelector(".buttonText");
      if (!this.liked) {
        this.commentData[index].likeCount++;
      } else {
        this.commentData[index].likeCount--;
      }
      if (likeText.innerHTML.indexOf("已点赞") === -1) {
        likeText.innerHTML = "已点赞";
      } else {
        likeText.innerHTML = "点赞";
      }
      this.liked = !this.liked;
      if (event.currentTarget.className.indexOf("isliked") === -1) {
        event.currentTarget.className += " isliked";
      } else {
        event.currentTarget.className = "metaButton";
      }
    },
    unLikeThis(index, id, event) {
      let likeText = event.currentTarget.querySelector(".buttonText");
      if (likeText.innerHTML.indexOf("取消踩") !== -1) {
        likeText.innerHTML = likeText.innerHTML.replace(/取消踩/, "踩");
      } else {
        likeText.innerHTML = likeText.innerHTML.replace(/踩/, "取消踩");
      }
    },
    handleSizeChange(value) {
      this.limit = value;
      this.page = 1;
    },
    handleCurrentChange(value) {
      NProgress.start();
      axios
        .post("/comments", {
          _page: value,
          _limit: this.limit,
          total: 100,
        })
        .then((response) => {
          this.page = value;
          NProgress.done();
          console.log("成功", response);
        })
        .catch((error) => {
          console.log("失败", error);
        });
    },
    resiData() {
      this.commentData = [];
    },
    reply(id, event) {
      if (id) {
        //楼层回复
        let replyDiv = document.createElement("div");
        replyDiv.className = "commentReplyMini";
        replyDiv.setAttribute("data-replyid", id);
        replyDiv.innerText = "1111";
        if (event.currentTarget.innerHTML.indexOf("取消回复") > 0) {
          event.currentTarget.innerHTML = event.currentTarget.innerHTML.replace(
            /取消回复/,
            "回复"
          );
        } else {
          event.currentTarget.innerHTML = event.currentTarget.innerHTML.replace(
            /回复/,
            "取消回复"
          );
        }
        if (
          event.currentTarget.parentNode.parentNode.querySelector(
            ".commentReplyMini"
          )
        )
          return;
        event.currentTarget.parentNode.parentNode.appendChild(replyDiv);
        console.log(event.currentTarget.parentNode);
        console.log(id);
      } else {
        //评论回复
      }
    },
    deleteReply(index) {
      this.$confirm("此操作将永久删除该条评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // console.log(id);
          // console.log(this.commentData);
          this.commentData.splice(index, 1);
        })
        .catch(() => {
          // 取消删除
        });
    },
    copyFloor(index) {
      let _this = this;
      let id = index + 1;
      if (clipboard) {
        clipboard.destroy();
      }
      let clipboard = new this.clipboard(".wit-comment-time");
      clipboard.on("success", (e) => {
        _this.$message("复制 " + id + "楼 成功");
        e.clearSelection();
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        _this.$message("复制失败");
      });
    },
    replyCallBack() {
      const _this = this;
      eventBus.$on("commentButton", function (event) {
        console.log("eventBus 1", event);
        //静态回复数据
        // let obj = {
        //   id: "",
        //   userId: 6,
        //   userName: "张三",
        //   avatar: require(`@/assets/avatar5.jpg`),
        //   content: `${event.content.raw} (审核中)`,
        //   createdTime: "1 秒前",
        //   replyCount: 1,
        //   likeCount: 1,
        // };
        _this.commentData.splice(9, 0, event);
        // _this.commentData.push(obj);
        //console.log(_this.commentData);
      });
    },
  },
  computed: {
    commentDatas: function () {
      return this.commentData.slice(
        (this.page - 1) * this.limit,
        this.page * this.limit
      );
      // return this.commentData
    },
  },
};
</script>

<style  lang="scss" scoped>
@import "../assets/main.scss";
.pagination {
  text-align: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: $mx 0;
  margin: 0 (-$ml) $ml;
}
.commentReplyMini {
  padding-left: 32px;
}
.wit-comment-items {
  .comment-title {
    background-color: #f6f6f6;
    color: gray;
    font-size: 14px;
    font-weight: 600;
    margin: $mx (-$ml);
    padding: $mx $ml;
  }
  .wit-comment-item {
    .wit-comment-inner {
      //header
      padding-bottom: $mx;
      margin-bottom: $mx;
      border-bottom: 1px solid #eee;
      &:last-child {
        border: 0;
      }
      .wit-comment-header {
        display: flex;
        align-items: center;
        padding-bottom: $ms;
        .wit-comment-avatar {
          padding-right: $mx;
          cursor: pointer;
          .avatar {
            vertical-align: middle;
          }
        }
        .wit-comment-author {
          flex: 1;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
        }
        .wit-comment-time {
          font-size: 14px;
          color: $grey;
          cursor: pointer;
        }
      }
      //content
      .wit-comment-content {
        padding-left: 28 + $ms;
        .commentText {
          font-size: 15px;
          line-height: 24px;
          ::v-deep .smileImg {
            width: 16px;
            height: 16px;
            vertical-align: middle;
          }
        }
      }
      //meta
      .wit-comment-meta {
        font-size: 14px;
        font-weight: normal;
        padding-top: $ms;
        padding-left: 28 + $ms;
        color: $grey;
        display: flex;
        align-items: center;
        .metaButton {
          font-size: 14px;
          font-family: inherit;
          text-align: center;
          padding: 0;
          height: auto;
          cursor: pointer;
          color: #8590a6;
          background-color: transparent;
          i {
            margin-right: 5px;
          }
          &.isliked {
            color: #06f;
            &:hover {
              color: #175199;
            }
          }
          &:nth-of-type(n + 2) {
            margin-left: 20px;
          }
          &:hover {
            color: #76839b;
          }
        }
        .metaButton:nth-last-child(4),
        .metaButton:nth-last-child(3),
        .metaButton:nth-last-child(2),
        .metaButton:nth-last-child(1) {
          opacity: 0;
          transition: opacity 0.2s;
        }
        &:hover {
          .metaButton:nth-last-child(4),
          .metaButton:nth-last-child(3),
          .metaButton:nth-last-child(2),
          .metaButton:nth-last-child(1) {
            opacity: 1;
          }
        }
      }
    }
  }
}
.popperUserCard {
  .userCard {
    margin: -12px;
    padding-top: 100px;
    .userCard-cover {
      width: 100%;
      height: 100px;
      display: block;
      margin-top: -100px;
      border-radius: 4px 4px 0 0;
      background-size: cover;
      background-image: url("https://pic1.zhimg.com/80/v2-e0652aaf88c45e4775177f22ba8d9d05_r.jpg");
    }
    .userCard-avatar {
      position: absolute;
      top: 85px;
      left: 12px;
      border: 3px solid #fff;
    }
    .userCard-info {
      padding: $ml;
      .verify-icon {
        color: #0066ff;
      }
      .infoHeader {
        padding-left: 75px;
        i {
        }
      }
      .infoBody {
        padding-left: 75px;
      }
      .infoVerify {
        line-height: 1.75;
        padding: 5px 0;
        border: 1px solid #eee;
        margin: 12px 0;
        border-width: 1px 0;
        color: #000;
      }
      .infoFooter {
        .infoCount {
          display: flex;
          justify-content: space-evenly;
          align-content: center;
          align-items: center;
          .number {
            text-align: center;
            line-height: 1.6;
            flex: 1 1;
            .numberName {
              font-size: 14px;
              color: #8590a6;
            }
            .numberValue {
              display: inline-block;
              font-size: 18px;
              color: #121212;
              font-weight: 600;
            }
            &:hover {
              cursor: pointer;
              .numberName,
              .numberValue {
                color: #175199;
              }
            }
          }
        }
        .infoButton {
          display: flex;
          margin-top: $ml;
          justify-content: center;
          > * {
            color: #8590a6;
            border: 1px solid #8590a6;
            font-size: 14px;
            width: 100%;
            &.el-button--primary {
              color: #fff;
              background-color: #06f;
              border-color: #06f;
              &:hover {
                border-color: #005ce6;
                background-color: #005ce6;
              }
            }
            &:hover {
              background-color: rgba(133, 144, 166, 0.06);
            }
          }
        }
      }
    }
  }
}
</style>