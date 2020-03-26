import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
//创建状态的实例
const store = new Vuex.Store({
	//五个状态
	//state---用来存放组件之间共享的数据，可以理解成是vue实例的data
	state,
	//getters---对state数据进行加工处理,是vuex的计算属性，类似于vue实例的计算属性
	getters,
	//mutations---对state状态里面的数据进行修改或者操作--类似于事件或者是方法，但是是一个同步事件,不建议直接操作mutations里面的事件
	mutations,
	//actions-----因为mutations里面的函数时同步,我们不建议直接操作,所以建议使用异步的函数操作
	actions
})

export default store