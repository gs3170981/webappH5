export default { // 查账付款
  state: {
    '0': {
      list: []
    },
    '1': {
      list: []
    },
    '2': {
      list: []
    },
    '3': {
      list: []
    },
    '4': {
      list: []
    }
  },
  mutations: {
    submit(state, obj) {
      let {
        res,
        index
      } = obj
      let len = Object.keys(res).length
      let j = 0
      let _state = state
      if (index) {
        _state = state[index]
      }
      for (let i in res) {
        if (j === len) return
        if (_state.hasOwnProperty(i)) _state[i] = res[i]
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
