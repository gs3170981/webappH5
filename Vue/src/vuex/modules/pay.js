export default { // 查账付款
  state: {
    amount: '-- : --', // 分期总额
    remainAmount: '-- : --', // 剩余金额
    historyOverdueCount: false, // 历史逾期
    currentAmount: '0.00', // 本月应付
    nextMonthAmount: '-- : --', // 下月应付
    overdueCount: false, // 当前逾期
    list: [] // 订单列表
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
