import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import user from './modules/user.js'
import pay from './modules/pay.js'
import order from './modules/order.js'

export default new Vuex.Store({
  modules: {
    user,
    pay,
    order
  }
})
