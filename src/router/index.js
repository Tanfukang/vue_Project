import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
// 路由重定向
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
export default new Router({
  mode: "history",
  routes: [
    //登陆路由
    {
      path: "/Login",
      name: "Login",
      component: () => import("@/components/Login")
    },
    //注册路由
    {
      path: "/register",
      name: "register",
      component: () => import("@/components/register")
    },
    //主页路由
    {
      path: "/",
      name: "Home",
      // redirect: "/Charts", //重定向,默认路由
      component: () => import("@/components/Home.vue"),
      beforeEnter: (to, from, next) => {
        if (to.path === '/Login' || sessionStorage.getItem("user")) {
          next()
        } else {
          sessionStorage.setItem("path", to.path)
          next({
            path: '/Login'
          })
        }
      },
      meta: {
        requireAuth: true
      },
      children: [{
          path: "/",
          component: () => import("@/components/Charts"),

        },
        {
          path: "/member",
          name: "member",
          component: () => import("@/components/member")
        },
        {
          path: "/UserInfo",
          name: "UserInfo",
          component: () => import("@/components/UserInfo")
        },
        {
          path: "/UpdateInfo",
          name: "UpdateInfo",
          component: () => import("@/components/UpdateInfo")
        }
      ]
    },
    //主页charts路由
    {
      path: "/Charts",
      name: "Charts",
      component: () => import("@/components/Charts")
    },
    //全部成员路由
    {
      path: "/member",
      name: "member",
      component: () => import("@/components/member")
    },
    //个人信息路由
    {
      path: "/UserInfo",
      name: "UserInfo",
      component: () => import("@/components/UserInfo")
    },
    //修改信息路由
    {
      path: "/UpdateInfo",
      name: "UpdateInfo",
      component: () => import("@/components/UpdateInfo")
    }
  ]
});
