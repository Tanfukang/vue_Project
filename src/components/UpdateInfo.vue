<template>
  <div class="update">
    <el-row>
      <el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple" :style="{  marginBottom: '30px' }">
            <span style="font-weight:700">首页</span>
            <span class="el-icon-arrow-right"></span>
            修改密码
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple text">
            编号
          </div>
        </el-col>
        <el-col :span="22">
          <div class="grid-content bg-purple-light">
            <el-input  v-model="upinfo.id" :disabled="true">
            </el-input>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple text">
            账户
          </div>
        </el-col>
        <el-col :span="22">
          <div class="grid-content bg-purple-light">
            <el-input v-model="upinfo.uname" :disabled="true"></el-input>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple text">
            密码
          </div>
        </el-col>
        <el-col :span="22">
          <div class="grid-content bg-purple-light">
            <el-input v-model="upinfo.password" ></el-input>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple" :style="{ textAlign: 'center', margin: '30px auto' }">
          <el-button type="primary" @click="updinfo">更新</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: '',
  data() {
    return {
      upinfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.upinfo.uname = sessionStorage.getItem('user')
    let _this = this
    this.axios
      .get(`http://127.0.0.1:8088/info?uname=${this.upinfo.uname}`)
      .then(res => {
        _this.upinfo = res.data[0]
      })
  },
  methods: {
    updinfo() {
      if (this.upinfo.password == '') {
        this.$message({
          message: '密码不能为空',
          type: 'warning'
        })
        return false
      }
      this.axios
        .get(
          `http://127.0.0.1:8088/updatepwd?id=${this.upinfo.id}&password=${
            this.upinfo.password
          }`
        )
        .then(res => {
          if (res.data == 2) {
            this.$message({
              message: '请修改新的密码',
              type: 'warning'
            })
            return false
          } else if (res.data == 1) {
            this.$message({
              message: '密码修改成功',
              type: 'success'
            })
            return
          } else {
            this.$message.error('提交错误')
            return false
          }
        })
    }
  }
}
</script>

<style lang="" scoped>
.el-row {
  margin-bottom: 20px;
}
.text {
  text-align: right;
  padding-right: 20px;
  line-height: 40px;
  font-weight: 700;
}
</style>