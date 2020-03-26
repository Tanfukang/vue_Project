<template>
  <div class="member">
    <el-row>
      <el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple" :style="{ marginBottom: '30px' }">
            <span style="font-weight:700">首页</span>
            <span class="el-icon-arrow-right"></span>
            全部成员
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" >
      <el-table-column label="编号" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.uname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="200" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div
          class="grid-content bg-purple"
          :style="{ textAlign: 'center', margin: '50px auto' }"
        >
          <el-button
            type="primary"
            class="el-icon-circle-plus-outline"
            @click="newInfo"
            >&nbsp;新增</el-button
          >
        </div>
      </el-col>
    </el-row>
    <el-dialog title="新增成员" :visible.sync="userText" width="30%" center>
      <el-form :model="newUser">
        <el-form-item label="账户" :label-width="formLabelWidth">
          <el-input
            v-model="newUser.name"
            autocomplete="off"
            placeholder="用户名/邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="newUser.password"
            autocomplete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userText = false">取 消</el-button>
        <el-button type="primary" @click="Userinfo(newUser)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改成员" :visible.sync="updateText" width="30%" center>
      <el-form :model="update">
        <el-form-item label="账户" :label-width="formLabelWidth">
          <el-input v-model="update.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="update.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateText = false">取 消</el-button>
        <el-button type="primary" @click="updateInfo(update)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'member',
  data() {
    return {
      tableData: [],
      userId: '',
      updateText: false,
      userText: false,
      update: {
        name: '',
        password: ''
      },
      newUser: {
        name: '',
        password: ''
      },
      upsdate: {
        name: '',
        password: ''
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    newInfo() {
      this.userText = true
      this.newUser.name = ''
      this.newUser.password = ''
    },
    //新增成员
    Userinfo(newUser) {
      console.log(newUser)
      let _this = this
      if ((newUser.name && newUser.password) == '') {
        this.$message({
          message: '用户名密码不能为空',
          type: 'warning'
        })
        return false
      }
      this.$confirm('确定要添加?', '添加提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios
          .get(
            `http://127.0.0.1:8088/register?uname=${newUser.name}&password=${
              newUser.password
            }`
          )
          .then(res => {
            console.log(res.data)
            if (res.data === 2) {
              this.$message({
                message: '添加失败,账户名已存在',
                type: 'warning'
              })
              return false
            } else if (res.data === 1) {
              this.axios.get('http://127.0.0.1:8088/index').then(res => {
                _this.tableData = res.data
              })
              this.$message({
                message: '注册成功',
                type: 'success'
              })
              this.userText = false
            } else {
              this.$message.error('提交错误')
              return false
            }
          })
      })
    },
    //点击编辑事件
    handleEdit(index, row) {
      this.updateText = true
      this.userId = row.id
      this.upsdate.name = row.uname
      this.upsdate.password = row.password
      this.update.name = row.uname
      this.update.password = row.password
    },
    //点击编辑后的确认事件
    updateInfo(update) {
      let _this = this
      if ((update.name && update.password) == '') {
        this.$message({
          message: '用户名密码不能为空',
          type: 'warning'
        })
        return false
      }
      this.$confirm('确定要修改?', '修改提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios
            .get(
              `http://127.0.0.1:8088/update?uname=${
                _this.update.name
              }&password=${_this.update.password}&id=${_this.userId}`
            )
            .then(res => {
              if (res.data === 2) {
                this.$message({
                  message: '修改失败,账户名已存在',
                  type: 'warning'
                })
                return false
              } else if (res.data === 0) {
                this.tableData.forEach((item, index) => {
                  if (item.uname.indexOf(this.upsdate.name) >= 0) {
                    item.uname = _this.update.name
                    item.password = _this.update.password
                  }
                })
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                this.updateText = false
              } else {
                this.$message.error('提交错误')
                return false
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
    },
    //删除成员
    handleDelete(index, row) {
      this.$confirm('确定要删除?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios
            .get(`http://127.0.0.1:8088/delete?id=${row.id}`)
            .then(res => {
              this.tableData.splice(index, 1)
            })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          if (row.uname == sessionStorage.getItem('user')) {
            setTimeout(() => {
              this.$store.dispatch('Deleuser')
              this.$router.push({
                path: '/Login'
              })
            }, 500)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  //渲染数据
  created() {
    let _this = this
    this.axios.get('http://127.0.0.1:8088/index').then(res => {
      _this.tableData = res.data
    })
  }
}
</script>

<style lang="" scoped>
.el-row {
  margin-bottom: 20px;
}
.right {
  text-align: right;
  line-height: 40px;
}
</style>
