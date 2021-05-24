import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Menu from '@/components/Menu.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/element-ui.common.js';

import asbPath from '@/common/absPath';
Vue.prototype.$asbPath = asbPath;

import http from '@/service/http';
Vue.prototype.$http = http;  

import axios from 'axios';
Vue.prototype.$axios = axios;

import JSEncrypt from 'jsencrypt';//引入模块
Vue.prototype.$jsEncrypt = JSEncrypt;//配置全局变量

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:Home
    },
    {
      path: '/Login',
      name: 'Login',
      component:Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Menu',
      name: 'Menu',
      component: Menu
    }
  ]
})
