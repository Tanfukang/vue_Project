const mutations = {
  getInfo: (state, data) => {
    state.user = data
    sessionStorage.setItem('user', data)
  },
  outLogin: (state) => {
    state.user = null
    sessionStorage.removeItem('user')
  }
}

export default mutations
