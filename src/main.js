import Vue from 'vue'
import App from './App.vue'
import ElementUI from './plugins/element'
import router from './router'
import store from './store'
import Clipboard from "clipboard"
import filters from "@/common/js/filters";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.clipboard = Clipboard;
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
// 全局导入过滤器
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')