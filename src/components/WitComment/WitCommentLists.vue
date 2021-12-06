<template>
  <div>
    <div v-if="type === 'hots'" class="wit-comment-items">
      <div class="comment-title">精彩评论 ( 4 )</div>

      <!-- 热评 -->
    </div>
    
    <div v-else class="wit-comment-items">
      <div> 日期:{{ 1635738742 | timeFormat }}</div>
      <div class="comment-title nprogress">
        评论 ( {{ commentData.length }} )
      </div>
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
        :class="{ 'comment-child': item.lastThreeComments.length > 0 }"
      >
        - {{ item.lastThreeComments.length }} -
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
                      :src="item.avatar"
                    ></el-avatar>
                    <div class="userCard-info">
                      <div class="infoHeader">
                        {{ item.userName }}
                        <i class="el-icon-platform-eleme verify-icon"></i>
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
                          <el-button
                            type="primary"
                            size="mini"
                            @click="follow(item.id, $event)"
                            >关注</el-button
                          >
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
              {{ item.createdTime | timeFormat }}
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
              :class="{ isliked: item.isLiked }"
              @click="onLikeThis(index, item.id, $event)"
            >
              <i class="el-icon-caret-top"></i
              ><span class="buttonText">{{
                item.likeCount > 0 ? "" : "赞"
              }}</span>
              <span>{{
                (item.likeCount > 0 ? item.likeCount : "") | numberKibt
              }}</span>
            </button>
            <button class="metaButton">
              <i class="el-icon-chat-line-square"></i> 查看回复
            </button>
            <button class="metaButton" @click="reply(item.id, $event)">
              <i class="el-icon-chat-dot-square"></i
              >{{ ReplyMiniId === item.id ? "取消回复" : "回复" }}
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
          <div
            class="commentReplyMini"
            v-if="ReplyMiniId == item.id"
            :data-replyid="item.id"
          >
            {{ item.id }}
            <comment-reply :data-replyid="item.id"></comment-reply>
          </div>
        </div>
        <!-- 子评论 -->
        <div class="comment-children">
          <!-- .slice(0,2) -->
          <div
            class="wit-comment-item"
            v-for="(childItem, childIndex) in item.lastThreeComments.slice(
              0,
              2
            )"
            :key="childItem.id"
            :data-id="childItem.id"
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
                            <el-skeleton-item
                              style="width: 30%"
                              variant="text"
                            />
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
                            {{ childItem.user.userName }}
                            <i class="el-icon-platform-eleme verify-icon"></i>
                          </div>
                          <div class="infoBody">
                            一群不安分的实验室检测工程师
                          </div>
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
                                <div class="numberValue">
                                  {{ 63 | numberKibt }}
                                </div>
                              </div>
                              <div class="number">
                                <div class="numberName">关注者</div>
                                <div class="numberValue">
                                  {{ 12345678 | numberKibt }}
                                </div>
                              </div>
                            </div>
                            <div class="infoButton">
                              <el-button type="primary" size="mini"
                                >关注</el-button
                              >
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
                      :src="childItem.user.avatar"
                      class="avatar"
                      shape="square"
                    ></el-avatar>
                  </div>
                </el-popover>
                <div class="wit-comment-author">
                  <span>{{ childItem.user.userName }}</span>
                  <span class="isauthor"
                    v-if="childItem.user.userId == childItem.replyUser.userId"
                    >(作者)</span
                  >
                  <span class="info">回复</span>
                  <span>{{ childItem.replyUser.userName }}</span>
                  <span class="isauthor"
                    v-if="
                      childItem.replyUser.userId == childItem.replyUser.userId
                    "
                    >(作者)</span
                  >
                </div>
                <div
                  class="wit-comment-time"
                  data-clipboard-action="copy"
                  data-clipboard-text="网址"
                  @click="copyFloor(ChildIndex)"
                >
                  {{ childItem.createdTime }}
                </div>
              </div>
              <div class="wit-comment-content">
                <div
                  class="commentText"
                  v-html="$options.filters.EmoticonDecode(childItem.content)"
                >
                  {{ childItem.content | EmoticonDecode }}
                </div>
              </div>
              <div class="wit-comment-meta">
                <button
                  class="metaButton"
                  :class="{ isliked: childItem.isLiked }"
                  @click="onLikeThis(index, childItem.id, $event)"
                >
                  <i class="el-icon-caret-top"></i
                  ><span class="buttonText">{{
                    childItem.likeCount > 0 ? "" : "赞"
                  }}</span>
                  <span>{{ childItem.likeCount | numberKibt }}</span>
                </button>

                <button class="metaButton" @click="reply(childItem.id, $event)">
                  <i class="el-icon-chat-dot-square"></i
                  >{{ ReplyMiniId === childItem.id ? "取消回复" : "回复" }}
                  {{ childItem.replyCount | numberKibt }}
                </button>
                <button
                  class="metaButton"
                  @click="unLikeThis(childIndex, childItem.id, $event)"
                >
                  <i class="el-icon-caret-bottom"></i
                  ><span class="buttonText">踩</span>
                </button>
                <button class="metaButton">
                  <i class="el-icon-s-flag"></i> 举报
                </button>
                <button
                  class="metaButton"
                  v-if="item.canDelete"
                  @click="deleteReply(childIndex, childItem.id)"
                >
                  <i class="el-icon-delete"></i>删除
                </button>
              </div>
              <div
                class="commentReplyMini"
                v-if="ReplyMiniId === childItem.id"
                :data-replyid="childItem.id"
              >
                回复框
              </div>
            </div>
          </div>
        </div>
        <!-- 子评论 -->
        <div
          class="comment-children more"
          v-if="item.lastThreeComments.length > 1"
        >
          <button @click="commentMoreChild = true">
            查看全部 {{ item.lastThreeComments.length }} 条回复
          </button>
          <el-dialog
            title="提示"
            v-if="item.lastThreeComments.length > 1"
            :visible.sync="commentMoreChild"
            width="30%"
            center
          >
            <span>需要注意的是内容是默认不居中的</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="commentMoreChild = false">取 消</el-button>
              <el-button type="primary" @click="commentMoreChild = false"
                >确 定</el-button
              >
            </span>
          </el-dialog>
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
import commentReply from "./WitCommentReply.vue";
// eslint-disable-next-line
import mock from "../../api/mock";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import axios from "axios";
import eventBus from "../../common/js/eventBus";
// eslint-disable-next-line
// import filters from "../common/js/filters";
const cubic = (value) => Math.pow(value, 3);
const easeInOutCubic = (value) =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;

