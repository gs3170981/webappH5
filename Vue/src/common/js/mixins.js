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
export {
  scroll_header
}
