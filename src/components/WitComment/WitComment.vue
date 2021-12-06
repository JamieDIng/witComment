<template>
  <div id="wit-comments" class="wit-comments" :class="commentClass">
    <!-- 头部 -->
    <div class="comment-header">
      <div class="header-info">
        <h2>99 条评论</h2>
      </div>
      <div class="header-filter">
        <el-dropdown @command="commentFilter">
          <span class="el-dropdown-link">
            切换排序<i class="el-icon-sort el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="默认">默认</el-dropdown-item>
            <el-dropdown-item command="按时间正序">按时间正序</el-dropdown-item>
            <el-dropdown-item command="按时间降序">按时间降序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <wit-comment-lists
      :comment-placement="commentPlacement"
    ></wit-comment-lists>
    <!-- 底部 -->
    <div class="footer">
      <comment-reply
        @messageData="messageData"
        :placeholder="placeholder"
      ></comment-reply>
    </div>
    <span class="wit-powered">Powered by WitComment</span>
  </div>
</template>
<script>
import WitCommentLists from "./WitCommentLists.vue";
import commentReply from "./WitCommentReply.vue";
// import WitCommentReplyLists from './WitCommentReplyLists.vue'

export default {
  name: "WitComment",
  data() {
    return {
      onHots: true,
      theme: 'blue'
    };
  },
  props: [
    "placeholder",
    "commentHot",
    "commentClass",
    "commentStyle",
    "commentPlacement",
    "commentLoading",
  ],
  components: {
    WitCommentLists,
    commentReply,
    // 'wit-reply-lists':WitCommentReplyLists
  },
  created() {},
  methods: {
    //切换排序
    commentFilter(command) {
      this.$message(command);
    },
    //排序
    messageData(item) {
      console.log(item);
    },
  },
  mounted() {
    console.log(this.$el);
    this.$el.style.setProperty('--theme-style', 'blue')
  },
};
</script>

<style lang="scss" scope>
@import "../../assets/main.scss";
$html-font-size: 16px !default;
html {
  font-size: $html-font-size;
}
@function px2rem($px) {
  @return $px / $html-font-size * 1rem;
}

.comment-header {
  // background-color: var(--theme-style);
  //color: var(--theme-style);
}

/* 外边距 20 内边距 10 行内 5 */
.wit-comments {
  padding: 16px;
  border: 1px solid #ebebeb;
  border-radius: (6rem / 16);
  background-color: #fff;
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  .wit-powered {
    color: #b9b9b9;
    cursor:pointer;
    font-size: 12px;
    text-align: right;
    display: block;
    font-weight: normal;
    font-family: -webkit-pictograph;
  }
  .comment-header {
    display: flex;
    padding-bottom: $mx;
    .header-info {
      flex: 1;
      h2 {
        color: $mainColor;
        font-size: 16px;
        display: inline-block;
      }
    }
    .header-filter {
      display: flex;
      align-content: center;
      flex-wrap: wrap;
      align-items: center;
      color: $grey;
      font-size: 12px;
      span {
        font-size: inherit;
      }
    }
  }
}
</style>