// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import 'babel-polyfill' // 只需要引，不用写源码，辅助库
import router from './router'
import VueLazyload from 'vue-lazyload'


import 'common/style/index.less'

// 滚动到可视区，则显示图片，loading为默认加载前的图,,节点中用v-lazy="item.imgurl"
// Vue.use(VueLazyload, {
//   loading: require('common/image/default.png')
// })

Vue.config.productionTip = false
fastclick.attach(document.body) // 每个点击都会有300毫秒延迟

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>'
})
