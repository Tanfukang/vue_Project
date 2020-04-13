<template>
  <div class="register">
    <el-container>
      <el-header class="header">
        <img :src="imgUrl" alt="logo">
        <span class="title">会员管理系统</span>
      </el-header>
      <el-main class="mian">
        <div class="register-container">
          <el-form :model="ruleForm2" :rules="rules2" status-icon ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm register-page">
            <h2 class="register-title">用户注册</h2>
            <el-form-item prop="username">
              <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="用户名/邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button type="primary" style="width:100%;" @click="register" :register="register">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'register',
  register: false,
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
      }
    }
  },
  methods: {
    register() {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.axios
            .get(
              `http://127.0.0.1:8088/register?uname=${
                this.ruleForm2.username
              }&password=${this.ruleForm2.password}`
            )
            .then(res => {
              if (res.data == 2) {
                this.$message({
                  message: '注册失败，该用户名已存在',
                  type: 'warning'
                })
                return false
              } else if (res.data == 1) {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.push({
                    path: '/Login'
                  })
                }, 1000)
              } else {
                this.$message.error('提交错误')
                return false
              }
            })
        }
      })
    }
  }
}
</script>

<style lang="" scoped>
.register {
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
.register-title {
  margin: 10px auto;
  text-align: center;
}
.register-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 120px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #fff;
}
</style>