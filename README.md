<h1 align="center">witComment</h1>

## About
This is a learning project and a comment component. Please do not use it in the production environment because it is not perfect. I will update and modify it iteratively.

Since I am still learning, you may find errors in the code. If you find problems or have better suggestions, you are welcome to point out 😉

## Components
- [Vue2](https://github.com/vuejs/vue)
- [Element UI 2](https://github.com/ElemeFE/element)  
- [Clipboard](https://github.com/zenorocha/clipboard.js)
- [Sass](https://github.com/sass/sass)
- [Nprogress](https://github.com/rstacruz/nprogress)

## Case object

[ZhiHu.com](https://www.zhihu.com)

## ChangeLogs

[English](./README.md) | [简体中文](./README.md)

## Install
```
npm install
```
## Usage 
```
import WitComment from "./components/WitComment.vue";
```
```
<wit-Comment
    placeholder="请输入评论内容"
    comment-smile="false"
    comment-hot="true"
    comment-style="default"
    comment-placement="bottom"
    comment-loading="nprogress"
    comment-class="yigeclass"
></wit-Comment>
```
```
export default {
  ...
  ...
  ...
  components: {
    witComment: WitComment,
  },
  created() {
    NProgress.configure({ parent: ".nprogress" });
  },
  mounted() {
    const wcSetting = window.wcSetting;
    NProgress.start();
  },
};
```