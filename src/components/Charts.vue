<template>
  <div class="charts">
    <div id="mychar" :style="{ width: '400px', height: '600px' }"></div>
  </div>
</template>

<script>
export default {
  name: 'charts',
  data() {
    return {}
  },
  mounted() {
    this.creatE()
  },
  methods: {
    creatE() {
      this.axios.get('http://127.0.0.1:8088/index').then(res => {
        var num = []
        var name = []
        for (let i = 0; i < res.data.length; i++) {
          num.push(res.data[i].id)
          name.push(res.data[i].uname)
        }
        let mychar = this.$echarts.init(document.getElementById('mychar'))
        mychar.setOption({
          xAxis: {
            type: 'category',
            data: name
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: num,
              type: 'bar'
            }
          ]
        })
      })
    }
  },
  created() {
    let _this = this
  }
}
</script>

<style lang="" scoped></style>
