// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from './store';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import echarts from "echarts";
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.config.productionTip = false;


// router.beforeEach((to, from, next) => {
//     console.log(to.path)
//     // next()
//     if (to.path == '/Login' && sessionStorage.getItem("user")) {
//       next()
//     } else {
//       next({
//         path: '/Login'
//       })
//     }
//   }),

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  components: {
    App
  },
  template: "<App/>"
});
