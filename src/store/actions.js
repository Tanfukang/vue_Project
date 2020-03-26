const actions = {
  Getuser(context, v) {
    context.commit("getInfo", v)
  },
  Deleuser(context) {
    context.commit("outLogin")
  }
}

export default actions
