// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//main.js 中， 引入了 vue、App 和 router 模块，创建了一个 Vue 对象，
//并把 App.vue 模板的内容挂载到 index.html 的 id 为 app 的 div 标签下， 
//并绑定了一个路由配置。
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