export default {
  name: "WitCommentLists",
  data() {
    return {
      el: null,
      page: 1,
      total: 100,
      limit: 10,
      loading: false,
      currentDate: "2021-06-01",
      avatarSize: 24,
      commentMoreChild: false,

      commentData: [],
      smile: [{}],
      ReplyMiniId: null,
      HotCommentCount: 1,
      ListCommentCount: 10,
      liked: false,
      type: this.dataType,
    };
  },
  components: {
    commentReply,
  },
  props: ["dataType", "commentPlacement"],
  mounted() {
    this.replyCallBack();
    this.el = document.documentElement;
  },
  beforeDestroy() {
    console.log("beforeDestroy");
    eventBus.$off("commentButton");
  },
  created() {
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
        // console.log(this.commentData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    follow(id, event) {
      let _this = event.currentTarget;
      console.log(_this.className);
      if (_this.className.indexOf("isfollow") != -1) {
        _this.innerText = "关注";
        _this.className = "el-button el-button--primary el-button--mini";
        _this.addEventListener("mouseover", function () {
          _this.innerText = _this.innerText.replace(/已关注/, "取消关注");
        });
        _this.addEventListener("mouseout", function () {
          _this.innerText = _this.innerText.replace(/取消关注/, "已关注");
        });
      } else {
        _this.className += " isfollow";
        _this.innerText = "取消关注";
      }
    },
    onLikeThis(index, id, event) {
      if (!this.liked) {
        this.commentData[index].likeCount++;
      } else {
        this.commentData[index].likeCount--;
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
          this.scrollToTop();
          console.log("成功", response);
        })
        .catch((error) => {
          console.log("失败", error);
        });
    },
    resiData() {
      this.commentData = [];
    },
    //eslint-disable-next-line
    reply(id, event) {
      this.ReplyMiniId = id;
      // if (id == 3) {
      //   //楼层回复
      //   if (document.querySelector(".commentReplyMini")) {
      //     // document.querySelector('.commentReplyMini').remove();
      //   }
      //   let replyDiv = document.createElement("div");
      //   replyDiv.className = "commentReplyMini";
      //   replyDiv.setAttribute("data-replyid", id);
      //   replyDiv.innerText = "1111";
      //   if (event.currentTarget.innerHTML.indexOf("取消回复") > 0) {
      //     event.currentTarget.innerHTML = event.currentTarget.innerHTML.replace(
      //       /取消回复/,
      //       "回复"
      //     );
      //   } else {
      //     event.currentTarget.innerHTML = event.currentTarget.innerHTML.replace(
      //       /回复/,
      //       "取消回复"
      //     );
      //   }
      //   if (
      //     event.currentTarget.parentNode.parentNode.querySelector(
      //       ".commentReplyMini"
      //     )
      //   )
      //     return;
      //   event.currentTarget.parentNode.parentNode.appendChild(replyDiv);
      //   console.log(event.currentTarget.parentNode);
      //   console.log(id);
      // } else {
      //   //评论回复
      // }
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
        console.log("eventBus 回调", event);
        //字回复
        // eslint-disable-next-line
        if (event.replyPostId) {
          let commentKey = _this.commentData.findIndex(
            (x) => x.id == event.replyPostId
          );
          _this.commentData[commentKey].lastThreeComments.splice(9, 0, event);
        } else {
          _this.commentData.splice(9, 0, event);
        }
        console.log("commentData", _this.commentData);
      });
    },
    scrollToTop() {
      const el = this.el;
      const beginTime = Date.now();
      const beginValue = el.scrollTop;
      const rAF =
        window.requestAnimationFrame || ((func) => setTimeout(func, 16));
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          rAF(frameFunc);
        } else {
          el.scrollTop = 0;
        }
      };
      rAF(frameFunc);
      // console.log(frameFunc);
    },
  },
  computed: {
    commentDatas: function () {
      // console.log('原始',this.commentData);
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
@import "../../assets/main.scss";
.pagination {
  text-align: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: $mx 0;
  margin: 0 (-$ml) $ml;
}
::v-deep .commentReplyMini {
  padding-left: 32px;
  position: relative;
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
    &:not(:last-child) .wit-comment-inner::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      // margin-right: 20px;
      // margin-left: 84px;
      border-bottom: 1px solid #f6f6f6;
    }
    .wit-comment-inner {
      //header
      padding-top: 12px;
      padding-bottom: 10px;
      // padding-bottom: $mx;
      // margin-bottom: $mx;
      position: relative;
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
          .isauthor {
            color: #8590a6;
            margin-left: 8px;
            cursor: auto;
          }
          .info {
            margin-right: 8px;
            margin-left: 8px;
            color: #8590a6;
            cursor: auto;
          }
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
          line-height: 1.6;
          word-break: break-all;
          ::v-deep .smileImg {
            width: 21px;
            height: 21px;
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
        position: relative;
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
    &.comment-child {
      border-bottom: 1px solid #f6f6f6;
      &:nth-last-child(2) {
        border-bottom: 0;
      }
      .wit-comment-inner {
        &::after {
          border: 0;
        }
      }
      .comment-children {
        padding-left: 33px;
        .wit-comment-item {
          position: relative;
          .wit-comment-content,
          .wit-comment-header {
            position: inherit;
          }
        }
        &:last-child .wit-comment-inner::after {
          border: 0;
        }
        &.more {
          font-size: 14px;
          color: #8590a6;
          padding-top: 12px;
          padding-bottom: 12px;
          &:hover {
            cursor: pointer;
            color: #76839b;
          }
          &::before {
            content: "";
            display: block;
            position: relative;
            top: -12px;
            left: 0;
            bottom: 0;
            right: 0;
            border-top: 1px solid #f6f6f6;
          }
        }
        .wit-comment-inner::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          border-top: 1px solid #f6f6f6;
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
            &.isfollow {
              border-color: #76839b !important;
              background-color: #76839b !important;
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