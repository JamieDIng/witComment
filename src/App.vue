<template>
  <el-container>

    <el-main>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple">
            <wit-Comment 
              placeholder="请输入评论内容"
              comment-smile="false"
              comment-hot="true"
              comment-style="default"
              comment-placement="bottom"
              comment-loading="nprogress"
              comment-class="yigeclass"
              ></wit-Comment>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import WitComment from "./components/WitComment.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
export default {
  name: "App",
  data: () => ({
    show: true,

  }),
  components: {
    witComment: WitComment,
  },
  created() {
    //进度条位置
    NProgress.configure({ parent: '#wit-comments' });
    // NProgress.start();
  },
  mounted() {
    const wcSetting = window.wcSetting
    console.log(wcSetting)
  },
};
</script>

<style>
html {
  background-color: rgb(245, 247, 248);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
