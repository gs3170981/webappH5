// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import 'babel-polyfill' // 只需要引，不用写源码，辅助库
import router from './router'
//import VueLazyload from 'vue-lazyload'
import 'common/js/adaption.js' // 自适应
import 'common/style/index.less' // 全局控制样式
import 'font-awesome/css/font-awesome.css'
import { M_Touch } from 'common/js/methods.js'

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/graphic'
import 'echarts/lib/component/dataZoom'
Vue.prototype.echarts = echarts // 用到的模块添加到this原型上

import 'mint-ui/lib/style.css'

// 滚动到可视区，则显示图片，loading为默认加载前的图,,节点中用v-lazy="item.imgurl"
// Vue.use(VueLazyload, {
//   loading: require('common/image/default.png')
// })
M_Touch()
Vue.config.productionTip = false
fastclick.attach(document.body) // 每个点击都会有300毫秒延迟
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>'
})
