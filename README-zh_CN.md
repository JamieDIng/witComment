<h1 align="center">witComment</h1>

## 关于
这是一个学习项目一个评论组件，功能参考zhihu comment，请不要用在生产环境因为它还不完善，我会进行迭代更新和修改。

因为热爱💖目前依然还在学习前端，你可能在代码里发现错误，如果你发现了问题或者有更好的建议欢迎指出 😉


## 使用
- [Vue2](https://github.com/vuejs/vue)
- [Element UI 2](https://github.com/ElemeFE/element)  
- [Clipboard](https://github.com/zenorocha/clipboard.js)
- [Sass](https://github.com/sass/sass)
- [Nprogress](https://github.com/rstacruz/nprogress)

## 参考

[ZhiHu.com](https://www.zhihu.com)

## 更新日志

[English](./README.md) | [简体中文](./README.md)

## 安装
```
npm install
```
## 页面引入 
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