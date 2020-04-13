<template>
  <div class="index">
    <el-container>
      <el-header class="index-header">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <img :src="imgUrl" alt="logo" />
              <span class="title">会员管理系统</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light" style="text-align:right;">
              <img :src="imgUrl1" />
              <span>{{user}}</span>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="list(1)"
                    >个人信息</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="list(2)"
                    >修改密码</el-dropdown-item
                  >
                  <el-dropdown-item style="color:red" @click.native="outLogin();out()"
                    >退出登陆</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <el-menu-item index="1-1" @click="list(0)">
              <i class="el-icon-menu"></i>
              <span slot="title">全部成员</span>
            </el-menu-item>
            <el-menu-item index="1-2" @click="list(1)">
              <i class="el-icon-menu"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item index="1-3" @click="list(2)">
              <i class="el-icon-menu"></i>
              <span slot="title">修改密码</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="mian">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'index',
  data() {
    return {
      imgUrl: require('../assets/logo.png'),
      imgUrl1: require('../assets/user-ico.png')
    }
  },
  methods: {
    list(id) {
      if (id == 0) {
        this.$router.push({
          path: '/member'
        })
      } else if (id == 1) {
        this.$router.push({
          path: '/UserInfo'
        })
      } else if (id == 2) {
        this.$router.push({
          path: '/UpdateInfo'
        })
      }
    },
    out() {
      console.log('aa')
      this.$router.push({
        path: '/Login'
      })
    },
    ...mapMutations(['outLogin'])
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="" scoped>
.index {
  height: 100%;
}
.index-header {
  line-height: 60px;
  background-color: #409eff;
  border-bottom: 1px solid #ccc;
}
.index-header img {
  vertical-align: middle;
}
.title {
  color: white;
  font-weight: 700;
  font-size: 18px;
}
.mian {
  height: 100%;
  background-color: #e9eef3;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 14px;
}
</style>
