<template>
  <div class="login">
    <el-container>
      <el-header class="header">
        <img :src="imgUrl" alt="logo" />
        <span class="title">会员管理系统</span>
      </el-header>
      <el-main class="mian">
        <div class="login-container">
          <el-form
            :model="ruleForm2"
            :rules="rules2"
            status-icon
            ref="ruleForm2"
            label-position="left"
            label-width="0px"
            class="demo-ruleForm login-page"
          >
            <h2 class="login-title">系统登录</h2>
            <el-form-item prop="username">
              <el-input
                type="text"
                v-model="ruleForm2.username"
                auto-complete="off"
                placeholder="用户名/邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="ruleForm2.password"
                auto-complete="off"
                placeholder="密码"
              ></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" class="rememberme"
              >记住密码</el-checkbox
            >
            <el-form-item style="width:100%;">
              <el-button
                type="primary"
                style="width:100%;"
                @click="submitLogin"
                :loading="logining"
                >登录</el-button
              >
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button style="width:100%;" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      imgUrl: require('../assets/logo.png'),
      logining: false,
      ruleForm2: {
        username: '',
        password: ''
      },
      rules2: {
        username: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      checked: false
    }
  },
  methods: {
    submitLogin() {
      this.logining = true
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.axios
            .get(
              `http://127.0.0.1:8088/login?uname=${
                this.ruleForm2.username
              }&upass=${this.ruleForm2.password}`
            )
            .then(res => {
              if (res.data === 1) {
                this.$message({
                  message: '登陆成功',
                  type: 'success'
                })
                const _this = this
                _this.$store.dispatch('Getuser', this.ruleForm2.username)
                setTimeout(() => {
                  if (sessionStorage.getItem('path') == null) {
                    this.$router.push({
                      path: '/'
                    })
                  } else {
                    let a = sessionStorage.getItem('path')
                    this.$router.push({
                      path: a
                    })
                    sessionStorage.removeItem('path')
                  }
                }, 1000)
              } else if (res.data === 0) {
                this.logining = false
                this.$message({
                  message: '登录失败，用户名或密码不正确',
                  type: 'warning'
                })
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        } else {
          this.logining = false
          this.$message.error('提交错误')
          return false
        }
      })
    },
    register() {
      if (sessionStorage.getItem('user') == null) {
        this.$router.push({ path: '/register' })
      }
    }
  }
}
</script>

<style scoped>
.login {
  height: 100%;
}
.header {
  line-height: 60px;
  background-color: #409eff;
  border-bottom: 1px solid #ccc;
}
.header img {
  vertical-align: middle;
}
.title {
  font-weight: 700;
  font-size: 18px;
}
.mian {
  background-color: #409eff;
  height: 100%;
}
.login-title {
  margin: 10px auto;
  text-align: center;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 120px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #fff;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>
