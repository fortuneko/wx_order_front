import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
// import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue';
import VueRouter from 'vue-router'
import router from './router/index.js'

Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.config.productionTip = false



// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
// const router = new VueRouter({
//   routes // (缩写) 相当于 routes: routes
// })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
