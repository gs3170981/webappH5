export default { // 查账付款
  state: {
    '0': {
      list: []
    }
  },
  mutations: {
    submit(state, obj) {
      let len = Object.keys(obj).length
      let j = 0
      for (let i in obj) {
        if (j === len) return
        if (state.hasOwnProperty(i)) state[i] = obj[i]
        j++
      }
    }
  },
  getters: { // fuck,是getters不是getter
//  count2: state => state.count2,
//  count3: state => state.count3
  },
  actions: {
//  test2() {
//    this.commit('increment2')
//  },
//  increment({
//    commit
//  }) {
//    setTimeout(() => {
//      commit('increment')
//    }, 1000)
//  }
  }
}
