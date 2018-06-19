import { M_findClass } from 'common/js/methods.js'
const D = document
/*
 * 使用条件:
  1、含有scroll组件
  2、含有header组件
  3、scroll需要含有以下属性
    :end="true" 
    @scrollToEnd="scrollEnd" 
    :start="true" 
    @scrollToStart="scrollStart"
    
 * 效果：
    滑动下来的时候，header背景从透明到有颜色
*/
const scroll_header = {
  data () {
    return {
      scroll_timer: ''
    }
  },
  methods: {
    scrollEnd (e) {
//    console.log('end')
      clearInterval(this.scroll_timer)
    },
    scrollStart (e) {
//    console.log('start')
      let header_gra = e.wrapper.parentNode.getElementsByClassName('top-header_gra')[0]
      this.scroll_timer = setInterval(() => {
        let e_style = e.wrapper.children[0].style
        let trasf = e_style.transform
        trasf = parseInt(trasf.substring(trasf.indexOf(',') + 1, trasf.indexOf(')')))
        if (trasf <= 0) {
          let opa = window.getComputedStyle(header_gra, null).opacity
          let val = Math.abs(trasf) / 100
          header_gra.style.opacity = val
//        console.log(trasf)
        }
      }, 100)
    }
  }
}
/*
 * 使用条件:
  1、需要有单选的地方
  3、该函数需要传入以下属性
    @click="radio_checked('class', 'return 下标', 默认选中的下标)" 
        以及需要弹出动画的div放上'class'标识
 * 效果：
    点击单选按钮，出现弹出动画，以及实现radio的基础功能
*/
const radio_checked = {
  data () {
    return {
//    scroll_timer: ''
    }
  },
  methods: {
    radio_checked (klass, callData, index, opt) {
      let arr = D.getElementsByClassName(klass)
      let _this
      if (index || index === 0) {
        _this = arr[index]
      } else {
        _this = M_findClass(window.event.currentTarget, klass)
      }
      if (_this.style.background.length) {
        return
      }
      for (let i = 0; i < arr.length; i++) {
        if (_this === arr[i]) { // 如果当前对象，则返回下标
          this[callData] = i
        }
        arr[i].style.background = ""
      }
      _this.style.transform = 'scale3d(0,0,1)'
      setTimeout(() => {
        if (opt && opt.img && opt.img === 'radio') {
          _this.style.background = "url(" + require('common/image/pay_icon_choose_s.png') + ")top center"
        } else {
          _this.style.background = "url(" + require('common/image/pay_icon_choose_s.png') + ")top center"
        }

        _this.style.transform = 'scale3d(1,1,1)'
      }, 50)
    }
  }
}
export {
  scroll_header,
  radio_checked
}
