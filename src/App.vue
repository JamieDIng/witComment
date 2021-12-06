<template>
  <el-container>
    <link rel="stylesheet" :href="'/assets/theme/'+theme +'.css'">
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple">
            <div style="margin-bottom: 10px">
              <span style="">主题样式：</span>
              <el-radio-group v-model="theme" size="small">
                <el-radio-button
                  v-for="item in themes"
                  :label="item.name"
                  :key="item.name"
                  :disabled="!item.enabled"
                  >{{ item.label }}</el-radio-button
                >
              </el-radio-group>
              {{ theme }}
            </div>
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
import WitComment from "./components/WitComment/WitComment.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const themeOptions = [
  { name:'zhihu',label: "知乎", enabled: true },
  { name:'github',label: "Github", enabled: false },
  { name:'bilibili',label: "哔哩哔哩", enabled: false },
  { name:'weibo',label: "微博", enabled: false },
];
export default {
  name: "WitComment",

  data: () => ({
    show: true,
    theme: themeOptions[0].name,
    themes: themeOptions,
  }),
  components: {
    witComment: WitComment,
  },
  created() {
    //进度条位置
    NProgress.configure({ parent: ".nprogress" });
    //NProgress.start();
  },
  mounted() {
    const wcSetting = window.wcSetting;
    console.log(wcSetting);
    NProgress.start();
  },
};
</script>

<style lang="scss" scope>
// @import '`./${theme}.scss`';
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
#nprogress .spinner {
  top: 8px;
  right: 16px;
}
</style>
