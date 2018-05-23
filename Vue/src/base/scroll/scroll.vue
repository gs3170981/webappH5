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
          scrollX: this.scrollX,
          scrollY: this.scrollY,
//        stopPropagation: this.stopPropagation
        })
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
//          if (this.id === id) {
              me.$emit('scroll', this.scroll.distX, pos)
//          }
          })
        }
        
        if (this.pullup) { // 上拉刷新 pullup 需传参为 true
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
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
