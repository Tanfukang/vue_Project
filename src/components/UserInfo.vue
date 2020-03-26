<template>
  <div class="info">
    <el-row>
      <el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple" :style="{  marginBottom: '30px' }">
            <span style="font-weight:700">首页</span>
            <span class="el-icon-arrow-right"></span>
            个人信息
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
            <el-input  v-model="info.id" :disabled="true">
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
            <el-input  v-model="info.uname" :disabled="true">
            </el-input>
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
            <el-input  v-model="info.password" :disabled="true">
            </el-input>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'info',
  data() {
    return {
      info: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.info.name = sessionStorage.getItem('user')
    let _this = this
    this.axios
      .get(`http://127.0.0.1:8088/info?uname=${this.info.name}`)
      .then(res => {
        _this.info = res.data[0]
      })
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