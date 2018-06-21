<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
//    id: {
//      type: String,
//      default: 'false'
//    },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
//    stopPropagation: { // 冒泡
//      type: Boolean,
//      default: true
//    },
      scrollX: { // X轴移动
        type: Boolean,
        default: false
      },
      scrollY: {
        type: Boolean,
        default: true
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      deceleration: {
        type: Number,
        default: 0.001
      },
      start: {
        type: Boolean,
        default: false
      },
      end: {
        type: Boolean,
        default: false
      },
      preventDefault: {
        type: Boolean,
        default: false
      },
      bounce: {
        type: Boolean,
        default: true
      },
      pullend: {
        type: Boolean,
        default: false
      }
    },
//  data () {
//    return {
//      scroll: {}
//    }
//  },
    mounted() {
//    console.log(this.id)
      setTimeout(() => {
        this._initScroll(this.id)
      }, 20)
    },
//  watch: {
//    scroll (obj) {
//      console.log(123)
//    }
//  },
    methods: {
      _initScroll(id) {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
//        momentum: false,
          bounce: this.bounce, // 默认开启回弹
          deceleration: this.deceleration, // 滚动速度
//        scrollX: this.scrollX,
          bindToWrapper: true, // TODO 如果是自己的滚动事件，并绑定在容器上，则该属性须为true！
          scrollY: this.scrollY,
          preventDefault: this.preventDefault // 滚动中是否触发事件
//        stopPropagation: true
        })
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
//          if (this.id === id) {
              me.$emit('scroll', this.scroll)
//          }
          })
        }
        
        if (this.pullup) { // 上拉刷新 pullup 需传参为 true
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        } else if (this.end) {
          this.scroll.on('scrollEnd', () => {
            this.$emit('scrollToEnd', this.scroll)
          })
        }
        
        if (this.start) {
          this.scroll.on('scrollStart', () => {
            this.$emit('scrollToStart', this.scroll)
          })
        }
        if (this.pullend) {
          this.scroll.on('touchend', () => {
            this.$emit('touchToend', this.scroll)
          })
        }
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="less">

</style>
