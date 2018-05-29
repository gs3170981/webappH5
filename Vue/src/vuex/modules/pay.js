export default {
  state: {
    amount: '0.00', // 分期总额
    remainAmount: '0.00', // 剩余金额
    historyOverdueCount: '0.00', // 历史逾期
    currentAmount: '0.00', // 本月应付
    nextMonthAmount: '0.00', // 下月应付
    overdueCount: '0.00' // 当前逾期
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
    },
    increment(state) {
      state.count++
    },
    increment2(state) {
      state.count2++
    },
    increment3(state) {
      state.count3++
    }
  },
  getters: { // fuck,是getters不是getter
//  count2: state => state.count2,
//  count3: state => state.count3
  },
  actions: {
    test2() {
      this.commit('increment2')
    },
    increment({
      commit
    }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
}
